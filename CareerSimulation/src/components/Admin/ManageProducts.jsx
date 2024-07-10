import React, { useState, useEffect } from 'react';
import { fetchAllProducts, updateProductDetails, updateProductStatus } from '../../services/api';

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const productsData = await fetchAllProducts();
        setProducts(productsData);
      } catch (error) {
        setError('Failed to fetch products');
        console.error('Error fetching products:', error);
      }
    };

    loadProducts();
  }, []);

  const handleUpdateProduct = async (productId, updatedDetails) => {
    try {
      await updateProductDetails(productId, updatedDetails);
      setProducts(products.map(product => (product.id === productId ? { ...product, ...updatedDetails } : product)));
    } catch (error) {
      setError('Failed to update product');
      console.error('Error updating product:', error);
    }
  };

  const handleStatusChange = async (productId, newStatus) => {
    try {
      await updateProductStatus(productId, newStatus);
      setProducts(products.map(product => (product.id === productId ? { ...product, status: newStatus } : product)));
    } catch (error) {
      setError('Failed to update product status');
      console.error('Error updating product status:', error);
    }
  };

  return (
    <div className="manage-products">
      <h2>Manage Products</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {products.map(product => (
          <li key={product.id}>
            <p>{product.name} - ${product.price} - {product.status}</p>
            <input
              type="text"
              placeholder="Update Name"
              onBlur={(e) => handleUpdateProduct(product.id, { name: e.target.value })}
            />
            <input
              type="number"
              placeholder="Update Price"
              onBlur={(e) => handleUpdateProduct(product.id, { price: e.target.value })}
            />
            <select
              value={product.status}
              onChange={(e) => handleStatusChange(product.id, e.target.value)}
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="unavailable">Unavailable</option>
            </select>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageProducts;