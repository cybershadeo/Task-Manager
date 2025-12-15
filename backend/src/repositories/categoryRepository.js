const prisma = require('../config/prisma');

class CategoryRepository {

    async storeCategory( categoryData) {
        return prisma.category.create({
            data: categoryData
        });
    }

    async getAllCategories(userId) {
        return prisma.category.findMany({
            where: { userId: userId },
            orderBy: { name: 'asc' },
            include: {
                _count: {
                    select: { tasks: true}
                }
            }
        });
    }

    async getCategoryById(categoryId) {
        return prisma.category.findUnique({
            where: { id: categoryId },
            include: {
                _count: {
                    select: { tasks: true }
                }
            }
        });
    }
 

    //used in service layer to verify ownership before deleting or updating
    async findCategoryById(categoryId) {
        return prisma.category.findUnique({
            where: { id: categoryId, }
        });
    }

    async updateCategory(categoryId,updates) {
        return prisma.category.update({
            where: {id: categoryId},
            data: updates
        });
    }

    async deleteCategory(categoryId) {
        return prisma.category.delete({
            where: { id: categoryId }
        });
    }

    async countCategoriesByUserId(userId) {
        return prisma.category.count({
            where: { userId: userId }
        });
    }  
}


module.exports = { CategoryRepository }