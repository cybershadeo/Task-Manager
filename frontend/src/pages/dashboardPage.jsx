import { useContext } from 'react';
import AuthContext from '../context/authContext';

function DashboardPage() {
  const { user, logout } = useContext(AuthContext);

  return (
    <div style={{ padding: 24 }}>
      <h2>Dashboard</h2>
      <p>
        Welcome{user?.username ? `, ${user.username}` : ''}.
      </p>
      <button onClick={logout}>Logout</button>
    </div>
  );
}

export default DashboardPage;