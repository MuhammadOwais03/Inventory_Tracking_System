
import db from "../../models/index.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";

const {Product, InventoryLog} = db

console.log(InventoryLog)


const createProduct = asyncHandler( async (req, res) =>{
    const {name, quantity, price, categoryId} = req.body
    const {storeId} = req.params

    if (!name || !quantity ||!price || !categoryId) {
        return res.status(400).json(
            new ApiResponse(
                400,
                null,
                "provide every field"
            )
        )
    }

    const verify_product = await Product.findOne(
        {where: {name:name, categoryId: categoryId, storeId:storeId}}
    )

    if (verify_product) {
        return res.status(400).json(new ApiResponse(400, null, "Product already exists in this store")); 
    }

    const product = await Product.create(
        {
            name: name,
            categoryId: categoryId,
            storeId: storeId,
            price: price,
            quantity: quantity
        }
    )

    if (!product) {
        return res.status(400).json(new ApiResponse(400, null, "Something went wrong")); 

    }

    

    return res.status(201).json(new ApiResponse(201, product, "Product created successfully")); 

} )

const showProducts = asyncHandler (async (req, res)=>{
    const {storeId} = req.params
    const products = await Product.findAll({where: {storeId: storeId}})

    if (products.length == 0) {
        return res.status(201).json(201, null, "no products found in this store")
    }

    return res.status(201).json(
        new ApiResponse(
            201, products, null
        )
    )
})


const showProduct = asyncHandler (async (req, res)=>{
    const {id} = req.params
    const product = await Product.findOne({where: {id}})

    if (product.length == 0) {
        return res.status(201).json(201, null, "no product found in this store")
    }

    return res.status(201).json(
        new ApiResponse(
            201, product, null
        )
    )
})

const showProducsByCategory = asyncHandler (async (req, res)=>{
    const {categoryId} = req.params
    const product = await Product.findAll({where: {categoryId: categoryId}})

    if (product.length == 0) {
        return res.status(201).json(201, null, "no product found in this store")
    }

    return res.status(201).json(
        new ApiResponse(
            201, product, null
        )
    )
})

const stockInProduct = asyncHandler (async (req, res)=>{
    const {id} = req.params;
    const {quantity} = req.body
    const {accessToken} = req.cookies

    const product = await Product.findOne({where: {id}})

    if (!product) {
        return res.status(404).json(404, null, "no product found in this store")
    }

    product.quantity += quantity
    await product.save();


    const inv = await InventoryLog.create({
        productId: product.id,
        storeId: product.storeId,
        changeType: "IN",
        quantity: quantity,
        previousStock: product.quantity - quantity,
        newStock: product.quantity
    });

    console.log(inv)

    return res.status(201).json(
        new ApiResponse(
            201, product, null
        )
    )
    
})


const stockOutProduct = asyncHandler (async (req, res)=>{
    const {id} = req.params;
    const {quantity} = req.body
    const product = await Product.findOne({where: {id}})

    if (!product) {
        return res.status(404).json(404, null, "no product found in this store")
    }

    if (product.quantity < quantity) {
        return res.status(400).json(new ApiResponse(400, null, "Not enough stock available"));
    }

    product.quantity -= quantity

    await product.save();

    await InventoryLog.create({
        productId: product.id,
        storeId: product.storeId,
        changeType: "OUT",
        quantity: quantity,
        previousStock: product.quantity + quantity,
        newStock: product.quantity
    })

    return res.status(201).json(
        new ApiResponse(
            201, product, null
        )
    )
    
})



const editProduct = asyncHandler (async (req, res)=>{
    const {id} = req.params;
    const {name} = req.body
    const product = await Product.findOne({where: {id}})

    if (!product) {
        return res.status(404).json(404, null, "no product found in this store")
    }

    product.name = name
    await product.save();

    return res.status(201).json(
        new ApiResponse(
            201, product, null
        )
    )
    
})

const deleteProduct = asyncHandler (async (req, res)=>{
    const {id} = req.params;

    const deleted = await Product.destroy({ where: { id } }); 

  if (deleted === 0) {
    return res.status(404).json(new ApiResponse(404, null, "Product not found"));
  }

  return res.status(200).json(new ApiResponse(200, null, "Successfully deleted the Product")); 
})

export {createProduct, showProducts,showProduct,stockInProduct,stockOutProduct,editProduct,deleteProduct,showProducsByCategory}