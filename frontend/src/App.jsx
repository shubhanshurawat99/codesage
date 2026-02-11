import { Routes, Route, Navigate, NavLink, useLocation } from "react-router";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from "react";
import { Home } from 'lucide-react';

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Homepage from "./pages/Homepage";
import ProblemPage from "./pages/ProblemPage";
import Admin from "./pages/Admin";
import AdminPanel from "./components/AdminPanel";
import AdminVideo from "./components/AdminVideo";
import AdminDelete from "./components/AdminDelete";
import AdminUpload from "./components/AdminUpload";

import { checkAuth } from "./authSlice";

function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  const { isAuthenticated, user, loading } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg">Loading...</span>
      </div>
    );
  }

  // Define routes where home button should appear
  const showHomeButton = isAuthenticated && 
    location.pathname !== '/' && 
    location.pathname !== '/login' && 
    location.pathname !== '/signup';

  return (
    <>
      {/* Global Home Button */}
      {showHomeButton && (
        <div className="fixed bottom-4 left-4 z-50">
          <NavLink 
            to="/" 
            className="btn btn-primary btn-circle shadow-lg hover:scale-110 transition-transform"
            title="Back to Home"
            aria-label="Back to Home"
          >
            <Home size={20} />
          </NavLink>
        </div>
      )}

      <Routes>
        {/* Public routes - NO home button */}
        <Route 
          path="/login" 
          element={isAuthenticated ? <Navigate to="/" /> : <Login />} 
        />
        <Route 
          path="/signup" 
          element={isAuthenticated ? <Navigate to="/" /> : <Signup />} 
        />

        {/* Protected routes - YES home button */}
        <Route 
          path="/" 
          element={isAuthenticated ? <Homepage /> : <Navigate to="/signup" />} 
        />
        <Route 
          path="/problem/:problemId" 
          element={isAuthenticated ? <ProblemPage /> : <Navigate to="/login" />} 
        />

        {/* Admin routes - YES home button */}
        <Route 
          path="/admin" 
          element={isAuthenticated && user?.role === 'admin' ? <Admin /> : <Navigate to="/" />} 
        />
        <Route 
          path="/admin/create" 
          element={isAuthenticated && user?.role === 'admin' ? <AdminPanel /> : <Navigate to="/" />} 
        />
        <Route 
          path="/admin/delete" 
          element={isAuthenticated && user?.role === 'admin' ? <AdminDelete /> : <Navigate to="/" />} 
        />
        <Route 
          path="/admin/video" 
          element={isAuthenticated && user?.role === 'admin' ? <AdminVideo /> : <Navigate to="/" />} 
        />
        <Route 
          path="/admin/upload/:problemId" 
          element={isAuthenticated && user?.role === 'admin' ? <AdminUpload /> : <Navigate to="/" />} 
        />

        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}

export default App;