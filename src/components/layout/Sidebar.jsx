import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = ({ isOpen, onClose }) => {
  const { role } = useSelector(state => state.auth);
  const location = useLocation();

  const adminMenu = [
    { path: '/dashboard', label: 'Dashboard', icon: '📊' },
    { path: '/users', label: 'Users', icon: '👥' },
    { path: '/products', label: 'Products', icon: '📦' },
  ];

  const userMenu = [
    { path: '/dashboard', label: 'Dashboard', icon: '📊' },
    { path: '/products', label: 'Products', icon: '📦' },
  ];

  const menuItems = role === 'admin' ? adminMenu : userMenu;

  const isActive = (path) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-gray-600 bg-opacity-75 z-40 lg:hidden"
          onClick={onClose}
        ></div>
      )}

      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-gray-800 dark:bg-gray-900 transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
        lg:translate-x-0 lg:static lg:inset-0
      `}>
        <div className="flex items-center justify-center h-16 bg-gray-900 dark:bg-black">
          <h2 className="text-white text-xl font-bold">Admin Panel</h2>
        </div>

        <nav className="mt-8">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => window.innerWidth < 1024 && onClose()}
              className={`
                flex items-center px-6 py-3 text-gray-300 transition-colors duration-200
                ${isActive(item.path) 
                  ? 'bg-gray-900 text-white border-r-4 border-blue-500' 
                  : 'hover:bg-gray-700 hover:text-white'
                }
              `}
            >
              <span className="mr-3 text-lg">{item.icon}</span>
              <span className="font-medium">{item.label}</span>
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
};

export default Sidebar;