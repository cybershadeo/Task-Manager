const express = require('express');
const { authUser } = require('../middleware/authentication');
const { createCategory,getCategories,getCategoryById,updateCategory,deleteCategory } = require('../controllers/categoryController');


const router = express.Router();

router.post('/', authUser, createCategory);
router.get('/', authUser, getCategories);
router.get('/:categoryId', authUser, getCategoryById);
router.put('/:categoryId', authUser, updateCategory);
router.delete('/:categoryId', authUser, deleteCategory);

//router.get();


module.exports = router;