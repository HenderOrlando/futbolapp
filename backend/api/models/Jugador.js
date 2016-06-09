/**
 * Jugador.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    archivos: {
      collection: 'archivo',
      via: 'jugador'
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
      model: 'municipio',
      required: true
    },
    disciplina: {
      model: 'disciplina',
      required: true
    },
    posicion: {
      model: 'posicion',
      required: true
    },
    entrenador: {
      model: 'entrenador'
    },
    representantes: {
      collection: 'representante',
      via: 'jugador',
      through: 'representantejugador'
    },
    representantesjugador: {
      collection: 'representantejugador',
      via: 'jugador'
    },
    cualidades: {
      collection: 'cualidad',
      via: 'jugador',
      through: 'cualidadjugador'
    },
    cualidadesjugador: {
      collection: 'cualidadjugador',
      via: 'jugador'
    },
    avatar: {
      model: 'archivo'
    },

    toJSON: function(){
      var obj = this.toObject();

      if(obj.avatar && obj.avatar.filename){
        obj.avatar = obj.avatar.filename;
      }
      return obj;
    }
  }
};

