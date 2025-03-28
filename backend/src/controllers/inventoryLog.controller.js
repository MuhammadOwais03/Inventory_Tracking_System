import { asyncHandler } from "../utils/asyncHandler.js";
import db from "../../models/index.js"; 
import { ApiResponse } from "../utils/ApiResponse.js";

const { InventoryLog } = db; 

console.log("Database Models:", db);  // ✅ Debug Sequelize models
console.log("InventoryLog Model:", db.InventoryLog);  // ✅ Check if defined


const showInventoryLog = asyncHandler(async (req, res) => {
    try {
        const { storeId } = req.params;
        console.log("Received storeId:", storeId);

       
        const inv_logs = await InventoryLog.findAll({ where: { storeId } });

        console.log("Fetched inventory logs:", inv_logs);

        if (!inv_logs.length) {
            return res.status(404).json(new ApiResponse(404, null, "No logs found"));
        }

        return res.status(200).json(new ApiResponse(200, inv_logs, "Logs fetched successfully"));
    } catch (error) {
        console.error("Error fetching logs:", error);
        return res.status(500).json(new ApiResponse(500, null, "Internal Server Error"));
    }
});

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

export { showInventoryLog, deleteInventoryLog };
