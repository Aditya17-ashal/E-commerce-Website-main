import React from 'react';
import { Link } from 'react-router-dom';
import { Package, ShoppingCart, Users, TrendingUp, Plus, Eye } from 'lucide-react';
import { useProducts } from '../contexts/ProductContext';

const AdminDashboard: React.FC = () => {
  const { products } = useProducts();

  // Mock analytics data
  const analytics = {
    totalProducts: products.length,
    totalOrders: 156,
    totalCustomers: 89,
    totalRevenue: 23450.50
  };

  const recentOrders = [
    { id: '1001', customer: 'John Doe', total: 299.99, status: 'Delivered', date: '2024-01-15' },
    { id: '1002', customer: 'Jane Smith', total: 199.99, status: 'Processing', date: '2024-01-14' },
    { id: '1003', customer: 'Mike Johnson', total: 149.99, status: 'In Transit', date: '2024-01-13' },
    { id: '1004', customer: 'Sarah Wilson', total: 79.99, status: 'Delivered', date: '2024-01-12' },
  ];

  const lowStockProducts = products.filter(p => p.stock <= 5);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Delivered':
        return 'bg-green-100 text-green-800';
      case 'In Transit':
        return 'bg-blue-100 text-blue-800';
      case 'Processing':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
        <p className="text-gray-600">Manage your e-commerce store</p>
      </div>

      {/* Analytics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <Package className="h-8 w-8 text-blue-600" />
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-900">Total Products</h3>
              <p className="text-2xl font-bold text-blue-600">{analytics.totalProducts}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <ShoppingCart className="h-8 w-8 text-green-600" />
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-900">Total Orders</h3>
              <p className="text-2xl font-bold text-green-600">{analytics.totalOrders}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <Users className="h-8 w-8 text-purple-600" />
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-900">Total Customers</h3>
              <p className="text-2xl font-bold text-purple-600">{analytics.totalCustomers}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <TrendingUp className="h-8 w-8 text-orange-600" />
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-900">Total Revenue</h3>
              <p className="text-2xl font-bold text-orange-600">${analytics.totalRevenue.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Orders */}
        <div className="bg-white rounded-lg shadow-md">
          <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-xl font-semibold">Recent Orders</h2>
            <Link
              to="/admin/orders"
              className="text-blue-600 hover:text-blue-700 flex items-center text-sm"
            >
              <Eye className="h-4 w-4 mr-1" />
              View All
            </Link>
          </div>
          
          <div className="p-6">
            <div className="space-y-4">
              {recentOrders.map(order => (
                <div key={order.id} className="flex justify-between items-center py-3 border-b border-gray-100 last:border-b-0">
                  <div>
                    <p className="font-medium text-gray-900">Order #{order.id}</p>
                    <p className="text-sm text-gray-600">{order.customer}</p>
                    <p className="text-sm text-gray-500">{order.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">${order.total.toFixed(2)}</p>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Low Stock Products */}
        <div className="bg-white rounded-lg shadow-md">
          <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-xl font-semibold">Low Stock Products</h2>
            <Link
              to="/admin/products"
              className="text-blue-600 hover:text-blue-700 flex items-center text-sm"
            >
              <Plus className="h-4 w-4 mr-1" />
              Manage Products
            </Link>
          </div>
          
          <div className="p-6">
            {lowStockProducts.length === 0 ? (
              <p className="text-gray-500 text-center py-4">All products are well stocked!</p>
            ) : (
              <div className="space-y-4">
                {lowStockProducts.map(product => (
                  <div key={product.id} className="flex justify-between items-center py-3 border-b border-gray-100 last:border-b-0">
                    <div className="flex items-center space-x-3">
                      // src/pages/AdminDashboard.tsx

// src/components/ProductCard/ProductCard.tsx

<img
  src={product.imageUrl} // Corrected to use imageUrl
  alt={product.name}
  className="w-full h-48 object-cover group-hover:opacity-80 transition-opacity"
/>
                      <div>
                        <p className="font-medium text-gray-900 truncate max-w-48">{product.name}</p>
                        <p className="text-sm text-gray-600">${product.price.toFixed(2)}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-red-600 font-semibold">
                        {product.stock} left
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            to="/admin/products"
            className="bg-blue-600 text-white p-6 rounded-lg hover:bg-blue-700 transition-colors text-center"
          >
            <Package className="h-8 w-8 mx-auto mb-2" />
            <h3 className="font-semibold">Manage Products</h3>
            <p className="text-sm text-blue-100 mt-1">Add, edit, or remove products</p>
          </Link>

          <Link
            to="/admin/orders"
            className="bg-green-600 text-white p-6 rounded-lg hover:bg-green-700 transition-colors text-center"
          >
            <ShoppingCart className="h-8 w-8 mx-auto mb-2" />
            <h3 className="font-semibold">Manage Orders</h3>
            <p className="text-sm text-green-100 mt-1">View and update order status</p>
          </Link>

          <div className="bg-purple-600 text-white p-6 rounded-lg hover:bg-purple-700 transition-colors text-center cursor-pointer">
            <Users className="h-8 w-8 mx-auto mb-2" />
            <h3 className="font-semibold">View Analytics</h3>
            <p className="text-sm text-purple-100 mt-1">Detailed sales and customer insights</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;