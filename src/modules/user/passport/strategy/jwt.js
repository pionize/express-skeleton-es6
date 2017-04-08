import _ from 'lodash';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { User, Status } from '../../model';
import { jwt as jwtOptions } from '../../../../../config';

const jwtParams = {
  secretOrKey: jwtOptions.secretOrKey,
  jwtFromRequest: ExtractJwt.fromAuthHeader(),
};
export default new JwtStrategy(jwtParams, (jwtPayload, done) => {
  new User({ user_id: jwtPayload.user_id }).fetch().then((user) => {
    if (user) {
      if (_.includes([Status.ACTIVE], user.get('status'))) {
        return done(null, user.toJSON());
      }
    }
    return done(null, false);
  });
});
