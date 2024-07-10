import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchProductById } from '../../services/api';
import ReviewForm from '../ReviewForm';
import { fetchReviewsByProductId } from '../../services/api';

const ProductDetail = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const productData = await fetchProductById(productId);
        setProduct(productData);
      } catch (error) {
        setError('Failed to fetch product');
        console.error('Error fetching product:', error);
      }
    };

    const loadReviews = async () => {
      try {
        const reviewsData = await fetchReviewsByProductId(productId);
        setReviews(reviewsData);
      } catch (error) {
        setError('Failed to fetch reviews');
        console.error('Error fetching reviews:', error);
      }
    };

    loadProduct();
    loadReviews();
  }, [productId]);

  const handleReviewSubmitted = () => {
    loadReviews();
  };

  if (error) {
    return <p style={{ color: 'red' }}>{error}</p>;
  }

  if (!product) {
    return <p>Loading...</p>;
  }

  return (
    <div className="product-detail">
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p>Price: ${product.price}</p>
      <ReviewForm productId={productId} onReviewSubmitted={handleReviewSubmitted} />
      <h2>Reviews</h2>
      <ul>
        {reviews.map(review => (
          <li key={review.id}>
            {review.rating} stars - {review.comment}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductDetail;