import React, { useState, useEffect } from 'react';
import './AdminDashboard.css';

const AdminDashboard = () => {
    const [products, setProducts] = useState([]);
    const [newProduct, setNewProduct] = useState({
        brand: '',
        name: '',
        description: '',
        price: '',
        in_stock: true,
        quality: ''
    });

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await fetch('/api/products');
            const data = await response.json();
            setProducts(data.products);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await fetch(`/api/products/${id}`, { method: 'DELETE' });
            fetchProducts(); // Refresh the product list
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewProduct({ ...newProduct, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await fetch('/api/products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newProduct)
            });
            fetchProducts();
            setNewProduct({ brand: '', name: '', description: '', price: '', in_stock: true, quality: '' });
        } catch (error) {
            console.error('Error adding product:', error);
        }
    };

    return (
        <div className="admin-dashboard">
            <h2>Admin Dashboard</h2>

            <h3>Product List</h3>
            <ul>
                {products.map((product) => (
                    <li key={product.id}>
                        {product.name} - {product.brand} - ${product.price}
                        <button onClick={() => handleDelete(product.id)}>Delete</button>
                    </li>
                ))}
            </ul>

            <h3>Add New Product</h3>
            <form onSubmit={handleSubmit}>
                <input type="text" name="brand" value={newProduct.brand} onChange={handleChange} placeholder="Brand" required />
                <input type="text" name="name" value={newProduct.name} onChange={handleChange} placeholder="Name" required />
                <input type="text" name="description" value={newProduct.description} onChange={handleChange} placeholder="Description" required />
                <input type="number" name="price" value={newProduct.price} onChange={handleChange} placeholder="Price" required />
                <select name="in_stock" value={newProduct.in_stock} onChange={handleChange}>
                    <option value={true}>In Stock</option>
                    <option value={false}>Out of Stock</option>
                </select>
                <input type="number" name="quality" value={newProduct.quality} onChange={handleChange} placeholder="Quality" required />
                <button type="submit">Add Product</button>
            </form>
        </div>
    );
};

export default AdminDashboard;
