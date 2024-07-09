import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from './context/AuthContext';
import { fetchWishlist, addToWishlist, removeFromWishlist } from '../services/api';

const Wishlist = () => {
  const { user } = useContext(AuthContext);
  const [wishlist, setWishlist] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadWishlist = async () => {
      try {
        const wishlistData = await fetchWishlist(user.id);
        setWishlist(wishlistData);
      } catch (error) {
        setError('Failed to fetch wishlist');
        console.error('Error fetching wishlist:', error);
      }
    };

    loadWishlist();
  }, [user.id]);

  const handleAddToWishlist = async (productId) => {
    try {
      const updatedWishlist = await addToWishlist(user.id, productId);
      setWishlist(updatedWishlist);
    } catch (error) {
      setError('Error adding to wishlist: ' + error.message);
      console.error('Error adding to wishlist:', error);
    }
  };

  const handleRemoveFromWishlist = async (productId) => {
    try {
      const updatedWishlist = await removeFromWishlist(user.id, productId);
      setWishlist(updatedWishlist);
    } catch (error) {
      setError('Error removing from wishlist: ' + error.message);
      console.error('Error removing from wishlist:', error);
    }
  };

  return (
    <div className="wishlist">
      <h1>My Wishlist</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {wishlist.map(item => (
          <li key={item.id}>
            {item.name}
            <button onClick={() => handleRemoveFromWishlist(item.id)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Wishlist;