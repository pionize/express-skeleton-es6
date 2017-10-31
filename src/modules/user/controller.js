import jwt from 'jsonwebtoken';
import { User } from './model';
import { jwt as jwtOptions } from '../../../config';

export const UserController = {};
export default { UserController };

/**
 * View user profile
 */
UserController.getUser = async (req, res, next) => {
  let profile = req.user;
  if (req.params.id) {
    profile = await User.getById(req.params.id);
  }

  if (!profile) {
    const err = new Error('Invalid user');
    return next(err);
  }

  if (req.route.path === '/users/login') {
    const payload = { user_id: profile.user_id };
    profile.token = jwt.sign(payload, jwtOptions.secretOrKey);
  }
  delete profile.password;
  return res.API.success('User Data', profile);
};
