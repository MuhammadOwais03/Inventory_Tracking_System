

import { Router } from "express";
import verifyToken from "../middleware/verifyToken.middleware.js";
import { createCategory, editCategory, deleteCategory, showCategory, showCategories } from "../controllers/category.controller.js";

const categoryRouter = Router();

categoryRouter.post('/create-category/:storeId', verifyToken, createCategory);
categoryRouter.put('/update-category/:id',verifyToken, editCategory );
categoryRouter.delete('/delete-category/:id', verifyToken, deleteCategory)
categoryRouter.get('/show-categories/:storeId', verifyToken, showCategories)
categoryRouter.get('/show-category/:id', verifyToken, showCategory)

export default categoryRouter