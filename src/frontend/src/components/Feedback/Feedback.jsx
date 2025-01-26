import React, { useState } from 'react';
import './Feedback.css';
import Sidebar from '../SideBar/SideBar';

function FeedbackForm() {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleStarClick = (star) => {
    if (rating === star) {
      setRating(0); 
    } else {
      setRating(star); 
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ rating, comment });
    setSubmitted(true);
  };

  const closePopup = () => {
    setSubmitted(false);
    setRating(0);
    setComment('');
  };

  return (
    <div className="container">
      <Sidebar />
      <form onSubmit={handleSubmit} className="form">
        <h2 className="title">Feedback Form</h2>

        <div className="inputGroup">
          <label className="label">Rating</label>
          <br/>
          <br/>
          <div className="stars">
            {[1, 2, 3, 4, 5].map((star) => (
              <img
                key={star}
                src={rating >= star ? './src/assets/filled-star.png' : './src/assets/star.png'} 
                alt={`star-${star}`}
                className={`star ${rating >= star ? 'filled' : ''}`}
                onClick={() => handleStarClick(star)}
              />
            ))}
          </div>
        </div>

        <div className="inputGroup">
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="textarea"
            placeholder="Leave a comment..."
          />
        </div>

        <button type="submit" className="button">
          Submit Feedback
        </button>
      </form>

      {submitted && (
        <div className="popup">
          <div className="popup-content">
            <h3>Thank you for your feedback!</h3>
            <button className="close-button" onClick={closePopup}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default FeedbackForm;
