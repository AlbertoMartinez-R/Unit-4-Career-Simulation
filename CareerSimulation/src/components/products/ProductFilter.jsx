import React, { useState } from 'react';

const ProductFilter = ({ onFilterChange }) => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [sortBy, setSortBy] = useState('');

  const handleFilterChange = () => {
    onFilterChange({ name, category, sortBy });
  };

  return (
    <div className="product-filter">
      <input
        type="text"
        placeholder="Search by name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Filter by category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />
      <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
        <option value="">Sort By</option>
        <option value="nameAsc">Name (A-Z)</option>
        <option value="nameDesc">Name (Z-A)</option>
        <option value="priceAsc">Price (Low-High)</option>
        <option value="priceDesc">Price (High-Low)</option>
      </select>
      <button onClick={handleFilterChange}>Apply Filters</button>
    </div>
  );
};

export default ProductFilter;