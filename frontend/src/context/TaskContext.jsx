import { useEffect, useState, useMemo, useCallback } from 'react';
import { TaskContext } from './contextCreation';
import * as taskServices from '../services/taskServices';
import * as subtaskServices from '../services/subtaskServices';
import { useDash } from '../hooks/dashUseContext';



export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [subtasks, setSubtasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const { refetchDashboard } = useDash();



  const fetchData = useCallback(async () => {
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
    }, []);


  // Fetch all tasks and subtasks
  useEffect(() => {

    fetchData();
  }, [fetchData]);

  // Merge tasks with their subtasks
  const tasksWithSubtasks = useMemo(() => {
    return tasks.map((task) => ({
      ...task,
      subtasks: subtasks.filter((subtask) => subtask.taskId === task.id),
    }));
  }, [tasks, subtasks]);

    

  
  // Create a new task
  const createTask = async (taskData) => {
      const response = await taskServices.createTask(taskData);
      const newTask = response.task || response.data;
      setTasks((prev) => [...prev, newTask]);
      await refetchDashboard();
      await fetchData();
      return newTask;
  };

  // Update a task
  const updateTask = async (taskId, updates) => {

      const response = await taskServices.updateTask(taskId, updates);
      const updatedTask = response.task || response.data;
      setTasks((prev) =>
        prev.map((task) => (task.id === taskId ? updatedTask : task))
      );
      await refetchDashboard();
      await fetchData();
      return updatedTask;
  };

  // Delete a task
  const deleteTask = async (taskId) => {
      await taskServices.deleteTask(taskId);
      setTasks((prev) => prev.filter((task) => task.id !== taskId));
      // remove all subtasks for this task
      setSubtasks((prev) => prev.filter((subtask) => subtask.taskId !== taskId));
      await refetchDashboard();
      await fetchData()
  };

  // Add subtask
  const addSubtask = async (taskId, subtaskData) => {
    
      const response = await subtaskServices.createSubtasks(taskId, subtaskData);
      const newSubtask = response.subtask || response.data;
      setSubtasks((prev) => [...prev, newSubtask]);
      await fetchData();
      return newSubtask;
  };

  // Update subtask
  const updateSubtask = async (taskId, subtaskId, updates) => {
    
      const response = await subtaskServices.updateSubtask(taskId, subtaskId, updates);
      const updatedSubtask = response.subtask || response.data;
      setSubtasks((prev) =>
        prev.map((subtask) =>
          subtask.id === subtaskId ? updatedSubtask : subtask
        )
      );
      await fetchData();
      return updatedSubtask;
  };

  // Delete subtask
  const deleteSubtask = async (taskId, subtaskId) => {
    await subtaskServices.deleteSubtask(taskId, subtaskId);
    setSubtasks((prev) => prev.filter((subtask) => subtask.id !== subtaskId));
    await fetchData();
  };

  // Toggle subtask completion
  const toggleSubtask = async (taskId, subtaskId, completed) => {
    
    const response = await subtaskServices.updateToggledSubtask(taskId, subtaskId, { completed });
    const updatedSubtask = response.data;
    setSubtasks((prev) => 
      prev.map(s => 
        s.id === subtaskId ? updatedSubtask : s
      )
    );
    await fetchData();
  };

  // Filter tasks by category (synced with DashContext)
  const getFilteredTasks = (selectedCategoryId) => {

    // If null, show uncategorized tasks (tasks without categoryId)
    if (selectedCategoryId === null) {
      return tasksWithSubtasks.filter((task) => !task.categoryId);
    }
    
    // If no category selected, show all tasks
    if (!selectedCategoryId) return tasksWithSubtasks;
    
    // Filter by selected category
    return tasksWithSubtasks.filter(
      (task) => task.categoryId === selectedCategoryId
    );
  };

  const values = {
    tasks: tasksWithSubtasks,
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

  return (
    <TaskContext.Provider value={values}>
      {children}
    </TaskContext.Provider>
  );

}

