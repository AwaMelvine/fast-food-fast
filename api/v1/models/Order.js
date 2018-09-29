import db from '../db';

export default class Order {
  constructor(order) {
    if (order && order.id) {
      this.id = order.id;
    }
    this.customer_id = order.customer_id ? order.customer_id : null;
    this.item_id = order.item_id ? order.item_id : 0;
    this.quantity = order.quantity ? order.quantity : 0;
    this.total_price = order.total_price ? order.total_price : 0;
    this.date_to_deliver = order.date_to_deliver ? order.date_to_deliver : null;
    this.status = order.status ? order.status : null;
    if (order.created_at) {
      this.created_at = order.created_at;
    }
    if (order.updated_at || order.updated_at == null) {
      this.updated_at = order.updated_at;
    }
  }

  async save() {
    const params = [this.customer_id, this.item_id, this.quantity, this.total_price, this.date_to_deliver, this.status];
    try {
      const { rows } = await db.query(`INSERT INTO orders (customer_id, item_id, quantity, total_price, date_to_deliver, status)
      VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`, params);
      const newOrder = new Order(rows[0]);
      return newOrder;
    } catch (error) {
      return error;
    }
  }

  async update() {
    const params = [this.customer_id, this.item_id, this.quantity, this.total_price, this.date_to_deliver, this.status, this.id];
    try {
      const { rows } = await db.query(`UPDATE orders SET 
                          customer_id=$1,
                          item_id=$2,
                          quantity=$3,
                          total_price=$4,
                          date_to_deliver=$5,
                          status=$6,
                          updated_at=NOW() 
                      WHERE id=$7 RETURNING *`, params);
      const order = new Order(rows[0]);
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
      return rows.length ? new Order(rows[0]) : false;
    } catch (error) {
      return error;
    }
  }
}
