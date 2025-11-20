import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setCredentials } from '../../store/slices/authSlice';
import Input from '../ui/Input';
import Button from '../ui/Button';
import Card from '../ui/Card';
import Alert from '../ui/Alert';

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Mock users for login
  const mockUsers = {
    'admin@company.com': { password: 'admin123', role: 'admin', name: 'Admin User' },
    'user@company.com': { password: 'user123', role: 'user', name: 'Regular User' }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      const user = mockUsers[formData.email];
      
      if (user && user.password === formData.password) {
        // Mock JWT token
        const mockToken = 'mock-jwt-token-' + Math.random().toString(36);
        
        dispatch(setCredentials({
          user: { email: formData.email, name: user.name },
          token: mockToken,
          role: user.role
        }));

        navigate('/dashboard');
      } else {
        setError('Invalid email or password');
      }
    } catch (err) {
      setError('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md" padding="large">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Sign in to Dashboard</h2>
          <p className="mt-2 text-gray-600">Enter your credentials to access your account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <Alert type="error" message={error} />
          )}

          <Input
            label="Email address"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="Enter your email"
          />

          <Input
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            required
            placeholder="Enter your password"
          />

          <Button
            type="submit"
            variant="primary"
            size="large"
            loading={loading}
            className="w-full"
          >
            Sign in
          </Button>
        </form>

        {/* Demo credentials */}
        <div className="mt-8 p-4 bg-gray-100 rounded-lg">
          <h3 className="font-medium text-gray-900 mb-2">Demo Credentials:</h3>
          <div className="text-sm text-gray-600 space-y-1">
            <p><strong>Admin:</strong> admin@company.com / admin123</p>
            <p><strong>User:</strong> user@company.com / user123</p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default LoginForm;