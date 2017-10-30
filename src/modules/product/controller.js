import { Product } from './model';

export const ProductController = {};
export default { ProductController };

/**
 * Get Product
 */
ProductController.getProductById = async (req, res, next) => {
  const id = req.params.id;
  const product = await Product.getById(id);

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

/**
 * Get Product
 */
ProductController.getAllProduct = async (req, res, next) => {
  const products = await Product.getAll({ status: 'active' });

  req.resData = {
    status: true,
    message: 'Products Data',
    data: products,
  };
  return next();
};
