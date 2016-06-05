/**
 * Default model configuration
 * (sails.config.models)
 *
 * Unless you override them, the following properties will be included
 * in each of your models.
 *
 * For more info on Sails models, see:
 * http://sailsjs.org/#!/documentation/concepts/ORM
 */

module.exports.models = {

  /***************************************************************************
  *                                                                          *
  * Your app's default connection. i.e. the name of one of your app's        *
  * connections (see `config/connections.js`)                                *
  *                                                                          *
  ***************************************************************************/
  // connection: 'localDiskDb',
  connection: 'mongoDb',

  /***************************************************************************
  *                                                                          *
  * How and whether Sails will attempt to automatically rebuild the          *
  * tables/collections/etc. in your schema.                                  *
  *                                                                          *
  * See http://sailsjs.org/#!/documentation/concepts/ORM/model-settings.html  *
  *                                                                          *
  ***************************************************************************/
  // migrate: 'alter'
  migrate: 'alter',

  beforeCreate: function (values, cb){
    var titulo = values.titulo;
    if(values.username){
      titulo = values.username
    }
    if(titulo){
      values.slug = this.getSlug(values.titulo);
    }
    cb();
  },

  beforeUpdate: function (values, cb){
    var titulo = values.titulo;
    if(values.username){
      titulo = values.username
    }
    if(titulo){
      values.slug = this.getSlug(values.titulo);
    }
    cb();
  },
  
  getSlug: function (str){
    return _.kebabCase(_.deburr(str));
  }
};
