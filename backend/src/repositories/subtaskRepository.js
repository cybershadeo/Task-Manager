const prisma = require('../config/prisma');

class SubtaskRepository {
    async storeSubtask( subtaskData ) {
        return prisma.subtask.create({
            data: subtaskData
        });
    }
 
    async getAllSubtasks(userId) {
        return prisma.subtask.findMany({
            where: { 
                task: {
                    userId: userId
                }
            },
            select: {
                id:true,
                title: true,
                completed: true,
                taskId: true,
                createdAt: true,
                updatedAt: true
            }
        });
    }

    async getSubtaskById(subtaskId) {
        return prisma.subtask.findUnique({
            where: { id: subtaskId}
        });
    }

    async findSubtaskById(subtaskId) {
        return prisma.subtask.findUnique({
            where: { id: subtaskId }
        })
    }

    async updateSubtask(subtaskId, updates) {
        return prisma.subtask.update({
            where: {id: subtaskId },
            data: updates
        });
    }

    async deleteSubtask(subtaskId) {
        return prisma.subtask.delete({
            where: {id: subtaskId }
        });
    }
}



module.exports = { SubtaskRepository }
