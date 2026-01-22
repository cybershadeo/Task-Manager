import React, { useState, useEffect } from 'react';
import { motion as Motion, AnimatePresence } from 'framer-motion';
import { X, Save, Calendar } from 'lucide-react';
import { useDash } from '../hooks/dashUseContext';


const INITIAL_FORM_STATE = {
  title: '',
  description: '',
  priority: 'medium',
  status: 'pending',
  dueDate: '',
  categoryId: '',
  completed: false
};

export function EditModal({ isOpen, onClose, onSave, data, type = 'task' }) {
  const { categories } = useDash();
  
  const [formData, setFormData] = useState(INITIAL_FORM_STATE);
  const [errors, setErrors] = useState({});
  const [isSaving, setIsSaving] = useState(false);

  // Initialize form with existing data
  useEffect(() => {
    if (isOpen && data) {
      setFormData({
        ...INITIAL_FORM_STATE,
        ...data,
        dueDate: data.dueDate
          ? new Date(data.dueDate).toISOString().split('T')[0]
          : '',
      });
    } else if (!isOpen) {
      // Reset form when modal closes
      setFormData(INITIAL_FORM_STATE);
      setErrors({});
    }
  }, [isOpen, data]);

  const handleChange = (e) => {
    const { name, value, type: inputType, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: inputType === 'checkbox' ? checked : value,
    }));
    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    
    if (type === 'task') {
      if (!formData.dueDate) {
        newErrors.dueDate = 'Due date is required';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validate()) return;
    
    setIsSaving(true);
    try {
      const dataToSave = type === 'task' 
        ? {
            ...formData,
            dueDate: formData.dueDate ? new Date(formData.dueDate).toISOString() : null,
          }
        : formData;
      
      await onSave(dataToSave);
      onClose();
    } catch (error) {
      console.error('Failed to save:', error);
      setErrors({ submit: 'Failed to save. Please try again.' });
    } finally {
      setIsSaving(false);
    }
  };

  const handleClose = () => {
    // Just close - useEffect will handle the reset
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <Motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
            <Motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2 }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-100">
                <h2 className="text-xl font-bold text-gray-900">
                  Edit {type === 'task' ? 'Task' : 'Subtask'}
                </h2>
                <button
                  onClick={handleClose}
                  className="text-gray-400 hover:text-gray-600 transition-colors p-2 hover:bg-gray-100 rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="p-6 overflow-y-auto max-h-[calc(90vh-180px)]">
                {/* Title */}
                <div className="mb-5">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                      errors.title
                        ? 'border-red-300 focus:ring-red-200'
                        : 'border-gray-200 focus:ring-indigo-200 focus:border-indigo-400'
                    }`}
                    placeholder={type === 'task' ? 'Enter task title...' : 'Enter subtask title...'}
                  />
                  {errors.title && (
                    <p className="mt-1 text-sm text-red-600">{errors.title}</p>
                  )}
                </div>

                {type === 'task' && (
                  <>
                    {/* Description */}
                    <div className="mb-5">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Description
                      </label>
                      <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows={4}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 transition-all resize-none"
                        placeholder="Enter task description..."
                      />
                    </div>

                    {/* Priority and Status Row */}
                    <div className="grid grid-cols-2 gap-4 mb-5">
                      {/* Priority */}
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Priority
                        </label>
                        <select
                          name="priority"
                          value={formData.priority}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 transition-all bg-white"
                        >
                          <option value="low">Low</option>
                          <option value="medium">Medium</option>
                          <option value="high">High</option>
                        </select>
                      </div>

                      {/* Status */}
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Status
                        </label>
                        <select
                          name="status"
                          value={formData.status}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 transition-all bg-white"
                        >
                          <option value="pending">Pending</option>
                          <option value="in-progress">In Progress</option>
                          <option value="completed">Completed</option>
                        </select>
                      </div>
                    </div>

                    {/* Due Date and Category Row */}
                    <div className="grid grid-cols-2 gap-4 mb-5">
                      {/* Due Date */}
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Due Date <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <input
                            type="date"
                            name="dueDate"
                            value={formData.dueDate}
                            onChange={handleChange}
                            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                              errors.dueDate
                                ? 'border-red-300 focus:ring-red-200'
                                : 'border-gray-200 focus:ring-indigo-200 focus:border-indigo-400'
                            }`}
                          />
                          <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                        </div>
                        {errors.dueDate && (
                          <p className="mt-1 text-sm text-red-600">{errors.dueDate}</p>
                        )}
                      </div>

                      {/* Category */}
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Category
                        </label>
                        <select
                          name="categoryId"
                          value={formData.categoryId}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 transition-all bg-white"
                        >
                          <option value="">Uncategorized</option>
                          {categories?.map((category) => (
                            <option key={category.categoryId} value={category.categoryId}>
                              {category.categoryName}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </>
                )}

                {type === 'subtask' && (
                  <div className="mb-5">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        name="completed"
                        checked={formData.completed}
                        onChange={handleChange}
                        className="w-5 h-5 text-indigo-600 border-gray-300 rounded focus:ring-2 focus:ring-indigo-200"
                      />
                      <span className="text-sm font-medium text-gray-700">
                        Mark as completed
                      </span>
                    </label>
                  </div>
                )}

                {/* Submit Error */}
                {errors.submit && (
                  <div className="mb-5 p-4 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-sm text-red-600">{errors.submit}</p>
                  </div>
                )}
              </form>

              {/* Footer */}
              <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-100 bg-gray-50">
                <button
                  type="button"
                  onClick={handleClose}
                  className="px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={isSaving}
                  className="flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm shadow-indigo-200"
                >
                  <Save className="w-4 h-4" />
                  {isSaving ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </Motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

export default EditModal;