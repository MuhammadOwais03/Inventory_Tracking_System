

import { Router } from "express";
import { createProduct, showProduct, showProducts, stockInProduct, stockOutProduct, editProduct, deleteProduct, showProducsByCategory } from "../controllers/product.controller.js";
import verifyToken from "../middleware/verifyToken.middleware.js";


const productRouter = Router();

productRouter.post('/create-product/:storeId', verifyToken, createProduct)
productRouter.get('/show-products/:storeId', verifyToken, showProducts)
productRouter.get('/show-product/:id', verifyToken, showProduct)
productRouter.get('/show-product-by-category-id/:categoryId', verifyToken, showProducsByCategory)
productRouter.put('/stock-in/:id', verifyToken, stockInProduct)
productRouter.put('/stock-out/:id', verifyToken, stockOutProduct)
productRouter.put('/update-product/:id', verifyToken, editProduct)
productRouter.delete('/delete-product/:id', verifyToken, deleteProduct)

export default productRouter
