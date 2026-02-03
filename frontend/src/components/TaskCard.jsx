import React, { useState, useRef, useEffect } from 'react';
import { Reorder, useMotionValue, motion as Motion, AnimatePresence } from 'framer-motion';
import {
  Calendar,
  MoreHorizontal,
  ChevronDown,
  CheckSquare,
  Plus,
  Trash2,
  Edit,
  Clock,
} from 'lucide-react';
import { useTask } from '../hooks/taskUseContext';
import SubtaskItem from './subtaskItem';
import  EditModal  from './editModal';
import CreateSubtaskButton from './createSubtaskBtn';

function TaskCard({ task }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showTaskMenu, setShowTaskMenu] = useState(false);
  const [showSubtaskMenu, setShowSubtaskMenu] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [dismissedSuggestion, setDismissedSuggestion] = useState(null);
  const taskMenuRef = useRef(null);
  const subtaskMenuRef = useRef(null);
  const y = useMotionValue(0);

  const { toggleSubtask, deleteTask, updateTask } = useTask();

  const priorityColors = {
    high: 'bg-rose-50 text-rose-600 border-rose-100',
    medium: 'bg-amber-50 text-amber-600 border-amber-100',
    low: 'bg-emerald-50 text-emerald-600 border-emerald-100',
  };

  const priorityBadge = priorityColors[task.priority.toLowerCase()];

  // Calculate progress
  const completedSubtasks = task.subtasks.filter((s) => s.completed).length;
  const totalSubtasks = task.subtasks.length;
  const progress =
    totalSubtasks > 0
      ? Math.round((completedSubtasks / totalSubtasks) * 100)
      : 0;

  // Close menus when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (taskMenuRef.current && !taskMenuRef.current.contains(event.target)) {
        setShowTaskMenu(false);
      }
      if (subtaskMenuRef.current && !subtaskMenuRef.current.contains(event.target)) {
        setShowSubtaskMenu(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);



  const handleSubtaskToggle = async (e, subtask) => {
    e.stopPropagation();
    await toggleSubtask(task.id, subtask.id, !subtask.completed);
  };

  const handleDeleteTask = async (e) => {
    e.stopPropagation();
    await deleteTask(task.id);
    setShowTaskMenu(false);
  };

  const handleUpdateTask = (e) => {
    e.stopPropagation();
    setShowEditModal(true);
    setShowTaskMenu(false);
  };

  const handleSaveTask = async (updatedData) => {
    await updateTask(task.id, updatedData);
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'No date';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const rawSuggestion = 
    task.status === 'pending' && totalSubtasks === 1
      ? 'MOVE_TO_IN_PROGRESS'
      : task.status === 'InProgress' && 
          totalSubtasks > 0 && 
          completedSubtasks === totalSubtasks
      ? 'MOVE_TO_COMPLETED'
      : null;  
      
  const statusSuggestion = 
    rawSuggestion && rawSuggestion !== dismissedSuggestion
      ? rawSuggestion
      : null;    

  return (
    <Reorder.Item
      value={task}
      id={task.id}
      style={{ y }}
      whileDrag={{
        scale: 1.05,
        rotate: 2,
        boxShadow:
          '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        cursor: 'grabbing',
      }}
      className="group relative bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all cursor-grab active:cursor-grabbing mb-3 overflow-visible"
    >
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <span
            className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full border ${priorityBadge}`}
          >
            {task.priority}
          </span>
          
          <div className="relative" ref={taskMenuRef}>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowTaskMenu(!showTaskMenu);
              }}
              className="text-gray-400 hover:text-gray-600 hover:bg-gray-50 p-1 rounded transition-colors"
            >
              <MoreHorizontal className="w-4 h-4" />
            </button>

            {showTaskMenu && (
              <div className="absolute right-0 top-8 bg-white border border-gray-200 rounded-lg shadow-lg z-[100] py-1 min-w-[140px]">
                <button
                  onClick={handleUpdateTask}
                  className="w-full px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                >
                  <Edit className="w-3.5 h-3.5" />
                  Edit Task
                </button>
                <button
                  onClick={handleDeleteTask}
                  className="w-full px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  Delete Task
                </button>
              </div>
            )}
          </div>
        </div>

        <h4 className="text-sm font-semibold text-gray-900 mb-1 leading-tight">
          {task.title}
        </h4>

        <p className="text-xs text-gray-500 line-clamp-2 mb-4">
          {task.description}
        </p>

        <div className="flex items-center justify-between pt-3 border-t border-gray-50">
          <div className="flex items-center gap-3 flex-wrap">
            {/* Created Date */}
            {task.createdAt && (
              <div className="flex items-center gap-1.5 text-xs text-gray-400">
                <Clock className="w-3.5 h-3.5" />
                <span>{formatDate(task.createdAt)}</span>
              </div>
            )}

            {/* Due Date */}
            <div className="flex items-center gap-1.5 text-xs text-gray-400">
              <Calendar className="w-3.5 h-3.5" />
              <span>{formatDate(task.dueDate)}</span>
            </div>

            {/* Subtask Progress */}
            {totalSubtasks > 0 && (
              <div className="flex items-center gap-1.5 text-xs text-gray-500 bg-gray-50 px-2 py-0.5 rounded-md">
                <CheckSquare className="w-3.5 h-3.5" />
                <span>
                  {completedSubtasks}/{totalSubtasks}
                </span>
              </div>
            )}
          </div>

          <div className="flex items-center gap-2">
            {/* Add Subtask Button */}
            <div className="relative" ref={subtaskMenuRef}>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowSubtaskMenu(!showSubtaskMenu);
                }}
                className="text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 p-1 rounded transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>

              {showSubtaskMenu && (
                <div className="absolute right-0 top-8 bg-white border border-gray-200 rounded-lg shadow-lg z-10 py-1 min-w-[150px]">
                  <CreateSubtaskButton 
                    taskId={task.id}
                  />
                </div>
              )}
            </div>

            {/* Expand/Collapse Button */}
            {totalSubtasks > 0 && (
              <Motion.button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsExpanded(!isExpanded);
                }}
                animate={{ rotate: isExpanded ? 180 : 0 }}
                transition={{ duration: 0.2 }}
                className="text-gray-400 hover:text-gray-600"
              >
                <ChevronDown className="w-4 h-4" />
              </Motion.button>
            )}
          </div>
        </div>
      </div>

      {/* suggestion section */}
      {statusSuggestion && (
        <div className='mx-4 mb-2 p-3 rounded-lg bg-indigo-50 border border-indigo-100 text-sm flex items-center justify-between'>
          <span className='text-indigo-700'>
            {statusSuggestion === 'MOVE_TO_IN_PROGRESS'
              ? 'You added subtasks. Move task to InProgress?'
              : 'All subtasks completed. Move task to Completed?'}
          </span>

          <div className='flex gap-2'>
            <button
              onClick={async (e) => {
                e.stopPropagation();
                await updateTask(task.id, {
                  status:
                    statusSuggestion === 'MOVE_TO_IN_PROGRESS'
                      ? 'inProgress'
                      : 'completed'
                });
              }}
              className='px-3 py-1 text-xs font-medium bg-indigo-600 text-white rounded-md'
            >
              Yes
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                setDismissedSuggestion(statusSuggestion);
              }}
              className='px-3 py-1 text-xs text-gray-500 hover:text-gray-700'
            >
              Not now
            </button>
          </div>
        </div>
      )}

      {/* Expandable Subtasks Section */}
      <AnimatePresence>
        {isExpanded && totalSubtasks > 0 && (
          <Motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="bg-gray-50/50 border-t border-gray-100 px-4 pb-3"
          >
            <div className="pt-3 space-y-2">
              {task.subtasks && task.subtasks.length > 0 && task.subtasks.map((subtask) => (
                <SubtaskItem
                  key={subtask.id}
                  subtask={subtask}
                  taskId={task.id}
                  onToggle={handleSubtaskToggle}
                />
              ))}
            </div>
          </Motion.div>
        )}
      </AnimatePresence>

      {/* Progress bar at bottom */}
      {totalSubtasks > 0 && (
        <div className="h-1 w-full bg-gray-100">
          <div
            className="h-full bg-indigo-500 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}
      <EditModal
          isOpen={showEditModal}
          onClose={() => setShowEditModal(false)}
          onSave={handleSaveTask}
          data={task}
          type="task"
      />
    </Reorder.Item>
  );
}

export default TaskCard;

