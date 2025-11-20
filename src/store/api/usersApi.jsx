import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Mock data for users
const mockUsers = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    role: 'admin',
    createdAt: '2024-01-15'
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane@example.com',
    role: 'user',
    createdAt: '2024-01-16'
  },
  {
    id: 3,
    name: 'Mike Johnson',
    email: 'mike@example.com',
    role: 'user',
    createdAt: '2024-01-17'
  }
];

export const usersApi = createApi({
  reducerPath: 'usersApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api',
    // Simulate API delay
    fetchFn: async (...args) => {
      await new Promise(resolve => setTimeout(resolve, 500));
      return fetch(...args);
    },
  }),
  tagTypes: ['Users'],
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: ({ page = 1, limit = 10, search = '', filters = {} } = {}) => {
        let filteredUsers = [...mockUsers];
        
        // Search filter
        if (search) {
          filteredUsers = filteredUsers.filter(user => 
            user.name.toLowerCase().includes(search.toLowerCase()) ||
            user.email.toLowerCase().includes(search.toLowerCase())
          );
        }
        
        // Role filter
        if (filters.role && filters.role !== 'all') {
          filteredUsers = filteredUsers.filter(user => user.role === filters.role);
        }
        
        // Pagination
        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit;
        const paginatedUsers = filteredUsers.slice(startIndex, endIndex);
        
        return {
          url: '/users',
          method: 'GET',
          body: {
            data: paginatedUsers,
            total: filteredUsers.length,
            page,
            limit,
            totalPages: Math.ceil(filteredUsers.length / limit)
          }
        };
      },
      providesTags: ['Users'],
    }),
    
    getUserById: builder.query({
      query: (id) => ({
        url: `/users/${id}`,
        method: 'GET',
        body: { data: mockUsers.find(user => user.id === parseInt(id)) }
      }),
    }),
    
    createUser: builder.mutation({
      query: (userData) => {
        const newUser = {
          id: Math.max(...mockUsers.map(u => u.id)) + 1,
          ...userData,
          createdAt: new Date().toISOString().split('T')[0]
        };
        mockUsers.push(newUser);
        
        return {
          url: '/users',
          method: 'POST',
          body: { data: newUser }
        };
      },
      invalidatesTags: ['Users'],
    }),
    
    updateUser: builder.mutation({
      query: ({ id, ...userData }) => {
        const index = mockUsers.findIndex(user => user.id === parseInt(id));
        if (index !== -1) {
          mockUsers[index] = { ...mockUsers[index], ...userData };
        }
        
        return {
          url: `/users/${id}`,
          method: 'PUT',
          body: { data: mockUsers[index] }
        };
      },
      invalidatesTags: ['Users'],
    }),
    
    deleteUser: builder.mutation({
      query: (id) => {
        const index = mockUsers.findIndex(user => user.id === parseInt(id));
        if (index !== -1) {
          mockUsers.splice(index, 1);
        }
        
        return {
          url: `/users/${id}`,
          method: 'DELETE',
        };
      },
      invalidatesTags: ['Users'],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetUserByIdQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = usersApi;