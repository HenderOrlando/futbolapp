/**
 * CualidadJugador.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    logro: {
      type: 'float',
      required: true
    },
    maximo: {
      type: 'string'
    },
    actual: {
      type: 'boolean',
      defaultsTo: true
    },
    cualidad: {
      model: 'cualidad',
      required: true
    },
    jugador: {
      model: 'jugador',
      required: true
    },
    entrenador: {
      model: 'entrenador'
    },

    toJSON: function(){
      var obj = this.toObject();
      if(obj.cualidad && obj.cualidad.titulo && obj.jugador && obj.jugador.titulo){
        obj.titulo = obj.cualidad.titulo + ' de ' + obj.jugador.titulo;
        obj.slug = this.getSlug(obj.titulo);
      }
      return obj;
    },
    getSlug: function (str){
      return _.kebabCase(_.deburr(str));
    }
  }
};

