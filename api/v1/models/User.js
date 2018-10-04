import db from '../db';

export default class User {
  constructor(user) {
    if (user && user.id) {
      this.id = user.id;
    }
    this.role = user && user.role ? user.role : 'user';
    this.username = user && user.username ? user.username : null;
    this.email = user && user.email ? user.email : null;
    this.password = user && user.password ? user.password : null;
    if (user.created_at) {
      this.created_at = user.created_at;
    }
    if (user.updated_at || user.updated_at == null) {
      this.updated_at = user.updated_at;
    }
  }


  async save() {
    const params = [this.role, this.username, this.email, this.password];
    const { rows } = await db.query(`INSERT INTO users (role, username, email, password)
      VALUES ($1, $2, $3, $4) RETURNING *`, params);
    const newUser = new User(rows[0]);
    return newUser;
  }

  async update() {
    const params = [this.role, this.username, this.email, this.password, this.id];
    try {
      const { rows } = await db.query(`UPDATE users SET 
                            role=$1, 
                            username=$2, 
                            email=$3, 
                            updated_at=NOW(), 
                            password=$4
                    WHERE id=$5 RETURNING *`, params);
      const user = new User(rows[0]);
      return user;
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

      queryString = `SELECT * FROM users WHERE ${paramsString}`;
    } else {
      queryString = 'SELECT * FROM users';
    }

    try {
      const { rows } = await db.query(queryString, params);
      return rows;
    } catch (error) {
      return error;
    }
  }

  static async findById(userId) {
    try {
      const { rows } = await db.query('SELECT * FROM users WHERE id=$1 LIMIT 1', [userId]);
      return rows.length ? new User(rows[0]) : false;
    } catch (error) {
      return error;
    }
  }

  static async delete(userId) {
    try {
      const result = await db.query('DELETE FROM users WHERE id=$1', [userId]);
      return result;
    } catch (error) {
      return error;
    }
  }

  static async blacklistToken(token) {
    try {
      const result = await db.query('INSERT INTO token_blacklist (token) VALUES ($1)', [token]);
      return result;
    } catch (error) {
      return error;
    }
  }
}
