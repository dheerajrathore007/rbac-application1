import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { store } from './store';
import { initializeAuth } from './store/slices/authSlice';

// Components...
import Header from './components/layout/Header';
import Sidebar from './components/layout/Sidebar';
import Footer from './components/layout/Footer';
import LoginForm from './components/auth/LoginForm';
// Pages...

import Dashboard from './pages/Dashboard';
import UsersList from './pages/Users/UserList';
import UserForm from './pages/Users/UserForm';
import UserDetails from './pages/Users/UserDetails';
import ProductsList from './pages/Products/ProductList';
import ProductForm from './pages/Products/ProductForm';
import ProductDetails from './pages/Products/ProductDetails';

// Protected Route Component..
const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { isAuthenticated, role } = useSelector(state => state.auth);
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  if (adminOnly && role !== 'admin') {
    return <Navigate to="/dashboard" replace />;
  }
  
  return children;
};

// Public Route Component (redirect if already authenticated)
const PublicRoute = ({ children }) => {
  const { isAuthenticated } = useSelector(state => state.auth);
  
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }
  
  return children;
};

const AppContent = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector(state => state.auth);

  useEffect(() => {
    dispatch(initializeAuth());
  }, [dispatch]);

  if (!isAuthenticated) {
    return (
      <Routes>
        <Route path="/login" element={
          <PublicRoute>
            <LoginForm />
          </PublicRoute>
        } />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <Header />
        
        {/* Main content area */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-8">
          <Routes>
            {/* Dashboard */}
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            
            {/* Users Routes - Admin Only */}
            <Route path="/users" element={
              <ProtectedRoute adminOnly={true}>
                <UsersList />
              </ProtectedRoute>
            } />
            <Route path="/users/create" element={
              <ProtectedRoute adminOnly={true}>
                <UserForm />
              </ProtectedRoute>
            } />
            <Route path="/users/:id/edit" element={
              <ProtectedRoute adminOnly={true}>
                <UserForm />
              </ProtectedRoute>
            } />
            <Route path="/users/:id" element={
              <ProtectedRoute adminOnly={true}>
                <UserDetails />
              </ProtectedRoute>
            } />
            
            {/* Products Routes */}
            <Route path="/products" element={
              <ProtectedRoute>
                <ProductsList />
              </ProtectedRoute>
            } />
            <Route path="/products/create" element={
              <ProtectedRoute adminOnly={true}>
                <ProductForm />
              </ProtectedRoute>
            } />
            <Route path="/products/:id/edit" element={
              <ProtectedRoute adminOnly={true}>
                <ProductForm />
              </ProtectedRoute>
            } />
            <Route path="/products/:id" element={
              <ProtectedRoute>
                <ProductDetails />
              </ProtectedRoute>
            } />
            
            {/* Default redirect */}
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/login" element={<Navigate to="/dashboard" replace />} />
            
            {/* 404 Page */}
            <Route path="*" element={
              <div className="flex items-center justify-center h-64">
                <div className="text-center">
                  <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">404</h1>
                  <p className="text-gray-600 dark:text-gray-400">Page not found</p>
                </div>
              </div>
            } />
          </Routes>
        </main>
        
        {/* Footer */}
        <Footer />
      </div>
      
      {/* Mobile menu button */}
      {!sidebarOpen && (
        <button
          className="lg:hidden fixed bottom-4 right-4 w-12 h-12 bg-blue-600 rounded-full shadow-lg flex items-center justify-center text-white z-30"
          onClick={() => setSidebarOpen(true)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      )}
    </div>
  );
};

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <AppContent />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
