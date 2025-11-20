import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Mock data for products
const mockProducts = [
  {
    id: 1,
    name: 'Laptop',
    description: 'High-performance laptop',
    price: 999.99,
    category: 'Electronics',
    stock: 15,
    createdAt: '2024-01-10'
  },
  {
    id: 2,
    name: 'Smartphone',
    description: 'Latest smartphone model',
    price: 699.99,
    category: 'Electronics',
    stock: 25,
    createdAt: '2024-01-12'
  },
  {
    id: 3,
    name: 'Desk Chair',
    description: 'Ergonomic office chair',
    price: 199.99,
    category: 'Furniture',
    stock: 8,
    createdAt: '2024-01-14'
  }
];

export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api',
    fetchFn: async (...args) => {
      await new Promise(resolve => setTimeout(resolve, 500));
      return fetch(...args);
    },
  }),
  tagTypes: ['Products'],
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: ({ page = 1, limit = 10, search = '', filters = {} } = {}) => {
        let filteredProducts = [...mockProducts];
        
        // Search filter
        if (search) {
          filteredProducts = filteredProducts.filter(product => 
            product.name.toLowerCase().includes(search.toLowerCase()) ||
            product.description.toLowerCase().includes(search.toLowerCase())
          );
        }
        
        // Category filter
        if (filters.category && filters.category.length > 0) {
          filteredProducts = filteredProducts.filter(product => 
            filters.category.includes(product.category)
          );
        }
        
        // Price range filter
        if (filters.minPrice) {
          filteredProducts = filteredProducts.filter(product => 
            product.price >= filters.minPrice
          );
        }
        if (filters.maxPrice) {
          filteredProducts = filteredProducts.filter(product => 
            product.price <= filters.maxPrice
          );
        }
        
        // Pagination
        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit;
        const paginatedProducts = filteredProducts.slice(startIndex, endIndex);
        
        return {
          url: '/products',
          method: 'GET',
          body: {
            data: paginatedProducts,
            total: filteredProducts.length,
            page,
            limit,
            totalPages: Math.ceil(filteredProducts.length / limit)
          }
        };
      },
      providesTags: ['Products'],
    }),
    
    getProductById: builder.query({
      query: (id) => ({
        url: `/products/${id}`,
        method: 'GET',
        body: { data: mockProducts.find(product => product.id === parseInt(id)) }
      }),
    }),
    
    createProduct: builder.mutation({
      query: (productData) => {
        const newProduct = {
          id: Math.max(...mockProducts.map(p => p.id)) + 1,
          ...productData,
          createdAt: new Date().toISOString().split('T')[0]
        };
        mockProducts.push(newProduct);
        
        return {
          url: '/products',
          method: 'POST',
          body: { data: newProduct }
        };
      },
      invalidatesTags: ['Products'],
    }),
    
    updateProduct: builder.mutation({
      query: ({ id, ...productData }) => {
        const index = mockProducts.findIndex(product => product.id === parseInt(id));
        if (index !== -1) {
          mockProducts[index] = { ...mockProducts[index], ...productData };
        }
        
        return {
          url: `/products/${id}`,
          method: 'PUT',
          body: { data: mockProducts[index] }
        };
      },
      invalidatesTags: ['Products'],
    }),
    
    deleteProduct: builder.mutation({
      query: (id) => {
        const index = mockProducts.findIndex(product => product.id === parseInt(id));
        if (index !== -1) {
          mockProducts.splice(index, 1);
        }
        
        return {
          url: `/products/${id}`,
          method: 'DELETE',
        };
      },
      invalidatesTags: ['Products'],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productsApi;