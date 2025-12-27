import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import SignupPage from './pages/signupPage'
import SigninPage from './pages/signinPage';
import DashboardPage from './pages/dashboardPage';

function App() {
  return (
    <BrowserRouter>
      <div style={{margin: "50px"}}>
  
        <Routes>
          <Route path='/' element={<DashboardPage />} />
          <Route path='/signup' element={<SignupPage />} />
          <Route path='/signin' element={<SigninPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}


export default App;