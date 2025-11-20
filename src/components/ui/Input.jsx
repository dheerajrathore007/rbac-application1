import React from 'react';

const Input = ({ 
  label, 
  type = 'text', 
  error, 
  ...props 
}) => {
  return (
    <div>
      {label && <label className="block text-sm font-medium text-gray-700">{label}</label>}
      <input
        type={type}
        className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${
          error ? 'border-red-500' : ''
        }`}
        {...props}
      />
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default Input;