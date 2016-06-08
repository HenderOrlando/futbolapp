/**
 * ArchivoController
 *
 * @description :: Server-side logic for managing archivoes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var
  PromiseFtp = require('promise-ftp'),
  ftp = new PromiseFtp(),
  dataconnect = {
    host: 'http://futbolitocolpas.com',
    user: 'futbolapp@admin.futbolitocolpas.com',
    password: 'fe23AfnN,oqB'
  }
;

module.exports = {
  upload: function(req, res){
    var
      uri = 'assets/images/avatars',
      dirname = require('path').resolve(sails.config.appPath, uri)
    ;
    req.file('file').upload({
      // don't allow the total upload size to exceed ~10MB
      maxBytes: 10000000,
      dirname: dirname
    },function (err, uploadedFiles) {
      if (err) {
        return res.negotiate(err);
      }

      // If no files were uploaded, respond with an error.
      if (uploadedFiles.length === 0){
        return res.badRequest('No file was uploaded');
      }

      /*ftp.connect(dataconnect).then(function(msg){
        sails.log.info(msg);
        return ftp.put(uploadedFiles[0].fd);
      })/!*.then(function(putfile){
        return ftp.get()
      })*!/.then(function(getfile){
        return ftp.end();
      }).catch(function(e){
        sails.log.error(e);
      });*/

      var
        urifile = uploadedFiles[0].fd.split('/'),
        data = {
          titulo: uploadedFiles[0].filename,
          src: sails.getBaseUrl() + uri.replace('assets/','/') + '/' + urifile[urifile.length-1],
          fd: uploadedFiles[0].fd
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
            var criteria = {};
            criteria[params.modelname] = item.id;
            Archivo.findOne({
              where: criteria,
              populate: false
            }).exec(function(err, archivo){
              if(err){
                return res.negotiate(err);
              }
              /*if(archivo && archivo.id){
               // borrar
               }else{*/
              return Archivo.create(data).exec(function(err, archivo){
                if(err){
                  return res.negotiate(err);
                }
                res.json(archivo);
              });
              //}
            });
          }
        });
      }else{
        return res.notFound();
      }
    });
  },
  download: function(req, res){

  }
};
