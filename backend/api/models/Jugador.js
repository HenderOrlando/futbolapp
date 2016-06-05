/**
 * Jugador.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    titulo: {
      type: 'string'
    },
    slug: {
      type: 'string'
    },
    descripcion: {
      type: 'text'
    },
    docid: {
      type: 'int'
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
    tipodocid: {
      model: 'tipodocid'
    },
    posicion: {
      model: 'posicion'
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
    }
  }
};

