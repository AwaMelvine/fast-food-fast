import db from '../db';

export default class Category {
  constructor(category) {
    if (category && category.id) {
      this.id = category.id;
    }
    this.name = category.name ? category.name.toString() : null;
    this.description = category.description ? category.description.toString() : '';
    if (category.created_at) {
      this.created_at = category.created_at;
    }
    if (category.updated_at) {
      this.updated_at = category.updated_at;
    }
  }

  async save() {
    const params = [this.name, this.description];
    try {
      await db.query(`INSERT INTO categories (name, description)
      VALUES ($1, $2)`, params);
      const categoryData = await Category.find({ name: this.name });
      return categoryData[0];
    } catch (error) {
      return error;
    }
  }


  async update() {
    const params = [this.name, this.description, this.id];
    try {
      await db.query(`UPDATE categories SET 
                      name=$1, 
                      description=$2, 
                      updated_at=NOW() 
                    WHERE id=$3`, params);
      const category = await Category.findById(this.id);
      return category;
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

      queryString = `SELECT * FROM categories WHERE ${paramsString}`;
    } else {
      queryString = 'SELECT * FROM categories';
    }

    try {
      const { rows } = await db.query(queryString, params);
      return rows;
    } catch (error) {
      return error;
    }
  }

  static async findById(categoryId) {
    try {
      const { rows } = await db.query('SELECT * FROM categories WHERE id=$1 LIMIT 1', [categoryId]);
      return rows.length ? new Category(rows[0]) : {};
    } catch (error) {
      return error;
    }
  }

  static async delete(categoryId) {
    try {
      const result = await db.query('DELETE FROM categories WHERE id=$1', [categoryId]);
      return result;
    } catch (error) {
      return error;
    }
  }
}
