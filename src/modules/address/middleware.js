import validate from 'validate.js';
import constraints from './validation';

export function validateCreate() {
  return (req, res, next) => {
    const hasError = validate(req.body, constraints.create);
    if (hasError) {
      return next(hasError);
    }
    return next();
  };
}

export default { validateCreate };
