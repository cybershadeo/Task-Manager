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
            where: {id: taskId}
        });
    }

    async getAllTasks (userId) {
        return prisma.task.findMany({
            where: { userId }
        });
    }

    async deleteTask (taskId) {
        return prisma.task.delete({
            where: {id: taskId}
        });
    }
}


module.exports = { TaskRepository }
