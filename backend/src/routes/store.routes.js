
import { Router } from "express";
import { createStore, login } from "../controllers/store.controller.js";
import verifyToken from "../middleware/verifyToken.middleware.js";

const storeRouter = Router();

storeRouter.post("/create-store", createStore);
storeRouter.post("/login", login);

storeRouter.get("/get-store", verifyToken, (req, res) => {
    console.log(req.cookies)
    res.status(200).json({
        message: "Store fetched successfully",
        data: req.user
    });
}
);


export default storeRouter;