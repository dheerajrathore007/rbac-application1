import React, { useState } from 'react';
import { useGetUsersQuery } from '../../store/api/usersApi';
import Table from '../../components/ui/Table';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Card from '../../components/ui/Card';
import Loader from '../../components/ui/Loader';
import Alert from '../../components/ui/Alert';

const UsersList = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  
  const { data, error, isLoading } = useGetUsersQuery({
    page,
    limit: 10,
    search,
    filters: { role: roleFilter }
  });

  const users = data?.data || [];
  const totalPages = data?.totalPages || 1;

  const handleSearch = (value) => {
    setSearch(value);
    setPage(1);
  };

  const headers = ['ID', 'Name', 'Email', 'Role', 'Created At', 'Actions'];

  const renderRow = (user) => (
    <tr key={user.id}>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
        {user.id}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
        {user.name}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
        {user.email}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
          user.role === 'admin' 
            ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
            : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
        }`}>
          {user.role}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
        {user.createdAt}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
        <Button variant="outline" size="small">
          View
        </Button>
        <Button variant="primary" size="small">
          Edit
        </Button>
        <Button variant="danger" size="small">
          Delete
        </Button>
      </td>
    </tr>
  );

  if (error) {
    return (
      <Alert type="error" title="Error" message="Failed to load users" />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Users</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage system users</p>
        </div>
        <Button variant="primary">
          + Add User
        </Button>
      </div>

      <Card>
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1">
            <Input
              placeholder="Search users..."
              value={search}
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>
          <div className="w-full sm:w-48">
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="all">All Roles</option>
              <option value="admin">Admin</option>
              <option value="user">User</option>
            </select>
          </div>
        </div>

        {/* Table */}
        {isLoading ? (
          <Loader text="Loading users..." centered />
        ) : (
          <>
            <Table
              headers={headers}
              data={users}
              renderRow={renderRow}
              searchable={false}
              emptyMessage="No users found"
            />
            
            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between mt-6">
                <Button
                  variant="outline"
                  disabled={page === 1}
                  onClick={() => setPage(page - 1)}
                >
                  Previous
                </Button>
                
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Page {page} of {totalPages}
                </span>
                
                <Button
                  variant="outline"
                  disabled={page === totalPages}
                  onClick={() => setPage(page + 1)}
                >
                  Next
                </Button>
              </div>
            )}
          </>
        )}
      </Card>
    </div>
  );
};

export default UsersList;