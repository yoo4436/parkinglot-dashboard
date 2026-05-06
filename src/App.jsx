import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './Login';
import Dashboard from './Dashboard';

function ProtectedRoute({ children }) {
  const token = localStorage.getItem('jwtToken');
  if (!token) {
    return <Navigate to="/" replace />;
  }
  return children;
}

function App() {
  return (
    // Routes 就是我們的路由表
    <Routes>
      {/* 當網址是根目錄 '/' 時，顯示登入畫面 */}
      <Route path="/" element={<Login />} />
      
      {/* 當網址是 '/dashboard' 時，顯示原本的繳費與測試機台 */}
      <Route path="/dashboard" element={
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      } />
    </Routes>
  );
}

export default App;