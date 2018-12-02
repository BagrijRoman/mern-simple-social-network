const JwtStrategy = require('passport-jwt').Strategy;
const ExttractJwt = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');
const User = mongoose.model('users');
const secretOrKey = require('./keys').secretOrKey;

const opts = {
  jwtFromRequest: ExttractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey,
};

module.exports = passport => {
  passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
    User.findById(jwt_payload.id)
      .then(user => {
        if(user) {
          return done(null, user);
        }
        return done(null, false);
      })
      .catch(err => console.log(`Authorization error ${err}`));
  }));
};
