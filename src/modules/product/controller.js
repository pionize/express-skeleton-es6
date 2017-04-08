import { Product } from './model';

export const ProductController = {};
export default { ProductController };

/**
 * Get Product
 */
ProductController.getProduct = async (req, res, next) => {
  let product;

  if (req.params.id) {
    product = await Product.getById(req.params.id);
  } else {
    product = await Product.get({ status: 'active' });
  }

  if (!product) {
    const err = new Error('Invalid product');
    return next(err);
  }

  req.resData = {
    status: true,
    message: 'Product Data',
    data: product,
  };
  return next();
};
