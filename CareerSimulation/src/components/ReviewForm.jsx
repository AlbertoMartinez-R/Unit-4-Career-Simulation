import React, { useState, useContext } from 'react';
import { AuthContext } from './context/AuthContext';
import { submitReview } from '../services/api';

const ReviewForm = ({ productId, onReviewSubmitted }) => {
  const { user } = useContext(AuthContext);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleRatingChange = (e) => {
    setRating(e.target.value);
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await submitReview(user.id, productId, rating, comment);
      setSuccess('Review submitted successfully');
      setError(null);
      setRating(0);
      setComment('');
      onReviewSubmitted();
    } catch (error) {
      setError('Error submitting review: ' + error.message);
      setSuccess(null);
      console.error('Error submitting review:', error);
    }
  };

  return (
    <div className="review-form">
      <h2>Write a Review</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Rating:</label>
          <select value={rating} onChange={handleRatingChange} required>
            <option value="" disabled>Select rating</option>
            {[1, 2, 3, 4, 5].map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Comment:</label>
          <textarea
            value={comment}
            onChange={handleCommentChange}
            placeholder="Write your review here"
            required
          />
        </div>
        <button type="submit">Submit Review</button>
      </form>
    </div>
  );
};

export default ReviewForm;