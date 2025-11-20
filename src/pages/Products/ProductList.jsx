import React, { useState } from 'react';
import { useGetProductsQuery } from '../../store/api/productsApi';
import Table from '../../components/ui/Table';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Card from '../../components/ui/Card';
import Loader from '../../components/ui/Loader';
import Alert from '../../components/ui/Alert';

const ProductsList = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  
  const { data, error, isLoading } = useGetProductsQuery({
    page,
    limit: 10,
    search,
  });

  const products = data?.data || [];
  const totalPages = data?.totalPages || 1;

  const handleSearch = (value) => {
    setSearch(value);
    setPage(1);
  };

  const headers = ['ID', 'Name', 'Description', 'Price', 'Category', 'Stock', 'Actions'];

  const renderRow = (product) => (
    <tr key={product.id}>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
        {product.id}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
        {product.name}
      </td>
      <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400 max-w-xs truncate">
        {product.description}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
        ${product.price}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
        {product.category}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
          product.stock > 10 
            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
            : product.stock > 0
            ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
            : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
        }`}>
          {product.stock} in stock
        </span>
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
      <Alert type="error" title="Error" message="Failed to load products" />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Products</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage product inventory</p>
        </div>
        <Button variant="primary">
          + Add Product
        </Button>
      </div>

      <Card>
        {/* Search */}
        <div className="mb-6">
          <Input
            placeholder="Search products..."
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>

        {/* Table */}
        {isLoading ? (
          <Loader text="Loading products..." centered />
        ) : (
          <>
            <Table
              headers={headers}
              data={products}
              renderRow={renderRow}
              searchable={false}
              emptyMessage="No products found"
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

export default ProductsList;