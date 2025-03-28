import db from "../../models/index.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import { ApiResponse } from "../utils/ApiResponse.js";

const { Category } = db;

const createCategory = asyncHandler(async (req, res) => {
  const { name } = req.body;
  const {storeId} = req.params
  

  const verify_category = await Category.findOne({
    where: { name, storeId },
  });

  if (verify_category) {
    return res.status(400).json(new ApiResponse(400, null, "Category already exists in this store")); 
  }

  const category = await Category.create({ name, storeId });

  return res.status(201).json(new ApiResponse(201, category, "Category created successfully")); 
});

const editCategory = asyncHandler(async (req, res) => {
  const { name } = req.body;
  const { id } = req.params;

  const category = await Category.update(
    { name },
    { where: { id } }
  );

  console.log(category)

  if (category[0] === 0) { 
    return res.status(404).json(new ApiResponse(404, null, "Category not found"));
  }

  const n_cat = await Category.findOne({where: {id}}) 

  return res.status(200).json(new ApiResponse(200, n_cat, "Successfully updated the category")); 
});

const deleteCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  
  const deleted = await Category.destroy({ where: { id } }); 

  if (deleted === 0) {
    return res.status(404).json(new ApiResponse(404, null, "Category not found"));
  }

  return res.status(200).json(new ApiResponse(200, null, "Successfully deleted the category")); 
});


const showCategories = asyncHandler(async (req, res)=>{
    const {storeId} = req.params

    const categories = await Category.findAll({where: {storeId: storeId}})

    if (categories.length == 0) {
        return res.status(404).json(404, null, "no category found in this store")
    }

    return res.status(201).json(
        new ApiResponse(
            201, categories, null
        )
    )

})


const showCategory = asyncHandler (async (req, res)=>{
  const {id} = req.params
  const category = await Category.findOne({where: {id}})

  if (category.length == 0) {
      return res.status(201).json(201, null, "no category found in this store")
  }

  return res.status(201).json(
      new ApiResponse(
          201, category, null
      )
  )
})

export { createCategory, editCategory, deleteCategory, showCategories, showCategory };
