import fs from 'fs';
import moment from 'moment';
import { Payment } from './model';
import orderModule from '../order';
import config from '../../../config';

const { Order, OrderStatus } = orderModule.model;

export const PaymentController = {};

/**
 * Create payment
 */
PaymentController.createPayment = async (req, res, next) => {
  const { order_number,
    account_name,
    account_bank,
    account_number,
    merchant_number,
    merchant_bank,
    amount,
    proof } = req.body;
  const imageFolder = `${config.publicPath}/image`;
  if (!fs.existsSync(imageFolder)) {
    fs.mkdirSync(imageFolder);
  }

  const proofData = proof.replace(/^data:image\/\w+;base64,/, '');
  const buf = new Buffer(proofData, 'base64');
  const imageFileName = `${moment().unix()}.png`;
  fs.writeFile(`${imageFolder}/${imageFileName}`, buf);
  const imageCdn = `${config.cdnPath}/${imageFileName}`;
  const payment = await Payment.create({ order_number,
    account_name,
    account_bank,
    account_number,
    merchant_number,
    merchant_bank,
    amount,
    proof: imageCdn });

  req.resData = {
    status: true,
    message: 'Payment Data',
    data: payment,
  };
  return next();
};

/**
 * Get payment
 */
PaymentController.getPayment = async (req, res, next) => {
  let payment;

  if (req.params.id) {
    payment = await Payment.getById(req.params.id);
  } else {
    payment = await Payment.get({ status: 'active' });
  }

  if (!payment) {
    const err = new Error('Invalid payment');
    return next(err);
  }

  req.resData = {
    status: true,
    message: 'Payment Data',
    data: payment,
  };
  return next();
};

/**
 * Verify payment
 */
PaymentController.verifyPayment = async (req, res, next) => {
  const { order, payment } = req;
  const orderId = order.get('order_id');
  await Order.update(orderId, { status: OrderStatus.PENDING_SHIPMENT });
  await order.refresh({ withRelated: ['lineItems', 'orderLogs'] });
  req.resData = {
    status: true,
    message: 'Order Data',
    data: { payment, order },
  };
  return next();
};

export default { PaymentController };
