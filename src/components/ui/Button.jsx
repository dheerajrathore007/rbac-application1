import React from 'react';

const Button = ({ 
  children, 
  variant = 'primary', 
  isLoading = false, 
  disabled = false, 
  ...props 
}) => {
  const baseClasses = 'px-4 py-2 rounded focus:outline-none transition ease-in-out duration-150';
  const variants = {
    primary: 'bg-blue-500 hover:bg-blue-700 text-white',
    secondary: 'bg-gray-500 hover:bg-gray-700 text-white',
    danger: 'bg-red-500 hover:bg-red-700 text-white',
  };

  const classes = `${baseClasses} ${variants[variant]} ${disabled || isLoading ? 'opacity-50 cursor-not-allowed' : ''}`;

  return (
    <button className={classes} disabled={disabled || isLoading} {...props}>
      {isLoading ? 'Loading...' : children}
    </button>
  );
};

export default Button;