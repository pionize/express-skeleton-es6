import _ from 'lodash';
import { Strategy as LocalStrategy } from 'passport-local';
import { User, UserStatus } from '../../model';

export default new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: false,
}, async (email, password, done) => {
  const user = await User.findOne({ where: { email } });
  if (user.checkPassword(password)) {
    if (_.includes([UserStatus.INACTIVE], user.status)) {
      return done(null, false);
    }
    return done(null, user.toJSON());
  }
  return done(null, false);
});
