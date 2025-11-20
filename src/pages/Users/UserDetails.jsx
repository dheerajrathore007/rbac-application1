import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGetUserByIdQuery } from '../../store/api/usersApi';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Loader from '../../components/ui/Loader';
import Alert from '../../components/ui/Alert';

const UserDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, error, isLoading } = useGetUserByIdQuery(id);

  const user = data?.data;

  if (isLoading) {
    return <Loader text="Loading user details..." centered />;
  }

  if (error || !user) {
    return (
      <Alert 
        type="error" 
        title="Error" 
        message="User not found or failed to load user details" 
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            User Details
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Detailed information about {user.name}
          </p>
        </div>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            onClick={() => navigate('/users')}
          >
            ← Back to Users
          </Button>
          <Button
            variant="primary"
            onClick={() => navigate(`/users/${id}/edit`)}
          >
            Edit User
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* User Information */}
        <div className="lg:col-span-2">
          <Card>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              Basic Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Full Name
                </label>
                <p className="mt-1 text-sm text-gray-900 dark:text-white">
                  {user.name}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Email Address
                </label>
                <p className="mt-1 text-sm text-gray-900 dark:text-white">
                  {user.email}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Role
                </label>
                <p className="mt-1">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    user.role === 'admin' 
                      ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
                      : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                  }`}>
                    {user.role}
                  </span>
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Member Since
                </label>
                <p className="mt-1 text-sm text-gray-900 dark:text-white">
                  {user.createdAt}
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Actions */}
        <div>
          <Card>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              Actions
            </h3>
            <div className="space-y-3">
              <Button
                variant="primary"
                className="w-full justify-center"
                onClick={() => navigate(`/users/${id}/edit`)}
              >
                Edit User
              </Button>
              <Button
                variant="outline"
                className="w-full justify-center"
                onClick={() => navigate('/users')}
              >
                Back to List
              </Button>
              <Button
                variant="danger"
                className="w-full justify-center"
              >
                Delete User
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;