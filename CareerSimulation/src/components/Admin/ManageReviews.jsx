import React, { useState, useEffect } from 'react';
import { fetchAllReviews, deleteReview } from '../../services/api';

const ManageReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadReviews = async () => {
      try {
        const reviewsData = await fetchAllReviews();
        setReviews(reviewsData);
      } catch (error) {
        setError('Failed to fetch reviews');
        console.error('Error fetching reviews:', error);
      }
    };

    loadReviews();
  }, []);

  const handleDeleteReview = async (reviewId) => {
    try {
      await deleteReview(reviewId);
      setReviews(reviews.filter(review => review.id !== reviewId));
    } catch (error) {
      setError('Failed to delete review');
      console.error('Error deleting review:', error);
    }
  };

  return (
    <div className="manage-reviews">
      <h2>Manage Reviews</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {reviews.map(review => (
          <li key={review.id}>
            <p>{review.productName}: {review.comment} - {review.rating} stars</p>
            <button onClick={() => handleDeleteReview(review.id)}>Delete Review</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageReviews;