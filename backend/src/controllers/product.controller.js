import { Product } from "../models/product.model.js";

export class ProductController {
    static async create(req, res) {
        try {
            const { name, description, price, stock_qty } = req.body;
            if (!name || !description || price == null || stock_qty == null) {
                return res
                    .status(400)
                    .json({ error: "All fields are required" });
            }

            const product = await Product.create({
                name,
                description,
                price,
                stock_qty,
            });
            return res.status(201).json(product);
        } catch (err) {
            return res.status(500).json({ error: err.message });
        }
    }

    static async read(req, res) {
        try {
            const products = await Product.read();
            return res.status(200).json(products);
        } catch (err) {
            return res.status(500).json({ error: err.message });
        }
    }

    static async readById(req, res) {
        try {
            const id = Number(req.params.id);
            const product = await Product.readById(id);

            if (!product) {
                return res.status(404).json({ error: "Product not found" });
            }

            return res.status(200).json(product);
        } catch (err) {
            return res.status(500).json({ error: err.message });
        }
    }

    static async updateById(req, res) {
        try {
            const id = Number(req.params.id);
            const { name, description, price, stock_qty } = req.body;

            const product = await Product.updateById(id, {
                name,
                description,
                price,
                stock_qty,
            });

            if (!product) {
                return res.status(404).json({ error: "Product not found" });
            }

            return res.status(200).json(product);
        } catch (err) {
            return res.status(500).json({ error: err.message });
        }
    }

    static async deleteById(req, res) {
        try {
            const id = Number(req.params.id);
            const deletedCount = await Product.deleteById(id);

            if (deletedCount === 0) {
                return res.status(404).json({ error: "Product not found" });
            }

            return res.status(200).send();
        } catch (err) {
            return res.status(500).json({ error: err.message });
        }
    }
}
