import { pool } from "../config/db.postgres.js";

export class Product {
    static async create({ name, description, price, stock_qty }) {
        const result = await pool.query(
            `INSERT INTO products (name, description, price, stock_qty)
             VALUES ($1, $2, $3, $4)
             RETURNING *`,
            [name, description, price, stock_qty]
        );
        return result.rows[0];
    }

    static async read() {
        const result = await pool.query(
            `SELECT *
             FROM products`
        );
        return result.rows;
    }

    static async readById(id) {
        const result = await pool.query(
            `SELECT *
             FROM products
             WHERE id = $1`,
            [id]
        );
        return result.rows[0];
    }

    static async updateById(id, { name, description, price, stock_qty }) {
        const result = await pool.query(
            `UPDATE products
             SET name = $1, description = $2, price = $3, stock_qty = $4
             WHERE id = $5
             RETURNING *`,
            [name, description, price, stock_qty, id]
        );
        return result.rows[0];
    }

    static async deleteById(id) {
        const result = await pool.query(
            `DELETE FROM products
             WHERE id = $1
             RETURNING *`,
            [id]
        );
        return result.rowCount;
    }
}
