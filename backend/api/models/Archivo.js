/**
 * Archivo.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

var
  Ftp = require('ftp'),
  dataconnect = {
    host: 'futbolitocolpas.com',
    user: 'futbolapp@admin.futbolitocolpas.com',
    password: 'fe23AfnN,oqB'
    /*,debug: function(ele){
     sails.log.debug(ele)
     }*/
  },
  ftp = function (cb){
    var ftp = new Ftp();
    ftp.on('ready', function(){
      cb(ftp);
    });
    ftp.connect(dataconnect);
    return ftp;
  }
;

module.exports = {

  attributes: {
    titulo: {
      type: 'string',
      required: true
    },
    slug: {
      type: 'string'
    },
    filename: {
      type: 'string',
      required: true
    },
    src: {
      type: 'string',
      required: true
    },
    type: {
      type: 'string',
      required: true
    },
    size: {
      type: 'int',
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
    user: {
      model: 'user'
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
      ftp(function(ftp_){
        ftp_.delete(archivo.src,function(err){
          if(err){
            return cb(err);
          }
          cb();
        })
      });
      /*fs.unlink(archivo.fd, function(err){
        if(err){
          return cb(err);
        }
        cb();
      });*/
    });
  }
};

