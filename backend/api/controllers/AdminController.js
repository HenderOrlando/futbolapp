/**
 * AdminController
 *
 * @description :: Server-side logic for managing admins
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	models: function(req, res){
    var models = {};
    _.forEach(sails.models, function(model, key){
      var attrs = _.merge({},model._attributes);
      /*_.forEach(sails.models, function(model, key){

      });*/
      delete attrs.id;
      delete attrs.slug;
      delete attrs.createdAt;
      delete attrs.updatedAt;

      models[key] = attrs;
    });

    res.json(models);
  },
  login: function(req, res){
    var
      params = req.allParams(),
      email = params.email,
      password = params.password
    ;
    
  }
};

