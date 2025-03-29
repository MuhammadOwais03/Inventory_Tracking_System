import { asyncHandler } from "../utils/asyncHandler.js";
import db from "../../models/index.js"; 
import { ApiResponse } from "../utils/ApiResponse.js";
import moment from "moment-timezone"; // Import moment-timezone

const { InventoryLog } = db; 

console.log("Database Models:", db);  // ✅ Debug Sequelize models
console.log("InventoryLog Model:", db.InventoryLog);  // ✅ Check if defined


// const showInventoryLog = asyncHandler(async (req, res) => {
//     try {
//         const { storeId } = req.params;
        

       
//         const inv_logs = await InventoryLog.findAll({ where: { storeId } });

        

//         if (!inv_logs.length) {
//             return res.status(404).json(new ApiResponse(404, null, "No logs found"));
//         }

//         return res.status(200).json(new ApiResponse(200, inv_logs, "Logs fetched successfully"));
//     } catch (error) {
//         console.error("Error fetching logs:", error);
//         return res.status(500).json(new ApiResponse(500, null, "Internal Server Error"));
//     }
// });

const deleteInventoryLog = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;

        const log = await InventoryLog.destroy({ where: { id } });

        if (!log) {
            return res.status(404).json(new ApiResponse(404, null, "Log not found"));
        }

        return res.status(200).json(new ApiResponse(200, null, "Log deleted successfully"));
    } catch (error) {
        console.error("Error deleting log:", error);
        return res.status(500).json(new ApiResponse(500, null, "Internal Server Error"));
    }
});



const convertToUtc = (dateString) => {
    return moment.tz(dateString, "Asia/Karachi").utc().toISOString(); 
};

const showInventoryLog = asyncHandler(async (req, res) => {
    const { storeId } = req.params;
    const { startDate, endDate } = req.query;

    const whereClause = { storeId };

    if (startDate && endDate) {
        whereClause.createdAt = {
            [db.Sequelize.Op.between]: [
                convertToUtc(`${startDate} 00:00:00`),  // Convert full day start to UTC
                convertToUtc(`${endDate} 23:59:59`)    // Convert full day end to UTC
            ],
        };
    }

    console.log("WHERE CLAUSE:", whereClause);

    // Fetch filtered inventory logs
    const inv_logs = await InventoryLog.findAll({
        where: whereClause,
        attributes: ["id", "productId", "changeType", "quantity", "previousStock", "newStock", "createdAt"],
        order: [["createdAt", "DESC"]],
    });

    return res.status(200).json(new ApiResponse(200, inv_logs, "Filtered Inventory Logs"));
});



export { showInventoryLog, deleteInventoryLog };
