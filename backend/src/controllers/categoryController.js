const asyncHandler = require('express-async-handler');
const { CategoryService } = require('../services/categoryService');
const { category } = require('../config/prisma');

const categoryService = new CategoryService();

const createCategory = asyncHandler( async (req, res) => {

    const userId = req.user && req.user.id;
    const { name } = req.body;

    const createdCategory = await categoryService.createCategory( userId, name);
    console.log(createdCategory);

    res.status(201).json({
        success: true,
        message: 'Category created successfully',
        category: createdCategory
    });
});


const getCategories = asyncHandler( async (req, res) => {

    const userId = req.user && req.user.id;

    const currentCategory = await categoryService.getAllUserCategories(userId);

    res.status(200).json({
        success: true,
        categroies: currentCategory
    });
});


const getCategoryById = asyncHandler( async (req,res) => {
    const userId = req.user && req.user.id;
    const categoryId = req.params.categoryId;

    const currentCategory = await categoryService.getUserCategroyById(userId,categoryId);

    res.status(200).json({
        success: true,
        category: currentCategory
    });
});

const updateCategory = asyncHandler( async (req,res) => {

    const userId = req.user && req.user.id;
    const categoryId = req.params.categoryId;
    const updates = req.body;

    const updatedCategory = await categoryService.updateCateogry(userId,categoryId,updates);

    res.status(200).json({
        success: true,
        category: updatedCategory
    });
});

const deleteCategory = asyncHandler( async (req,res) => {

    const userId = req.user && req.user.id;
    const categoryId = req.params.categoryId;
    
    const deletedCategory = await categoryService.deleteCategory(userId,categoryId);

    res.status(200).json({
        success: true,
        message: 'Category and its tasks deleted'
    });
});


module.exports = {createCategory,getCategories,getCategoryById,updateCategory,deleteCategory }