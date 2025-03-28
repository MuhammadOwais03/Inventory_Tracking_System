

import { Router } from "express";
import verifyToken from "../middleware/verifyToken.middleware.js";
import { showInventoryLog, deleteInventoryLog } from "../controllers/inventoryLog.controller.js";


const inventoryRouter = Router()


inventoryRouter.get('/show-logs/:storeId', verifyToken, showInventoryLog)
inventoryRouter.delete('/delete-log/:id', verifyToken, deleteInventoryLog)

export default inventoryRouter