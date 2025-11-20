import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGetProductByIdQuery } from '../../store/api/productsApi';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Loader from '../../components/ui/Loader';
import Alert from '../../components/ui/Alert';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, error, isLoading } = useGetProductByIdQuery(id);

  const product = data?.data;

  if (isLoading) {
    return <Loader text="Loading product details..." centered />;
  }

  if (error || !product) {
    return (
      <Alert 
        type="error" 
        title="Error" 
        message="Product not found or failed to load product details" 
      />
    );
  }

  const getStockColor = (stock) => {
    if (stock > 10) return 'text-green-600 bg-green-100 dark:bg-green-900 dark:text-green-200';
    if (stock > 0) return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900 dark:text-yellow-200';
    return 'text-red-600 bg-red-100 dark:bg-red-900 dark:text-red-200';
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Product Details
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Detailed information about {product.name}
          </p>
        </div>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            onClick={() => navigate('/products')}
          >
            ← Back to Products
          </Button>
          <Button
            variant="primary"
            onClick={() => navigate(`/products/${id}/edit`)}
          >
            Edit Product
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Product Information */}
        <div className="lg:col-span-2">
          <Card>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              Product Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Product Name
                </label>
                <p className="mt-1 text-lg font-semibold text-gray-900 dark:text-white">
                  {product.name}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Price
                </label>
                <p className="mt-1 text-lg font-semibold text-green-600 dark:text-green-400">
                  ${product.price}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Category
                </label>
                <p className="mt-1 text-sm text-gray-900 dark:text-white">
                  {product.category}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Stock Status
                </label>
                <p className="mt-1">
                  <span className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${getStockColor(product.stock)}`}>
                    {product.stock} in stock
                  </span>
                </p>
              </div>
              <div className="md:col-span-2">
                <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Description
                </label>
                <p className="mt-1 text-gray-900 dark:text-white">
                  {product.description}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Created Date
                </label>
                <p className="mt-1 text-sm text-gray-900 dark:text-white">
                  {product.createdAt}
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
                onClick={() => navigate(`/products/${id}/edit`)}
              >
                Edit Product
              </Button>
              <Button
                variant="outline"
                className="w-full justify-center"
                onClick={() => navigate('/products')}
              >
                Back to List
              </Button>
              <Button
                variant="danger"
                className="w-full justify-center"
              >
                Delete Product
              </Button>
            </div>
          </Card>

          {/* Stock Alert */}
          {product.stock < 5 && (
            <Card className="mt-6 border-l-4 border-yellow-400">
              <div className="flex items-start">
                <span className="text-yellow-500 text-lg mr-2">⚠️</span>
                <div>
                  <h4 className="font-medium text-yellow-800 dark:text-yellow-200">
                    Low Stock Alert
                  </h4>
                  <p className="text-sm text-yellow-700 dark:text-yellow-300 mt-1">
                    This product is running low on stock. Consider restocking soon.
                  </p>
                </div>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;