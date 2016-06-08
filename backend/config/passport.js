
var passport = require('passport'),
  LocalStrategy = require('passport-local').Strategy
;

module.exports = {
  express: {
    customMiddleware: function(app){
      sails.log.verbose('Express midleware for passport');
      app.use(passport.initialize());
      app.use(passport.session());
    }
  }
};
