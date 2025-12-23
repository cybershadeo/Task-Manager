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
                        status: true
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
/*
  Optimization
  1: The get query should include the category info,subtask count 
  2: Also include the subtask count
  3: Filtering by 1: category if present
                  2: uncategorized 
                  3: completed and so on
                  4: combine filters
  4:Add pagination in get request/add subtask progress  
  5:During creation if categoryid is provided ownership should be verified
  6:When updating task should able to update the categoryId
  7:During single task quering should have a prameter that either displays the subtask object or count             
 */                 