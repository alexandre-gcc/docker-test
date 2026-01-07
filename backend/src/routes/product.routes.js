import { Router } from "express";
import { ProductController } from "../controllers/product.controller.js";

const router = Router();

router.post("/", ProductController.create);
router.get("/", ProductController.read);
router.get("/:id", ProductController.readById);
router.put("/:id", ProductController.updateById);
router.delete("/:id", ProductController.deleteById);

export default router;
