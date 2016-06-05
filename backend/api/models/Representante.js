/**
 * Representante.js
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
    pais: {
      model: 'pais'
    },
    tipodocid: {
      model: 'tipodocid'
    },
    jugadores: {
      collection: 'jugador',
      via: 'representante',
      through: 'representantejugador'
    },
    jugadoresrepresentante: {
      collection: 'representantejugador',
      via: 'representante'
    }
  }
};

