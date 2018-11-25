import db from '../db';

export default class FoodItem {
  constructor(foodItem) {
    if (foodItem.id) {
      this.id = foodItem.id;
    }
    this.name = foodItem.name ? foodItem.name.toString() : null;
    this.image = foodItem.image ? foodItem.image.toString() : 'http://via.placeholder.com/170x170';
    this.description = foodItem.description ? foodItem.description.toString() : 0;
    this.quantity = foodItem.quantity ? foodItem.quantity : 0;
    this.unit_price = foodItem.unit_price ? foodItem.unit_price : 0;
    if (foodItem.created_at) {
      this.created_at = foodItem.created_at;
    }
    if (foodItem.updated_at || foodItem.updated_at == null) {
      this.updated_at = foodItem.updated_at;
    }
  }

  async save() {
    const params = [this.name, this.image, this.description, this.quantity, this.unit_price];
    try {
      const { rows } = await db.query(`INSERT INTO food_items (name, image, description, quantity, unit_price)
      VALUES ($1, $2, $3, $4, $5) RETURNING *`, params);
      const foodItemData = new FoodItem(rows[0]);
      return foodItemData;
    } catch (error) {
      return error;
    }
  }


  async update() {
    const params = [this.name, this.image, this.description, this.quantity, this.unit_price, this.id];
    try {
      await db.query(`UPDATE food_items SET 
                        name=$1,
                        image=$2,
                        description=$3,
                        quantity=$4,
                        unit_price=$5,
                        updated_at=NOW() 
                    WHERE id=$6`, params);
      const foodItem = await FoodItem.findById(this.id);
      return foodItem;
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

      queryString = `SELECT * FROM food_items WHERE ${paramsString}`;
    } else {
      queryString = 'SELECT * FROM food_items';
    }

    try {
      const { rows } = await db.query(queryString, params);
      return rows;
    } catch (error) {
      return error;
    }
  }

  static async findById(foodItemId) {
    try {
      const { rows } = await db.query('SELECT * FROM food_items WHERE id=$1 LIMIT 1', [foodItemId]);
      return rows.length ? new FoodItem(rows[0]) : false;
    } catch (error) {
      return error;
    }
  }

  static async search(searchTerm) {
    try {
      const { rows } = await db.query(`SELECT * FROM food_items WHERE name LIKE '%${searchTerm}%' OR description LIKE '%${searchTerm}%'`);
      return rows.length ? rows : [];
    } catch (error) {
      return error;
    }
  }

  static async delete(foodItemId) {
    try {
      const result = await db.query('DELETE FROM food_items WHERE id=$1', [foodItemId]);
      return result;
    } catch (error) {
      return error;
    }
  }
}
