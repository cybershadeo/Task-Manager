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
                tasks: {
                    select: {
                        id: true,
                        title: true,
                        status: true
                    }
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



    async userStats(userId) {
        return prisma.category.findMany({
            where: { userId: userId },
            select: {
                id: true,
                name: true,
                _count: {
                    select: { tasks: true }
                },
                tasks: {
                    select:{
                        _count:{
                            select:{ subtasks: true }
                        }
                    }
                }
            }   
        });
    }
}



module.exports = { CategoryRepository }


