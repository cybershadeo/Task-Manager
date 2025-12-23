const { useId } = require('react');
const { CategoryRepository } = require('../repositories/categoryRepository');
const { ValidationError, UnauthorizedError, NotFoundError, ConflictError } = require('../utils/customErrors');



class CategoryService {
    constructor() {
        this.categoryRepository = new CategoryRepository();
    }

    async createCategory(userId,name) {

        const category =  await this.categoryRepository.storeCategory({name,userId});

        console.log(category);
        return {
            categoryId: category.id,
            category: category.name,
            createdAt: category.createdAt
        };
    }

    async getAllUserCategories(userId) {
        return await this.categoryRepository.getAllCategories(userId);
    }

    async getUserCategroyById(userId,categoryId) {
        
        const category = await this.categoryRepository.getCategoryById(categoryId);
        
        if(!category) {
            throw new NotFoundError('Category not found');
        }

        if(category.userId !== userId) {
            throw new UnauthorizedError('Access denied');
        }
        
        return {
            name: category.name,
            userId: category.userId,
            createdAt: category.createdAt,
            tasks: category.tasks
        };
    }

    async updateCateogry(userId, categoryId, updates) {
        console.log(categoryId);
        const verify = await this.categoryRepository.findCategoryById(categoryId);

        if(!verify) {
            throw new NotFoundError('Category not found');
        }

        if(verify.userId !== userId) {
            throw new UnauthorizedError('Access denied');
        }

        //check whether no other category has the name being updated

        const updatedCategory = await this.categoryRepository.updateCategory(categoryId,updates);
        
        return updatedCategory;
    }

    async deleteCategory(userId,categoryId) {
        const verify = await this.categoryRepository.findCategoryById(categoryId);

        if(!verify)  {
            throw new NotFoundError('Category not found');
        }

        if(verify.userId !== userId) {
            throw new UnauthorizedError('Access denied');
        }
        const deletedCategory = this.categoryRepository.deleteCategory(categoryId);
        
        //get task count in category being deleted
        // return the taskcount and message
        return deletedCategory;
    }
}

module.exports = { CategoryService }