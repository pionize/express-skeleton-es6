import core from '../../core';

const bookshelf = core.mysql.db;

class OrderLogModel extends bookshelf.Model {
  // eslint-disable-next-line class-methods-use-this
  get tableName() {
    return 'order_log';
  }
  // eslint-disable-next-line class-methods-use-this
  get idAttribute() {
    return 'order_log_id';
  }
  // eslint-disable-next-line class-methods-use-this
  get hasTimestamps() {
    return true;
  }

  /**
   * Create a new order log
   * @param {Object} data
   */
  static async create(data) {
    const orderLog = new this(data);
    return await orderLog.save();
  }

  /**
   * Get a order log by id
   * @param {Integer} id
   */
  static async getById(id) {
    return await this.where({ line_item_id: id }).fetch();
  }

  /**
   * Get a order log by condition
   * @param {Object} condition
   */
  static async get(condition = null) {
    return await this.where(condition).fetchAll();
  }
}

export const OrderLog = OrderLogModel;
