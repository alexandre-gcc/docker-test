import express from "express";
import helmet from "helmet";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";

import { errorHandler } from "./middlewares/error-handler.js";

import productRoutes from "./routes/product.routes.js";

dotenv.config();

const app = express();

app.use(helmet());
app.use(express.json());
app.use(morgan("dev"));

app.use(
    cors({
        origin: process.env.CORS_ORIGIN || "*",
        credentials: true,
    })
);

app.get("/", (req, res) => res.json({ status: "ok" }));

app.use("/api/products", productRoutes);

app.use(errorHandler);

export default app;
