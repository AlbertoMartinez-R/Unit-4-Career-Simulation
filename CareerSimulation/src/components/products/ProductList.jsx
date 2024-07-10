import React, { useState, useEffect } from 'react';
import { fetchAllProducts } from '../../services/api';
import ProductFilter from './ProductFilter';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({ name: '', category: '', sortBy: '' });

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const productsData = await fetchAllProducts();
        applyFilters(productsData);
      } catch (error) {
        setError('Failed to fetch products');
        console.error('Error fetching products:', error);
      }
    };

    loadProducts();
  }, [filters]);

  const applyFilters = (productsData) => {
    let filteredProducts = productsData;

    if (filters.name) {
      filteredProducts = filteredProducts.filter(product =>
        product.name.toLowerCase().includes(filters.name.toLowerCase())
      );
    }

    if (filters.category) {
      filteredProducts = filteredProducts.filter(product =>
        product.category.toLowerCase().includes(filters.category.toLowerCase())
      );
    }

    if (filters.sortBy) {
      if (filters.sortBy === 'nameAsc') {
        filteredProducts = filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
      } else if (filters.sortBy === 'nameDesc') {
        filteredProducts = filteredProducts.sort((a, b) => b.name.localeCompare(a.name));
      } else if (filters.sortBy === 'priceAsc') {
        filteredProducts = filteredProducts.sort((a, b) => a.price - b.price);
      } else if (filters.sortBy === 'priceDesc') {
        filteredProducts = filteredProducts.sort((a, b) => b.price - a.price);
      }
    }

    setProducts(filteredProducts);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  return (
    <div>
      <h1>Product List</h1>
      <ProductFilter onFilterChange={handleFilterChange} />
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {products.map(product => (
          <li key={product.id}>
            {product.name} - ${product.price}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;