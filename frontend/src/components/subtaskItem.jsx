import { useState, useRef, useEffect } from 'react';
import {
  MoreHorizontal,
  CheckSquare,
  Square,
  Trash2,
  Edit,
} from 'lucide-react';
import { useTask } from '../hooks/taskUseContext';
import  EditModal  from './editModal';


function SubtaskItem({ subtask, taskId, onToggle }) {
  const [showMenu, setShowMenu] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const menuRef = useRef(null);
  const { deleteSubtask, updateSubtask } = useTask();

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleDelete = async (e) => {
    e.stopPropagation();
    await deleteSubtask(taskId, subtask.id);
    setShowMenu(false);
  };

  const handleUpdate = (e) => {
    e.stopPropagation();
    setShowEditModal(true);
    setShowMenu(false);
  };

  const handleSaveSubtask = async (updatedData) => {
    await updateSubtask(taskId, subtask.id, updatedData);
  };

  return (
    <div className="flex items-start gap-2 group/subtask">
      <div
        className="mt-0.5 text-gray-400 group-hover/subtask:text-indigo-600 transition-colors cursor-pointer"
        onClick={(e) => onToggle(e, subtask)}
      >
        {subtask.completed ? (
          <CheckSquare className="w-3.5 h-3.5 text-indigo-600" />
        ) : (
          <Square className="w-3.5 h-3.5" />
        )}
      </div>
      <span
        className={`text-xs flex-1 cursor-pointer ${
          subtask.completed ? 'text-gray-400 line-through' : 'text-gray-600'
        }`}
        onClick={(e) => onToggle(e, subtask)}
      >
        {subtask.title}
      </span>
      
      <div className="relative opacity-0 group-hover/subtask:opacity-100 transition-opacity" ref={menuRef}>
        <button
          onClick={(e) => {
            e.stopPropagation();
            setShowMenu(!showMenu);
          }}
          className="text-gray-400 hover:text-gray-600 p-0.5 rounded"
        >
          <MoreHorizontal className="w-3 h-3" />
        </button>

        {showMenu && (
          <div className="absolute right-0 top-6 bg-white border border-gray-200 rounded-lg shadow-lg z-[100] py-1 min-w-[130px]">
            <button
              onClick={handleUpdate}
              className="w-full px-3 py-1.5 text-left text-xs text-gray-700 hover:bg-gray-50 flex items-center gap-2"
            >
              <Edit className="w-3 h-3" />
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="w-full px-3 py-1.5 text-left text-xs text-red-600 hover:bg-red-50 flex items-center gap-2"
            >
              <Trash2 className="w-3 h-3" />
              Delete
            </button>
          </div>
        )}
      </div>

      {/* Edit Modal */}
      <EditModal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        onSave={handleSaveSubtask}
        data={subtask}
        type="subtask"
      />
    </div>
  );
}


export default SubtaskItem;



