import express from "express"
import cors from "cors"
import cookieParser from 'cookie-parser';
import rateLimit from "express-rate-limit"


const limiter = rateLimit({
    windowMs: 60 * 1000,  
    max: 100,  
    message: "Too many requests from this IP, please try again later.",
    standardHeaders: true,  
    legacyHeaders: false,  // Disable `X-RateLimit-*` headers
});




const app = express()

app.use(cors({
    origin: "*",
    credentials: true
}))
app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({
    extended: true,
    limit: "16kb"
}))
app.use(express.static("public"))

app.use(cookieParser());  // ✅ Enables reading cookies from requests
app.use(limiter);  // Apply to all routes

//Routes

import storeRouter from "./routes/store.routes.js"
import categoryRouter from "./routes/category.routes.js";
import productRouter from "./routes/product.routes.js";
import inventoryRouter from "./routes/inventoryLog.routes.js";

app.use('/api/v2/store',storeRouter)
app.use('/api/v2/category', categoryRouter)
app.use('/api/v2/product', productRouter)
app.use('/api/v2/logs', inventoryRouter)

app.get("/", (req, res) => {
    res.send("Welcome to the Store API")
}
)


export { app }