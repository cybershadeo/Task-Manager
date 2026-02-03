import { useEffect, useRef, useState } from "react";
import { MoreHorizontal, Edit, Trash2 } from "lucide-react";
import { useDash } from "../hooks/dashUseContext";
import EditModal from "./editModal";

function CategoryEditMenu({ category, categoryId }) {
  const [showMenu, setShowMenu] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const menuRef = useRef(null);

  const { deleteCategory, updateCategory } = useDash();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleEdit = (e) => {
    e.stopPropagation();
    setShowEditModal(true);
    setShowMenu(false);
  };

  const handleDelete = async (e) => {
    e.stopPropagation();
    await deleteCategory(categoryId);
    setShowMenu(false);
  };

  const handleSaveCategory = async (updatedFields) => {
    await updateCategory(categoryId, updatedFields);
  };

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={(e) => {
          e.stopPropagation();
          setShowMenu((prev) => !prev);
        }}
        className="text-gray-400 hover:text-gray-600 hover:bg-gray-50 p-1 rounded"
      >
        <MoreHorizontal className="w-4 h-4" />
      </button>

      {showMenu && (
        <div className="absolute right-0 top-8 bg-white border rounded-lg shadow-lg z-50 py-1 min-w-[140px]">
          <button
            onClick={handleEdit}
            className="w-full px-3 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2"
          >
            <Edit className="w-3.5 h-3.5" />
            Edit Category
          </button>

          <button
            onClick={handleDelete}
            className="w-full px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
          >
            <Trash2 className="w-3.5 h-3.5" />
            Delete
          </button>
        </div>
      )}

      <EditModal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        onSave={handleSaveCategory}
        data={category}
        type="category"
      />
    </div>
  );
}

export default CategoryEditMenu;
