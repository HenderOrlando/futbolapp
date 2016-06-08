/**
 * Entrenador.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    archivos: {
      collection: 'archivo',
      via: 'entrenador'
    },
    titulo: {
      type: 'string',
      required: true
    },
    slug: {
      type: 'string'
    },
    descripcion: {
      type: 'text'
    },
    email: {
      type: 'email',
      required: true
    },
    tipodocid: {
      model: 'tipodocid',
      required: true
    },
    docid: {
      type: 'int',
      required: true
    },
    sexo: {
      type: 'string',
      enum: ['Masculino', 'Femenino']
    },
    fechanac: {
      type: 'date'
    },
    fechaingreso: {
      type: 'date'
    },
    municipio: {
      model: 'municipio'
    },
    disciplina: {
      model: 'disciplina'
    },
    jugadores: {
      collection: 'jugador',
      via: 'entrenador'
    },
    evaluaciones: {
      collection: 'cualidadjugador',
      via: 'entrenador'
    },
    avatar: {
      model: 'archivo'
    },

    toJSON: function(){
      var obj = this.toObject();

      if(obj.avatar && obj.avatar.src){
        obj.avatar = obj.avatar.src;
      }
      return obj;
    }
  }
};

