var params = new URLSearchParams(window.location.search);
var nombre = params.get('nombre');
var sala = params.get('sala');

//referencias de jquery
var divUsuarios = $('#divUsuarios');
var formEnviar = $('#formEnviar');
var txtMensaje = $('#txtMensaje');
var divChatbox = $('#divChatbox');

//Funciones para renderizar Usuarios
function renderizarUsuarios(personas){
  console.log(personas);
  var html = '';
  html += '<li>';
  html += '   <a href="javascript:void(0)" class="active"> Chat de <span>'+ params.get('sala') + '</span></a>';
  html += '</li>';

  for(var i = 0; i< personas.length; i++){

    html += '<li>';
    html += '   <a  data-id= "'+ personas[i].id +'" href="javascript:void(0)"><img src="assets/images/users/persona.jpeg" alt="user-img" class="img-circle"> <span> '+ personas[i].nombre + ' <small class="text-success">online</small></span></a>';
    html += '</li>';
  }

  divUsuarios.html(html);
}

function renderizar

//Listeners

divUsuarios.on('click','a', function(){
  var id = $(this).data('id');
  if (id) {
    console.log(id);
  }
});

formEnviar.on('submit', function(e){
  e.preventDefault();

  if (txtMensaje.val().trim().length === 0) {
    return;
  }

  // Enviar información
  socket.emit('crearMensaje', {
      nombre: nombre,
      mensaje: txtMensaje.val()
  }, function(mensaje) {
      txtMensaje.val('').focus();
      // console.log('respuesta server: ', resp);
  });

});
