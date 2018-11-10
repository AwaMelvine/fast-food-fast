import db from '../db';

export default class Order {
  constructor(order) {
    if (order && order.id) {
      this.id = order.id;
    }
    this.customer_id = order.customer_id ? order.customer_id : null;
    this.total_price = order.total_price ? order.total_price : 0;
    this.status = order.status ? order.status : null;
    if (order.created_at) {
      this.created_at = order.created_at;
    }
    if (order.updated_at || order.updated_at == null) {
      this.updated_at = order.updated_at;
    }
  }

  async save() {
    const params = [this.customer_id, this.total_price, this.status];
    try {
      const { rows } = await db.query(`INSERT INTO orders (customer_id, total_price, status)
      VALUES ($1, $2, $3) RETURNING *`, params);
      const newOrder = new Order(rows[0]);
      return newOrder;
    } catch (error) {
      return error;
    }
  }

  async saveOrderItems(items) {
    let records = '';
    items.forEach((item, index) => {
      if (index === 0) {
        records = `(${this.id}, ${item.item_id}, ${item.quantity}, ${item.unit_price})`;
      } else {
        records = `${records}, (${this.id}, ${item.item_id}, ${item.quantity}, ${item.unit_price})`;
      }
    });
    const sql = `INSERT INTO order_items (order_id, item_id, quantity, unit_price) VALUES ${records}`;
    try {
      const { rows } = await db.query(sql);
    } catch (error) {
      return error;
    }
  }

  async update() {
    const params = [this.customer_id, this.total_price, this.status, this.id];
    try {
      const { rows } = await db.query(`UPDATE orders SET 
                          customer_id=$1,
                          total_price=$2,
                          status=$3,
                          updated_at=NOW() 
                      WHERE id=$4 RETURNING *`, params);
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

      queryString = `SELECT o.*, o_i.*, i.name, i.image, u.username, u.email
                      FROM orders o 
                    LEFT JOIN order_items o_i ON o.id=o_i.order_id
                    LEFT JOIN food_items i ON i.id=o_i.item_id 
                    LEFT JOIN users u ON u.id=o.customer_id WHERE ${paramsString}`;
    } else {
      queryString = `SELECT o.*, o_i.*, i.name, i.image, u.username, u.email
                        FROM orders o 
                      LEFT JOIN order_items o_i ON o.id=o_i.order_id
                      LEFT JOIN food_items i ON i.id=o_i.item_id 
                      LEFT JOIN users u ON u.id=o.customer_id`;
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

  static async getOrderHistory(userId) {
    const text = `SELECT o.*, o_i.*, i.name, i.image
                      FROM orders o LEFT JOIN order_items o_i ON o.id=o_i.order_id
                      LEFT JOIN food_items i ON i.id=o_i.item_id WHERE o.customer_id=$1`;

    try {
      const { rows } = await db.query(text, [userId]);
      return rows.length ? rows : [];
    } catch (error) {
      return error;
    }
  }
}
