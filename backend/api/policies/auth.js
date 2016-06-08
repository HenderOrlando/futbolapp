/**
 * auth
 *
 * @module      :: Policy
 * @description :: Simple policy to allow any authenticated user
 *                 Assumes that your login action in one of your controllers sets `req.session.authenticated = true;`
 * @docs        :: http://sailsjs.org/#!/documentation/concepts/Policies
 *
 */
module.exports = function(req, res, next) {

  if (req.isAuthenticated()) {
    req.session.authenticated = req.isAuthenticated();
    return next();
  }
  else{
    if(req.session.userid === req.headers.authenticate.userid){
      return next();
    }else{
      return res.forbidden('You are not permitted to perform this action.');
    }
  }
};
