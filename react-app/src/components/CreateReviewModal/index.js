import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { postNewReviewThunk } from "../../store/trails";
import "./createReviewModal.css";

const CreateReviewModal = ({ trailId, setReview }) => {
  //initialize things
  const { closeModal } = useModal();
  const dispatch = useDispatch();

  //slices of state
  const [reviewText, setReviewText] = useState("");
  const [starRating, setStarRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    //frontend form validation
    const newErrors = {};
    if (reviewText.length < 1)
      newErrors["reviewText"] = "Review text is required!";
    if (starRating < 1) newErrors["starRating"] = "Star rating is required!";

    setErrors(newErrors);
    if (Object.keys(newErrors).length) return;

    await dispatch(postNewReviewThunk(formData, trailId))
      .then(setReview(true))
      .then(closeModal);
  };

  // Build up form data
  const formData = new FormData();
  formData.append("review_text", reviewText);
  formData.append("star_rating", starRating);
  formData.append("trail_id", trailId);

  // Log our form data
  console.log("Form Data gathered from form:");
  for (let key of formData.entries()) {
    console.log(key[0] + " ----> " + key[1]);
  }

  return (
    <div className="review-form-container">
      <div className="errors">
        {errors.reviewText ? errors.reviewText : null}
      </div>
      <div className="errors">
        {errors.starRating ? errors.starRating : null}
      </div>
      <div className="review-form-header">
        Tell everyone about your experience!
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
          <span className="stars-word">Stars</span>
          <br className="break"></br>
          <button className="review-submit-button" type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateReviewModal;
