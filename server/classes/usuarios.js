class Usuarios {//se encarga de los usuarios conectados
  constructor(){
    this.personas= [];//arreglo de personas conectadas
  }

//agrega una persona
  agregarPersona(id, nombre,sala){
    let persona = { id,nombre,sala};

    this.personas.push(persona);

    return this.personas;
  }
//contiene una sola persona
  getPersona(id) {
    let persona = this.personas.filter(persona => persona.id === id)[0];

    return persona;
  }
//contiene todas las personas
  getPersonas(){
    return this.personas;
  }

  getPersonasPorSala(sala){
    let personasEnSala = this.personas.filter(persona => persona.sala === sala);
    return personasEnSala;
  }
//borra a las personas que salen del chat
  borrarPersona(id){

    let personaBorrada = this.getPersona(id);
    this.personas = this.personas.filter(persona => persona.id != id);

    return personaBorrada;
  }
}

module.exports = {
  Usuarios
}
