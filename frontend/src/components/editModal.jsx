import React, { useState, useEffect } from 'react';
import { motion as Motion, AnimatePresence } from 'framer-motion';
import { X, Save, Calendar } from 'lucide-react';
import { useDash } from '../hooks/dashUseContext';
import { colorNameToHex } from '../utils/colorThem';

const getInitialFormState = (type) => {
  switch (type) {
    case 'category':
      return {
        name: '',
        color: '',   // backend value (hex)
      };
    case 'subtask':
      return {
        title: '',
        completed: false,
      };
    case 'task':
    default:
      return {
        title: '',
        description: '',
        priority: 'medium',
        status: 'pending',
        dueDate: '',
        categoryId: ''
      };
  }
};

export function EditModal({ isOpen, onClose, onSave, data, type = 'task' }) {
  const { categories } = useDash();

  const [formData, setFormData] = useState(() => getInitialFormState(type));
  const [errors, setErrors] = useState({});
  const [isSaving, setIsSaving] = useState(false);

  // 🔹 color states (category only)
  const [colorInput, setColorInput] = useState('');
  const [hexColor, setHexColor] = useState(null);
  const [colorChanged, setColorChanged] = useState(false);

useEffect(() => {
  if (!isOpen || !data) return;

  if (type === 'category') {
    const existingColor = data.color ?? '';
    setFormData({
      name: data.categoryName ?? '',
      color: existingColor,
    });

    setColorInput(existingColor);
    setHexColor(existingColor || null);
    setColorChanged(false);
  }

  if (type === 'task') {
    setFormData({
      title: data.title ?? '',
      description: data.description ?? '',
      priority: data.priority ?? 'medium',
      status: data.status ?? 'pending',
      categoryId: data.categoryId ?? '',
      dueDate: data.dueDate
        ? new Date(data.dueDate).toISOString().split('T')[0]
        : '',
    });
  }

  if (type === 'subtask') {
    setFormData({
      title: data.title ?? '',
      completed: data.completed ?? false,
    });
  }
}, [isOpen, data, type]);

useEffect(() => {
  if (isOpen) return;

  setFormData(getInitialFormState(type));
  setErrors({});
  setColorInput('');
  setHexColor(null);
  setColorChanged(false);
}, [isOpen, type]);



  const handleChange = (e) => {
    const { name, value, type: inputType, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: inputType === 'checkbox' ? checked : value,
    }));
  };

  // 🎨 color handler
  const handleColorChange = (e) => {
    const value = e.target.value;
    setColorInput(value);
    setColorChanged(true);

    // allow hex directly
    if (/^#[0-9A-F]{6}$/i.test(value)) {
      setHexColor(value);
      setFormData((prev) => ({ ...prev, color: value }));
      setErrors((prev) => ({ ...prev, color: null }));
      return;
    }

    const hex = colorNameToHex(value.trim().toLowerCase());
    if (!hex) {
      setHexColor(null);
      setErrors((prev) => ({ ...prev, color: 'Invalid color name' }));
    } else {
      setHexColor(hex);
      setFormData((prev) => ({ ...prev, color: hex }));
      setErrors((prev) => ({ ...prev, color: null }));
    }
  };

  const validate = () => {
  const newErrors = {};

  if (type === 'category') {
    if (!formData.name?.trim()) newErrors.name = 'Name is required';
    
    // If color field has been touched OR if we're editing and there's no valid color
    if (colorChanged) {
      if (!hexColor) newErrors.color = 'Valid color required';
    } else if (!formData.color) {
      // If editing a category that somehow has no color, require one
      newErrors.color = 'Color is required';
    }
  }

    if ((type === 'task' || type === 'subtask') && !formData.title?.trim()) {
      newErrors.title = 'Title is required';
    }

    if (type === 'task' && !formData.dueDate) {
      newErrors.dueDate = 'Due date is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSaving(true);
    try {
      let payload = { ...formData };

      if (type === 'task' && payload.dueDate) {
        payload.dueDate = new Date(payload.dueDate).toISOString();
      }

      if (type === 'category') {
        payload.color = colorChanged ? hexColor : formData.color; // enforce hex
      }

      await onSave(payload);
      onClose();
    } catch {
      setErrors({ submit: 'Failed to save. Please try again.' });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <Motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />

          <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
            <Motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden"
            >
              <div className="flex items-center justify-between p-6 border-b">
                <h2 className="text-xl font-bold">
                  Edit {type.charAt(0).toUpperCase() + type.slice(1)}
                </h2>
                <button onClick={onClose}><X /></button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-5">

                {/* CATEGORY */}
                {type === 'category' && (
                  <>
                    <input
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Category name"
                      className="w-full border p-3 rounded"
                    />
                    {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
                    <div className="flex items-center gap-3">
                      <input
                        value={colorInput}
                        onChange={handleColorChange}
                        placeholder="Color (red, skyblue, #ff5733)"
                        className="flex-1 border p-3 rounded"
                      />

                      <div
                        className="h-8 w-8 rounded-full border"
                        style={{ backgroundColor: hexColor || 'transparent' }}
                      />
                    </div>

                    {errors.color && (
                      <p className="text-sm text-red-500">{errors.color}</p>
                    )}
                  </>
                )}

                {/* TASK / SUBTASK */}
                {(type === 'task' || type === 'subtask') && (
                  <input
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Title"
                    className="w-full border p-3 rounded"
                  />
                )}

                {errors.title && <p className="text-sm text-red-500">{errors.title}</p>}

                {type === 'task' && (
                  <>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      className="w-full border p-3 rounded"
                    />

                    <input
                      type="date"
                      name="dueDate"
                      value={formData.dueDate}
                      onChange={handleChange}
                      className="w-full border p-3 rounded"
                    />

                    <select
                      name="categoryId"
                      value={formData.categoryId}
                      onChange={handleChange}
                      className="w-full border p-3 rounded"
                    >
                      <option value="">Uncategorized</option>
                      {categories?.map((c) => (
                        <option key={c.categoryId} value={c.categoryId}>
                          {c.categoryName}
                        </option>
                      ))}
                    </select>
                  </>
                )}

                {type === 'subtask' && (
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      name="completed"
                      checked={formData.completed}
                      onChange={handleChange}
                    />
                    Completed
                  </label>
                )}

                {errors.submit && (
                  <p className="text-red-600 text-sm">{errors.submit}</p>
                )}
              </form>

              <div className="flex justify-end gap-3 p-6 border-t bg-gray-50">
                <button onClick={onClose}
                className='px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg'
                >
                  Cancel
                </button>
                <button 
                  onClick={handleSubmit} disabled={isSaving}
                  className='px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700'
                >
                  <Save className="inline w-4 h-4 mr-1" />
                  Save
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
