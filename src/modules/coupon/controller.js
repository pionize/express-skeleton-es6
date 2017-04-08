import { Coupon } from './model';

export const CouponController = {};
export default { CouponController };

/**
 * Get Coupon
 */
CouponController.getCoupon = async (req, res, next) => {
  let coupon;
  if (req.params.id) {
    coupon = await Coupon.getById(req.params.id);
  } else {
    coupon = await Coupon.get({ status: 'active' });
  }

  if (!coupon) {
    const err = new Error('Invalid coupon');
    return next(err);
  }

  req.resData = {
    status: true,
    message: 'Coupon Data',
    data: coupon,
  };
  return next();
};
