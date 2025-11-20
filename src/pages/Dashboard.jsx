import React from 'react';
import { useSelector } from 'react-redux';
import Card from '../components/ui/Card';

const Dashboard = () => {
  const { user, role } = useSelector(state => state.auth);

  const stats = [
    { title: 'Total Users', value: '150', color: 'blue' },
    { title: 'Total Products', value: '45', color: 'green' },
    { title: 'Revenue', value: '$12.5K', color: 'purple' },
    { title: 'Orders', value: '1,234', color: 'orange' },
  ];

  const getColorClasses = (color) => {
    const colors = {
      blue: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
      green: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
      purple: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
      orange: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
    };
    return colors[color];
  };

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <Card>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Welcome, {user?.name || 'User'}!
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          This is the dashboard page. Your role: <span className="font-semibold capitalize">{role}</span>
        </p>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} hover={true}>
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className={`w-12 h-12 rounded-lg ${getColorClasses(stat.color)} flex items-center justify-center`}>
                  <span className="text-lg">📊</span>
                </div>
              </div>
              <div className="ml-4">
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  {stat.title}
                </h3>
                <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                  {stat.value}
                </p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
            Recent Users
          </h3>
          <div className="space-y-3">
            {['John Doe', 'Jane Smith', 'Mike Johnson', 'Sarah Wilson'].map((name, index) => (
              <div key={index} className="flex items-center justify-between py-2">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                    <span className="text-blue-600 text-sm font-medium">
                      {name.charAt(0)}
                    </span>
                  </div>
                  <span className="text-gray-700 dark:text-gray-300">{name}</span>
                </div>
                <span className="text-sm text-gray-500">2 hours ago</span>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
            Recent Products
          </h3>
          <div className="space-y-3">
            {['Laptop Pro', 'Smartphone X', 'Wireless Headphones', 'Gaming Mouse'].map((product, index) => (
              <div key={index} className="flex items-center justify-between py-2">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                    <span className="text-green-600 text-sm">📦</span>
                  </div>
                  <span className="text-gray-700 dark:text-gray-300">{product}</span>
                </div>
                <span className="text-sm text-gray-500">$299.99</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;