/**
 * Representante.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    archivos: {
      collection: 'archivo',
      via: 'representante'
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
    pais: {
      model: 'pais',
      required: true
    },
    jugadores: {
      collection: 'jugador',
      via: 'representante',
      through: 'representantejugador'
    },
    jugadoresrepresentante: {
      collection: 'representantejugador',
      via: 'representante'
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

