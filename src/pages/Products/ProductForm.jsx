import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../../components/ui/Card';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import Alert from '../../components/ui/Alert';

const ProductForm = ({ product = null }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: product?.name || '',
    description: product?.description || '',
    price: product?.price || '',
    category: product?.category || '',
    stock: product?.stock || '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Product name is required';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }
    
    if (!formData.price || formData.price <= 0) {
      newErrors.price = 'Valid price is required';
    }
    
    if (!formData.category.trim()) {
      newErrors.category = 'Category is required';
    }
    
    if (!formData.stock || formData.stock < 0) {
      newErrors.stock = 'Valid stock quantity is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log('Form submitted:', {
        ...formData,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock)
      });
      // Here you would dispatch the create/update action
      
      navigate('/products');
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          {product ? 'Edit Product' : 'Create New Product'}
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          {product ? 'Update product information' : 'Add a new product to inventory'}
        </p>
      </div>

      <Card>
        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            label="Product Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            error={errors.name}
            required
            placeholder="Enter product name"
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className={`w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.description ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
              } bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
              placeholder="Enter product description"
            />
            {errors.description && (
              <p className="mt-1 text-sm text-red-600">{errors.description}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Price ($)"
              name="price"
              type="number"
              step="0.01"
              value={formData.price}
              onChange={handleChange}
              error={errors.price}
              required
              placeholder="0.00"
            />

            <Input
              label="Stock Quantity"
              name="stock"
              type="number"
              value={formData.stock}
              onChange={handleChange}
              error={errors.stock}
              required
              placeholder="0"
            />
          </div>

          <Input
            label="Category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            error={errors.category}
            required
            placeholder="Enter product category"
          />

          {Object.keys(errors).length > 0 && (
            <Alert 
              type="error" 
              title="Please fix the following errors:" 
              message={Object.values(errors).join(', ')}
            />
          )}

          <div className="flex justify-end space-x-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate('/products')}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              loading={loading}
            >
              {product ? 'Update Product' : 'Create Product'}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default ProductForm;