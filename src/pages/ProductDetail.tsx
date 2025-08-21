import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useProducts } from '../contexts/ProductContext';
import { useCart } from '../contexts/CartContext';
import { Star, ChevronRight, Plus, Minus, ShoppingCart, Check } from 'lucide-react';

const ProductDetail: React.FC = () => {
  const { products, loading, error } = useProducts();
  const { addToCart } = useCart();
  const { id } = useParams<{ id: string }>();
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const product = products.find(p => p.id === id);

  // Debug information
  console.log('ProductDetail Debug:', {
    id,
    productsLength: products.length,
    productFound: !!product,
    loading,
    error,
    allProductIds: products.map(p => p.id)
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading product details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center py-20 text-red-500">
          <p className="text-xl font-semibold mb-2">Error loading product</p>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center py-20">
          <p className="text-xl font-semibold mb-2">Product not found</p>
          <p className="text-gray-600 mb-4">The product you're looking for doesn't exist.</p>
          <p className="text-sm text-gray-500">Product ID: {id}</p>
          <p className="text-sm text-gray-500">Available products: {products.length}</p>
          <Link
            to="/products"
            className="inline-block mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Products
          </Link>
        </div>
      </div>
    );
  }
  
  const handleAddToCart = async () => {
    if (!product || quantity <= 0) return;

    setIsAdding(true);

    // Add to cart
    addToCart(product, quantity);

    // Show success animation
    setTimeout(() => {
      setIsAdding(false);
      setShowSuccess(true);

      // Hide success message after 3 seconds
      setTimeout(() => {
        setShowSuccess(false);
      }, 3000);
    }, 500);
  };

  const incrementQuantity = () => {
    if (product && quantity < product.stock) {
      setQuantity(prev => prev + 1);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  return (
    <div className="bg-gray-50">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">

        {/* Breadcrumb Navigation */}
        <div className="flex items-center text-sm text-gray-500 mb-6">
          <Link to="/" className="hover:text-blue-600">Home</Link>
          <ChevronRight className="h-4 w-4 mx-1" />
          <Link to="/products" className="hover:text-blue-600">Products</Link>
          <ChevronRight className="h-4 w-4 mx-1" />
          <span className="font-medium text-gray-700">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Product Image */}
          <div className="lg:col-span-1">
            <div className="bg-white p-4 rounded-xl shadow-lg max-w-md mx-auto">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-auto object-cover rounded-lg aspect-square hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>

          {/* Product Info */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <span className="text-sm font-semibold text-blue-600 bg-blue-100 px-3 py-1 rounded-full animate-pulse">
                {product.category}
              </span>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">{product.name}</h1>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current hover:scale-110 transition-transform duration-200" />
                ))}
                <span className="ml-2 text-sm text-gray-500">(4.8/5)</span>
              </div>
              <p className="text-3xl font-bold text-gray-800 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                ${product.price.toFixed(2)}
              </p>
            </div>

            <p className="text-gray-600 leading-relaxed text-lg">{product.description}</p>

            <div className="bg-gradient-to-r from-green-50 to-blue-50 p-4 rounded-xl border border-green-200">
              <p className="font-medium text-gray-800 flex items-center">
                <div className={`w-3 h-3 rounded-full mr-2 ${product.stock > 0 ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></div>
                Stock:
                <span className={product.stock > 0 ? 'text-green-600 font-bold' : 'text-red-600 font-bold'}>
                  {product.stock > 0 ? ` ${product.stock} Available` : ' Out of Stock'}
                </span>
              </p>
            </div>

            {/* Quantity Selector */}
            {product.stock > 0 && (
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <span className="text-sm font-medium text-gray-700">Quantity:</span>
                  <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                    <button
                      onClick={decrementQuantity}
                      disabled={quantity <= 1}
                      className="p-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="px-4 py-2 bg-gray-50 font-medium min-w-[60px] text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={incrementQuantity}
                      disabled={quantity >= product.stock}
                      className="p-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                  <span className="text-sm text-gray-500">
                    Total: <span className="font-bold text-blue-600">${(product.price * quantity).toFixed(2)}</span>
                  </span>
                </div>
              </div>
            )}

            {/* Add to Cart Button */}
            <div className="space-y-3">
              <button
                onClick={handleAddToCart}
                disabled={product.stock === 0 || isAdding}
                className={`w-full font-semibold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2 ${
                  product.stock === 0
                    ? 'bg-gray-400 text-white cursor-not-allowed'
                    : isAdding
                    ? 'bg-blue-500 text-white'
                    : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl'
                }`}
              >
                {isAdding ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Adding to Cart...</span>
                  </>
                ) : product.stock === 0 ? (
                  <span>Out of Stock</span>
                ) : (
                  <>
                    <ShoppingCart className="h-5 w-5" />
                    <span>Add {quantity} to Cart</span>
                  </>
                )}
              </button>

              {/* Success Message */}
              {showSuccess && (
                <div className="bg-green-50 border border-green-200 rounded-xl p-4 animate-in slide-in-from-top-2 duration-300">
                  <div className="flex items-center space-x-2 text-green-700">
                    <Check className="h-5 w-5 text-green-500" />
                    <span className="font-medium">
                      {quantity} {quantity === 1 ? 'item' : 'items'} added to cart successfully!
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;