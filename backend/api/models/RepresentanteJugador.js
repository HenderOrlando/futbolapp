/**
 * RepresentanteJugador.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    representante: {
      model: 'representante',
      required: true
    },
    jugador: {
      model: 'jugador',
      required: true
    },
    pariente: {
      type: 'string',
      enum: ['Mamá', 'Papá', 'Tía', 'Tío', 'Abuela', 'Abuelo']
    },

    toJSON: function(){
      var obj = this.toObject();
      if(obj.representante && obj.representante.titulo && obj.jugador && obj.jugador.titulo){
        obj.titulo = obj.representante.titulo + obj.pariente + ' de ' + obj.jugador.titulo;
        obj.slug = this.getSlug(obj.titulo);
      }
      return obj;
    },
    getSlug: function (str){
      return _.kebabCase(_.deburr(str));
    }
  }
};

