import { useEffect, useState } from 'react';
import { TaskContext } from './contextCreation';
import * as taskServices from '../services/taskServices';
import * as subtaskServices from '../services/subtaskServices';



export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [subtasks, setSubtasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);


  // Fetch all tasks and subtasks
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const [tasksResponse, subtasksResponse] = await Promise.all([
          taskServices.getAllTasks(),
          subtaskServices.getAllSubtasks(),
        ]);
        
        setTasks(tasksResponse.task || tasksResponse.data || []);
        setSubtasks(subtasksResponse.subtasks || subtasksResponse.data || []);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Merge tasks with their subtasks
  const getTasksWithSubtasks = () => {

    
    return tasks.map((task) => ({
      ...task,
      subtasks: subtasks.filter((subtask) => subtask.taskId === task.id),
    }));
  };

  // Create a new task
  const createTask = async (taskData) => {
    try {
      const response = await taskServices.createTask(taskData);
      const newTask = response.task || response.data;
      setTasks((prev) => [...prev, newTask]);
      return newTask;
    } catch (error) {
      console.error('Failed to create task:', error);
      throw error;
    }
  };

  // Update a task
  const updateTask = async (taskId, updates) => {
    try {
      const response = await taskServices.updateTask(taskId, updates);
      const updatedTask = response.task || response.data;
      setTasks((prev) =>
        prev.map((task) => (task.id === taskId ? updatedTask : task))
      );
      return updatedTask;
    } catch (error) {
      console.error('Failed to update task:', error);
      throw error;
    }
  };

  // Delete a task
  const deleteTask = async (taskId) => {
    try {
      await taskServices.deleteTask(taskId);
      setTasks((prev) => prev.filter((task) => task.id !== taskId));
      // Also remove all subtasks for this task
      setSubtasks((prev) => prev.filter((subtask) => subtask.taskId !== taskId));
    } catch (error) {
      console.error('Failed to delete task:', error);
      throw error;
    }
  };

  // Add subtask
  const addSubtask = async (taskId, subtaskData) => {
    try {
      const response = await subtaskServices.createSubtasks(taskId, subtaskData);
      const newSubtask = response.subtask || response.data;
      setSubtasks((prev) => [...prev, newSubtask]);
      return newSubtask;
    } catch (error) {
      console.error('Failed to add subtask:', error);
      throw error;
    }
  };

  // Update subtask
  const updateSubtask = async (taskId, subtaskId, updates) => {
    try {
      const response = await subtaskServices.updateSubtask(subtaskId, updates);
      const updatedSubtask = response.subtask || response.data;
      setSubtasks((prev) =>
        prev.map((subtask) =>
          subtask.id === subtaskId ? updatedSubtask : subtask
        )
      );
      return updatedSubtask;
    } catch (error) {
      console.error('Failed to update subtask:', error);
      throw error;
    }
  };

  // Delete subtask
  const deleteSubtask = async (taskId, subtaskId) => {
    try {
      await subtaskServices.deleteSubtask(subtaskId);
      setSubtasks((prev) => prev.filter((subtask) => subtask.id !== subtaskId));
    } catch (error) {
      console.error('Failed to delete subtask:', error);
      throw error;
    }
  };

  // Toggle subtask completion
  const toggleSubtask = async (taskId, subtaskId, completed) => {
    try {
      await subtaskServices.updateToggledSubtask(taskId, subtaskId, { completed });
    } catch (error) {
      console.error('Failed to toggle subtask:', error);
      throw error;
    }
  };

  // Filter tasks by category (synced with DashContext)
  const getFilteredTasks = (selectedCategoryId) => {
    const tasksWithSubtasks = getTasksWithSubtasks();
    
    // If null, show uncategorized tasks (tasks without categoryId)
    if (selectedCategoryId === null) {
      return tasksWithSubtasks.filter((task) => !task.categoryId);
    }
    
    // If no category selected, show all tasks
    if (!selectedCategoryId) return tasksWithSubtasks;
    
    // Filter by selected category
    return tasksWithSubtasks.filter((task) => task.categoryId === selectedCategoryId);
  };

  const values = {
    tasks: getTasksWithSubtasks(),
    getFilteredTasks, // Export as function
    isLoading,
    createTask,
    updateTask,
    deleteTask,
    addSubtask,
    updateSubtask,
    deleteSubtask,
    toggleSubtask,
  };

  return <TaskContext.Provider value={values}>{children}</TaskContext.Provider>;
};
