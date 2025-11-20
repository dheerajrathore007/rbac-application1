import React from 'react';

const Alert = ({ 
  type = 'info',
  title,
  message,
  onClose,
  showIcon = true 
}) => {
  const alertConfig = {
    info: {
      bg: 'bg-blue-50',
      border: 'border-blue-200',
      text: 'text-blue-800',
      icon: 'ℹ️'
    },
    success: {
      bg: 'bg-green-50',
      border: 'border-green-200',
      text: 'text-green-800',
      icon: '✅'
    },
    warning: {
      bg: 'bg-yellow-50',
      border: 'border-yellow-200',
      text: 'text-yellow-800',
      icon: '⚠️'
    },
    error: {
      bg: 'bg-red-50',
      border: 'border-red-200',
      text: 'text-red-800',
      icon: '❌'
    }
  };

  const config = alertConfig[type];

  return (
    <div className={`p-4 border rounded-lg ${config.bg} ${config.border} ${config.text}`}>
      <div className="flex items-start">
        {showIcon && (
          <div className="flex-shrink-0 mr-3 text-lg">
            {config.icon}
          </div>
        )}
        <div className="flex-1">
          {title && <h4 className="font-medium">{title}</h4>}
          {message && <p className="mt-1 text-sm">{message}</p>}
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="flex-shrink-0 ml-4 text-lg hover:opacity-70"
          >      
          </button>
        )}
      </div>
    </div>
  );
};

export default Alert;