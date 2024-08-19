import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ReviewSystem() {
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({ propertyId: '', rating: 5, comment: '' });

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const response = await axios.get('/api/reviews');
      setReviews(response.data);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };

  const submitReview = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/reviews', newReview);
      setNewReview({ propertyId: '', rating: 5, comment: '' });
      fetchReviews();
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };

  return (
    <div className="review-system bg-orange-100 p-4 rounded-md">
      <h2 className="text-orange-600 font-semibold">Property Reviews</h2>
      <ul className="text-orange-600 font-semibold">
        {reviews.map((review) => (
          <li key={review.id} className="mb-2">
            <p>Rating: {review.rating}/5</p>
            <p>{review.comment}</p>
          </li>
        ))}
      </ul>
      <form onSubmit={submitReview} className="flex items-center space-x-4">
        <input
          type="text"
          placeholder="Property ID"
          value={newReview.propertyId}
          onChange={(e) => setNewReview({ ...newReview, propertyId: e.target.value })}
          className="p-2 rounded-md border border-orange-600"
        />
        <select
          value={newReview.rating}
          onChange={(e) => setNewReview({ ...newReview, rating: parseInt(e.target.value) })}
          className="p-2 rounded-md border border-orange-600"
        >
          {[1, 2, 3, 4, 5].map((num) => (
            <option key={num} value={num}>{num}</option>
          ))}
        </select>
        <textarea
          placeholder="Your review"
          value={newReview.comment}
          onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
          className="p-2 rounded-md border border-orange-600"
        ></textarea>
        <button
          type="submit"
          className="bg-orange-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-orange-700"
        >
          Submit Review
        </button>
      </form>
    </div>
  );
}

export default ReviewSystem;
