import { DashProvider } from '../context/DashContext';
import { TaskProvider } from '../context/TaskContext';
import SideBar from '../components/sidebar';
import KanbanBoard from '../components/taskList';

function DashboardPage() {
  return (
    <DashProvider>
      <TaskProvider>
        <div>
          <SideBar />

          <main className='ml-64 p-6'>
            <KanbanBoard />
          </main>
        </div>
      </TaskProvider>
    </DashProvider>
  );
}

export default DashboardPage;
<div class="bg-blue-500 p-4 text-sm md:bg-green-500 md:p-8 md:text-base lg:bg-purple-600 lg:p-12">
  Responsive Content
</div>
