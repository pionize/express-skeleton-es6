import jwt from 'jsonwebtoken';
import { User } from './model';
import { jwt as jwtOptions } from '../../../config';
import { getUserError } from './messages';

export const UserController = {};
export default { UserController };

/**
 * View user profile
 */
UserController.getUser = async (req, res, next) => {
  let profile = req.user;
  if (req.params.id) {
    profile = await User.findById(req.params.id);
  }


  if (!profile) {
    return next(getUserError('user', 'not_found'));
  }

  if (req.route.path === '/users/login') {
    const payload = { user_id: profile.user_id };
    profile.token = jwt.sign(payload, jwtOptions.secretOrKey);
  }
  delete profile.password;
  return res.API.success('User Data', profile);
};
