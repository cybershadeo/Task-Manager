const prisma = require('../config/prisma');

class TaskRepository {

    async storeTask ( taskData ) {
        return  prisma.task.create({ 
            data:taskData 
        });
    }

    async findTaskById( taskId ) {
        return prisma.task.findUnique({
            where: { id: taskId }
        });
    }

    async updateUserTask ( taskId, updates ) {
        return prisma.task.update({
            where: { id: taskId },
            data:  updates 
        });
    }

    async getTaskById (taskId) {
        return prisma.task.findUnique({
            where: {id: taskId},
            include: {
                subtasks: {
                    select: {
                        id: true,
                        title: true,
                        completed: true
                    }
                }
            }
        });
    }

    async getAllTasks (userId) {
        return prisma.task.findMany({
            where: { userId },
            include: {
                _count: {
                    select: { subtasks: true }
                }
            }
        });
    }

    async deleteTask (taskId) {
        return prisma.task.delete({
            where: {id: taskId}
        });
    }

    async Stats (userId) {
        return prisma.task.groupBy({
            by: ['status'],
            where: { userId: userId },
            _count: {_all: true}
        });
    }

    async orphanCount (userId) {
        return prisma.task.count({
            where: {
                 userId: userId,
                 categoryId: null
            }
        });
    }


}
 


module.exports = { TaskRepository }
