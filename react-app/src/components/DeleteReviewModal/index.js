import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { useHistory } from 'react-router-dom';
import { deleteTrailThunk } from "../../store/trails";
import { getCurrentTrailsThunk } from "../../store/trails";
import './deleteReviewModal.css'
import { deleteReviewThunk } from "../../store/trails";


const DeleteReviewModal = ({reviewId}) => {

    //initialize things
    const { closeModal } = useModal()
    const dispatch = useDispatch()
    const history = useHistory()


    const deleteReview = (e) => {
        dispatch(deleteReviewThunk(reviewId))
          .then(dispatch(getCurrentTrailsThunk()))
          .then(closeModal)
      }


      return (
        <div >
          <h2>Confirm Delete</h2>
          <button onClick={deleteReview}>Yes</button>
          <button onClick={closeModal}>Cancel</button>
        </div>
      )

}

export default DeleteReviewModal
