import { Reorder } from 'framer-motion';
import  TaskCard  from './TaskCard';
import CreateTaskButton from './createTaskBtn';
import CategoryEditMenu from './editCategory';
import { Plus } from 'lucide-react';
import { useTask } from '../hooks/taskUseContext';
import { useDash } from '../hooks/dashUseContext';

export function KanbanBoard() {
  const { getFilteredTasks, isLoading } = useTask();
  const { selectedCategoryId, categories, overview } = useDash();

  // Get filtered tasks based on selected category
  const filteredTasks = getFilteredTasks(selectedCategoryId);
  
  // Group tasks by status
  const pendingTasks = filteredTasks.filter((t) => t.status === 'pending');
  const inProgressTasks = filteredTasks.filter((t) => t.status === 'InProgress');
  const completedTasks = filteredTasks.filter((t) => t.status === 'completed');

  // Handle reordering within a column
  const handleReorder = async (newOrder, status) => {
    // Optional: Update order in backend if you have an order field
    console.log('Reordered:', status, newOrder);
  };

  
  const columns = [
    {
      title: 'Pending',
      description: 'Planned, not started',
      status: 'pending',
      items: pendingTasks,
      color: 'bg-amber-400',
      count: pendingTasks.length,
      emptyMessage: 'No pending tasks. Create one to get started.'
    },
    {
      title: 'In Progress',
      description: 'Currently being worked on',
      status: 'inProgress',
      items: inProgressTasks,
      color: 'bg-indigo-400',
      count: inProgressTasks.length ,
      emptyMessage: 'No tasks in progress yet.'
    },
    {
      title: 'Completed',
      description: 'Finished tasks',
      status: 'completed',
      items: completedTasks,
      color: 'bg-emerald-400',
      count: completedTasks.length ,
      emptyMessage: 'No complete tasks'
    },
  ];

  const currentCategory = selectedCategoryId
    ? categories.find((category) => category?.id === selectedCategoryId)
    : null;

  const currentCategoryName = currentCategory 
    ? currentCategory.categoryName
    : 'Uncategorized Tasks';

  const currentCategoryDesc = currentCategory
    ? `Manage tasks for ${currentCategory?.categoryName}`
    : "Tasks that haven't been assigned to a specific category yet.";

  
  return (
    <div className="flex-1 overflow-x-auto overflow-y-hidden h-full">
      {isLoading ? (
        <div className="flex items-center justify-center h-full">
          <div className="text-gray-400">Loading tasks...</div>
        </div>
      ) : (
        <div className="h-full p-8 min-w-[1000px]">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <div className='flex gap-10'>
              <h1 className="text-2xl font-bold text-gray-900">
              {currentCategoryName}
              </h1>
              {selectedCategoryId && (
                <CategoryEditMenu 
                  category={currentCategory} 
                  categoryId={currentCategory?.id} 
                />
              )}
            </div>

            <p className="text-sm text-gray-500 mt-1">{currentCategoryDesc}</p>
            
          </div>
          
          <div className="flex items-center gap-3">
            {/* Task Summary Stats */}
            <div className="flex items-center gap-4 mr-4 text-sm">
              <div className="flex items-center gap-2">
                <span className="text-gray-500">Total:</span>
                <span className="font-semibold text-gray-900">
                  {overview?.totalTasks || 0}
                </span>
              </div>
              <div className="h-4 w-px bg-gray-200" />
              <div className="flex items-center gap-2">
                <span className="text-gray-500">Categories:</span>
                <span className="font-semibold text-gray-900">
                  {overview?.totalCategories || 0}
                </span>
              </div>
            </div>
            
            <CreateTaskButton  categoryId={selectedCategoryId}/>
          </div>
        </div>

        {/* Kanban Columns */}
        <div className="grid grid-cols-3 gap-8 h-[calc(100%-100px)]">
          {columns.map((column) => (
            <div key={column.status} className="flex flex-col h-full">
              {/* Column Header */}
                <div className="flex items-start justify-between mb-4 px-1">
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                      <h2 className="text-sm font-semibold text-gray-800">
                        {column.title}
                      </h2>
                      <span className="bg-gray-100 text-gray-600 text-xs font-medium px-2 py-0.5 rounded-full">
                        {column.count}
                      </span>
                    </div>

                    <p className="text-xs text-gray-500">
                      {column.description}
                    </p>
                  </div>

                  <div className={`w-2 h-2 rounded-full mt-1 ${column.color}`} />
                </div>
              {/* Droppable Area */}
              <div className="flex-1 bg-gray-50/50 rounded-2xl p-4 border border-gray-100/50 overflow-y-auto">
                <Reorder.Group
                  axis="y"
                  values={column.items}
                  onReorder={(newOrder) => handleReorder(newOrder, column.status)}
                  className="space-y-3 min-h-[200px]"
                >
                  {column.items.map((task) => (
                    <TaskCard key={task.id} task={task} />
                  ))}
                </Reorder.Group>

                {column.items.length === 0 && (
                  <div className="flex items-center justify-center h-32 text-gray-400 text-sm text-center px-4">
                    {column.emptyMessage}
                  </div>
                )}


              </div>
            </div>
          ))}
        </div>
      </div>
      )}
    </div>
  );
}

export default KanbanBoard;