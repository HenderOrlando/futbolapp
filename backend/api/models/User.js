/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

var bcrypt = require('bcrypt');
/*
* username => divela
* password => $2a$10$uMqczfO3EA0QAeNwCv4kBuH6da0D7hJC7U1gPuyyszy11O37T.ioa
*   password => 123
* */
module.exports = {

  attributes: {
    username: {
      type: 'string',
      required: true,
      unique: true
    },
    password: {
      type: 'string',
      required: true
    },
    toJSON: function() {
      var obj = this.toObject();
      delete obj.password;
      return obj;
    }
  },

  beforeCreate: function(user, cb) {
    bcrypt.genSalt(10, function(err, salt) {
      bcrypt.hash(user.password, salt, function(err, hash) {
        if (err) {
          console.log(err);
          cb(err);
        }else{
          user.password = hash;
          cb(null, user);
        }
      });
    });
  },

  beforeUpdate: function(user, cb) {
    User.findOne({id: user.id}).exec(function(err, usr){
      if(err){
        return cb(err);
      }
      if(usr.password !== user.password){
        bcrypt.genSalt(10, function(err, salt) {
          bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) {
              //sails.log.error(err);
              cb(err);
            }else{
              user.password = hash;
              cb(null, user);
            }
          });
        });
      }
    });
  }
};

