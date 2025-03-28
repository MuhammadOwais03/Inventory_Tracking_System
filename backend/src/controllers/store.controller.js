import { asyncHandler } from "../utils/asyncHandler.js";
import db from "../../models/index.js";
import jwt from 'jsonwebtoken';

const Store = db.Store;

console.log("Store model:", Store);

const createStore = asyncHandler(async (req, res)=>{
        const {name, ownerEmail, password, confirmPassword} = req.body;


        if(!name || !ownerEmail || !password || !confirmPassword){
            return res.status(400).json({message: "All fields are required"});
        }
        if(password !== confirmPassword){
            return res.status(400).json({message: "Passwords do not match"});
        }

        console.log("Creating store with data:", req.body);

        const store = await Store.create({
            name,
            ownerEmail,
            password
        });

        console.log("Store created successfully:", store);

        res.status(201).json({
            message: "Store created successfully",
            data: store
        });
})

const login = asyncHandler(async (req, res)=>{
    const {ownerEmail, password} = req.body;
    if(!ownerEmail || !password){
        return res.status(400).json({message: "All fields are required"});
    }
    console.log("Logging in with data:", req.body);
    const store = await Store.findOne({
        where: {
            ownerEmail
        }
    });
    if(!store){
        return res.status(404).json({message: "Store not found"});
    }
    const isMatch = await store.comparePassword(password);
    if(!isMatch){
        return res.status(401).json({message: "Invalid credentials"});
    }

    const accessToken = jwt.sign(
        { storeId: store.id, email: ownerEmail },
        process.env.ACCESS_SECRET_KEY,
        { expiresIn: process.env.ACCESS_EXPIRES }
    );

    console.log("Login successful, access token:", accessToken);

    const options = {
        maxAge: 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "strict",
        secure: false,
    };


    res.cookie("accessToken", accessToken, options);

    res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .json({
        message: "Login successful",
        store: {
            id: store.id,
            name: store.name,
            ownerEmail: store.ownerEmail
        }
    });
})

export {createStore, login};