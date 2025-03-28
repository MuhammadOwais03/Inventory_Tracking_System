import jwt from 'jsonwebtoken';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import db from '../../models/index.js';

const Store = db.Store;

const verifyToken = asyncHandler(async (req, res, next) => {
   console.log(req.params)

    // Extract token from cookies
    const token = req.cookies?.accessToken;  
    if (!token) {
        return res.status(401).json(new ApiResponse(401, null, 'Access denied. No token provided.'));
    }

    try {
        // Verify token
        const payload = jwt.verify(token, process.env.ACCESS_SECRET_KEY); 
        if (!payload) {
            return res.status(401).json(new ApiResponse(401, null, 'Invalid Token'));
        }

        // Fetch store details, excluding password
        const store = await Store.findByPk(payload.storeId, { attributes: { exclude: ['password'] } });
        if (!store) {
            return res.status(401).json(new ApiResponse(401, null, 'Store not found'));
        }

        // Attach store to request object
        req.user = store;
        next();  
    } catch (err) {
        console.error("Token Verification Error:", err);
        return res.status(401).json(new ApiResponse(401, null, 'Error in Validating token'));
    }
});

export default verifyToken;
