/**
 * ArchivoController
 *
 * @description :: Server-side logic for managing archivoes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var
  //fs= require('fs'),
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
  upload: function(req, res){
    var
      uri = 'assets/images/avatars'
      //dirname = require('path').resolve(sails.config.appPath, uri)
    ;
    req.file('file').upload({
      // don't allow the total upload size to exceed ~10MB
      maxBytes: 10000000,
      //dirname: dirname
    },function (err, uploadedFiles) {
      if (err) {
        return res.negotiate(err);
      }

      // If no files were uploaded, respond with an error.
      if (uploadedFiles.length === 0){
        return res.badRequest('No file was uploaded');
      }
      var urifile = uploadedFiles[0].fd.split('/');

      sails.log.error(uploadedFiles);
      //sails.log.error('avatars/' + urifile[urifile.length-1]);
      ftp(function(ftp_){
        ftp_.put(uploadedFiles[0].fd, 'avatars/' + urifile[urifile.length-1], function(error){
          if(error){
            return res.negotiate(error);
          }
          var
            data = {
              titulo: uploadedFiles[0].filename,
              filename: urifile[urifile.length-1],
              //src: sails.getBaseUrl() + uri.replace('assets/','/') + '/' + urifile[urifile.length-1],
              //src: sails.config.getUrlBase() + uri.replace('assets/','/') + '/' + urifile[urifile.length-1],
              src: 'avatars/' + urifile[urifile.length-1],
              size: uploadedFiles[0].size,
              type: uploadedFiles[0].type
            },
            params = req.allParams()
            ;
          if(params.modelname && params.id){
            data[params.modelname] = params.id;
            var Model = sails.models[params.modelname];
            return Model.findOne({
              where: {
                id: params.id
              },
              populate: false
            }).exec(function(err, item){
              if(err){
                return res.negotiate(err);
              }
              //sails.log.info(item);
              if(item && item.id){
                return Archivo.create(data).exec(function(err, archivo){
                  if(err){
                    return res.negotiate(err);
                  }
                  res.json(archivo);
                });
                /*var criteria = {};
                criteria[params.modelname] = item.id;
                Archivo.findOne({
                  where: criteria,
                  populate: false
                }).exec(function(err, archivo){
                  if(err){
                    return res.negotiate(err);
                  }
                  if(archivo && archivo.id){
                   // borrar
                  }else{
                    return Archivo.create(data).exec(function(err, archivo){
                      if(err){
                        return res.negotiate(err);
                      }
                      res.json(archivo);
                    });
                  }
                });*/
              }
            });
          }else{
            return res.notFound();
          }
        });
      });
    });
  },
  show: function(req, res){
    var
      params = req.allParams(),
      uri = 'assets/images/avatars'
    ;
    if(params.id || params.name){
      var criteria = {};
      if(params.id){
        criteria.id = params.id;
      }
      if(params.name){
        criteria.filename = params.name;
      }
      return Archivo.findOne(criteria).exec(function(err, file){
        if(err){
          return res.negotiate(err);
        }
        var str = '';
        //sails.log.info(file)
        res.writeHead(200, {'Content-Type': file.type});
        ftp(function(ftp_){
          ftp_.get(file.src, function(err, stream){
            if(err){
              return res.negotiate(err);
            }
            stream.once('close', function(err){
              if(err){
                res.negotiate(err);
              }
              ftp_.end();
              res.end();
            });
            stream.pipe(res, {end: false});
          });
        });
      });
    }
  }
};

