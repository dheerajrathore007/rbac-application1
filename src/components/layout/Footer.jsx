import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
      <div className="px-4 py-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between md:flex-row">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            © 2025 My Dashboard. All rights reserved.
          </p>
          <div className="flex mt-4 space-x-6 md:mt-0">
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Built by Dheeraj Rathore
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;