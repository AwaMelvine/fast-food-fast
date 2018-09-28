import db from '../db';

export default class Order {
  constructor(order) {
    if (order && order.id) {
      this.id = order.id;
    }
    this.customerId = order.customerId || null;
    this.itemId = order.itemId || 0;
    this.quantity = order.quantity || 0;
    this.totalPrice = order.totalPrice || 0;
    this.dateToDeliver = order.dateToDeliver || null;
    this.status = order.status || null;
    order.created_at ? this.created_at = order.created_at : '';
    order.updated_at ? this.updated_at = order.updated_at : '';
  }

  async save() {
    const params = [this.customerId, this.itemId, this.quantity, this.totalPrice, this.dateToDeliver, this.status];
    try {
      await db.query(`INSERT INTO orders (customerId, itemId, quantity, totalPrice, dateToDeliver, status)
      VALUES ($1, $2, $3, $4, $5, $6)`, params);
      const orderData = await Order.find({ customerId: this.customerId, itemId: this.itemId });
      return orderData[0];
    } catch (error) {
      return error;
    }
  }

  async update() {
    const params = [this.customerId, this.itemId, this.quantity, this.totalPrice, this.dateToDeliver, this.status, this.id];
    try {
      await db.query(`UPDATE orders SET 
                          customerId=$1,
                          itemId=$2,
                          quantity=$3,
                          totalPrice=$4,
                          dateToDeliver=$5,
                          status=$6,
                          updated_at=NOW() 
                      WHERE id=$7`, params);
      const order = await Order.findById(this.id);
      return order;
    } catch (error) {
      return error;
    }
  }

  static async find(query = {}) {
    let paramsString = '';
    let queryString = '';
    const params = [];

    if (Object.keys(query).length > 0) {
      // Build query string from parameters
      Object.keys(query).map((key, index) => {
        index += 1;
        const extendQuery = index === 1 ? '' : ' AND';
        paramsString += `${extendQuery} ${key}=$${index}`;
        params.push(query[key]);
        return key;
      });

      queryString = `SELECT * FROM orders WHERE ${paramsString}`;
    } else {
      queryString = 'SELECT * FROM orders';
    }

    try {
      const { rows } = await db.query(queryString, params);
      return rows;
    } catch (error) {
      return error;
    }
  }

  static async findById(orderId) {
    try {
      const { rows } = await db.query('SELECT * FROM orders WHERE id=$1 LIMIT 1', [orderId]);
      return rows.length ? new Order(rows[0]) : {};
    } catch (error) {
      return error;
    }
  }
}
