/**
 * AuthController
 *
 * @description :: Server-side logic for managing Auths
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var passport = require('passport');

module.exports = {
  login: function(req, res){
    passport.authenticate('local', function(err, user, info) {
      //sails.log.error(info)
      if ((err) || (!user)) {
        return res.send({
          message: 'login failed'
        });
      }
      req.logIn(user, function(err) {
        if (err) res.send(err);
        req.session.userid = user.id;
        return res.send({
          userid: user.id,
          message: 'login successful'
        });
      });
    })(req, res);
  },
  logout: function (req,res){
    req.logout();
    res.send('logout successful');
  }
};

