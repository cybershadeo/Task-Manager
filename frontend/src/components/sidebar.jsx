import { Layout, Layers } from 'lucide-react';
import { useDash } from '../hooks/dashUseContext';
import { useTask } from '../hooks/taskUseContext';
import CreateCategoryButton from './createCategoryBtn';
import SettingsSidebar from './settings';



function SideBar() {
  const { 
    categories, 
    uncategorizedCount, 
    selectedCategoryId, 
    onSelectCategory,
    isLoading 
  } = useDash();

  const { tasks } = useTask();



  return (
    <aside className="md:flex flex-col w-64 h-screen bg-gray-50 border-r border-gray-200 fixed left-0 top-0 overflow-y-auto z-20">
      {/* Header */}
      <div className="p-6 flex items-center gap-3">
        <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-200">
          <Layout className="w-5 h-5 text-white" />
        </div>
        <span className="text-lg font-bold text-gray-900 tracking-tight">
          TaskFlow
        </span>
      </div>

      {/* Navigation */}
      <div className="px-4 py-2 flex-1">
        <h3 className="px-2 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
          Views
        </h3>

        {/* Uncategorized Section */}
        <button
          onClick={() => onSelectCategory(null)}
          className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-colors mb-4 ${
            selectedCategoryId === null
              ? 'bg-white text-indigo-600 shadow-sm border border-gray-100'
              : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
          }`}
        >
          <div className="flex items-center gap-3">
            <Layers
              className={`w-4 h-4 ${
                selectedCategoryId === null ? 'text-indigo-600' : 'text-gray-400'
              }`}
            />
            <span>Uncategorized</span>
          </div>
          {uncategorizedCount > 0 && (
            <span
              className={`text-xs px-2 py-0.5 rounded-full ${
                selectedCategoryId === null
                  ? 'bg-indigo-50 text-indigo-600'
                  : 'bg-gray-200 text-gray-600'
              }`}
            >
              {uncategorizedCount}
            </span>
          )}
        </button>

        <h3 className="px-2 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
          Categories
        </h3>

        {/* Categories List */}
        <nav className="space-y-1">
          {isLoading ? (
            <div className="px-3 py-2 text-sm text-gray-400">Loading...</div>
          ) : categories && categories.length > 0 ? (
            categories.map((category) => (
              <button
                key={category?.id}
                onClick={() => onSelectCategory(category?.id)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedCategoryId === category?.id
                    ? 'bg-white text-indigo-600 shadow-sm border border-gray-100'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: category?.categoryColor || '#6366f1' }}
                    aria-hidden="true"
                  />
                  <span>{category?.categoryName}</span>
                </div>
                {category?.taskCount > 0 && (
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full ${
                      selectedCategoryId === category?.id
                        ? 'bg-indigo-50 text-indigo-600'
                        : 'bg-gray-200 text-gray-600'
                    }`}
                  >
                    {tasks.filter(
                      t => t.categoryId === category?.id
                    ).length}
                  </span>
                )}
               
              </button>
            ))
          ) : (
            <div className="px-3 py-2 text-sm text-gray-400">
              No categories yet
            </div>
          )}
 
        </nav>
        <div>
          <CreateCategoryButton />
        </div>
        
      </div>

      {/* Footer */}
      
      <SettingsSidebar />
    </aside>
  );
}


export default SideBar;


