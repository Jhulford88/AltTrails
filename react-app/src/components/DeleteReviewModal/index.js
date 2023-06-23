import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { getCurrentTrailsThunk } from "../../store/trails";
import { deleteReviewThunk } from "../../store/trails";
import "./deleteReviewModal.css";

const DeleteReviewModal = ({ reviewId }) => {
  //Initialize things
  const { closeModal } = useModal();
  const dispatch = useDispatch();

  //Dispatch thunk to delete review
  const deleteReview = (e) => {
    dispatch(deleteReviewThunk(reviewId))
      .then(dispatch(getCurrentTrailsThunk()))
      .then(closeModal);
  };

  return (
    <div className="delete-modal-container">
      <div className="delete-modal-contents">
        <h2 className="delete-modal-header">
          Are you sure you want to delete your review?
        </h2>
        <div className="delete-button-container">
          <button className="delete-yes-button" onClick={deleteReview}>
            Yes
          </button>
          <button className="delete-cancel-button" onClick={closeModal}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteReviewModal;
