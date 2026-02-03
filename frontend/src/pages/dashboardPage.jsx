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

