import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { getSingleTrailThunk, updateReviewThunk } from "../../store/trails";
import "./updateReviewModal.css";

const UpdateReviewModal = ({ review }) => {
  //Initialize things
  const { closeModal } = useModal();
  const dispatch = useDispatch();

  //State
  const [reviewText, setReviewText] = useState(review?.reviewText || "");
  const [starRating, setStarRating] = useState(review?.starRating || 0);
  const [hover, setHover] = useState(review?.starRating || 0);
  const [errors, setErrors] = useState({});

  //Dispatch thunk to update review
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(updateReviewThunk(formData, review.trailId, review.id))
      .then(dispatch(getSingleTrailThunk(review.trailId)))
      .then(closeModal);
  };

  // Build up form data before sending
  const formData = new FormData();
  formData.append("review_text", reviewText);
  formData.append("star_rating", starRating);
  formData.append("trail_id", review.trailId);

  // Log our form data
  // console.log("Form Data gathered from form:");
  // for (let key of formData.entries()) {
  //   console.log(key[0] + " ----> " + key[1]);
  // }

  return (
    <div className="review-form-container">
      <div className="errors">
        {errors.reviewText ? errors.reviewText : null}
      </div>
      <div className="errors">
        {errors.starRating ? errors.starRating : null}
      </div>
      <form className="review-form" onSubmit={handleSubmit}>
        <textarea
          type="text"
          value={reviewText}
          placeholder="Leave your review here..."
          onChange={(e) => setReviewText(e.target.value)}
          rows="5"
          cols="50"
          className="review-form-textarea"
        ></textarea>
        <div className="star-rating">
          {[1, 2, 3, 4, 5].map((star, index) => {
            index += 1;
            return (
              <button
                id="star-button"
                type="button"
                key={index}
                className={index <= (hover || starRating) ? "on" : "off"}
                onClick={() => setStarRating(index)}
                onMouseEnter={() => setHover(index)}
                onMouseLeave={() => setHover(starRating)}
              >
                <span className="star">
                  <i className="fa-solid fa-star"></i>
                </span>
              </button>
            );
          })}
          <br className="break"></br>
          <span className="stars">Stars</span>
        </div>
        <button className="review-submit-button" type="submit">
          Update
        </button>
      </form>
    </div>
  );
};

export default UpdateReviewModal;
