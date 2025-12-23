const prisma = require('../config/prisma');

class SubtaskRepository {
    async storeSubtask( subtaskData ) {
        return prisma.subtask.create({
            data: subtaskData
        });
    }
 
    async getAllSubtasks(taskId) {
        return prisma.subtask.findMany({
            where: { taskId } 
        });
    }

    async getSubtaskById(userId, subtaskId) {
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

    async getSubtaskStats(userId) {
        return prisma.subtask.groupBy({
            by: ['status'],
            where: {
                task: { userId }
            },
            _count: { id: true } 
        });
    }
}



module.exports = { SubtaskRepository }
/* Optimization
   1: verify task ownership ,include progeress , ordering aslo include parent task info in response
   2:verify task existance and ownership
   3: create a reusable ownership verification function
*/   