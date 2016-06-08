/**
 * Archivo.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

var fs = require('fs');

module.exports = {

  attributes: {
    titulo: {
      type: 'string',
      required: true
    },
    slug: {
      type: 'string'
    },
    src: {
      type: 'string',
      required: true
    },
    fd: {
      type: 'string',
      required: true
    },
    jugador: {
      model: 'jugador'
    },
    entrenador: {
      model: 'entrenador'
    },
    representante: {
      model: 'representante'
    },

    toJSON: function(){
      var obj = this.toObject();
      delete obj.fd;
      return obj;
    }
  },

  beforeDestroy: function(criteria, cb){
    Archivo.findOne(criteria).exec(function(err, archivo){
      if(err){
        return cb(err);
      }
      fs.unlink(archivo.fd, function(err){
        if(err){
          return cb(err);
        }
        cb();
      });
    });
  }
};

