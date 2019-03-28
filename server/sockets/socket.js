const { io} = require('../server');
const {  Usuarios} = require('../classes/usuarios');
const{crearMensaje} = require('../utilidades/utilidades');
const usuarios = new Usuarios();

io.on('connection', (client) => {

  client.on('entrarChat', (data, callback) => {
    // console.log(data);
    if (!data.nombre || !data.sala) {
      return callback({
        error: true,
        mensaje: 'El nombre y sala son necesarios'
      });
    }

    client.join(data.sala);

    let personas = usuarios.agregarPersona(client.id, data.nombre,data.sala);
//cada vez que una persona entra al chat
    client.broadcast.to(data.sala).emit('listaPersona', usuarios.getPersonasPorSala(data.sala));
    client.broadcast.to(data.sala).emit('crearMensaje', crearMensaje('Administrador', `${data.nombre} se unió`));

    callback(usuarios.getPersonasPorSala(data.sala));

  });

  client.on('crearMensaje',(data, callback) => {
    let persona = usuarios.getPersona(client.id);
    let mensaje = crearMensaje(persona.nombre, data.mensaje);
    client.broadcast.to(persona.sala).emit('crearMensaje', mensaje);


    callback(mensaje);
  });
//Se ejecuta una limpieza, para evitar que cada vez que se recargue se agregue el mismo usuario.
  client.on('disconnect', () => {
    let personaBorrada = usuarios.borrarPersona(client.id);

    client.broadcast.to(personaBorrada.sala).emit('crearMensaje', crearMensaje('Administrador', `${personaBorrada.nombre} salió`));
    client.broadcast.to(personaBorrada.sala).emit('listaPersona', usuarios.getPersonasPorSala(personaBorrada.sala));
  });

  //lo que va a hacer el servidor cuando alguien quiera mandar un mensaje privado
  client.on('mensajePrivado', data => {
    //Para una sola persona se agrega al broadcast con tl to()
    let persona = usuarios.getPersona(client.id);
    client.broadcast.to(data.para).emit('mensajePrivado',crearMensaje(persona.nombre, data.mensaje));


  });

});
