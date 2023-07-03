import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { deleteTrailThunk } from "../../store/trails";
import { getCurrentTrailsThunk } from "../../store/trails";

const DeleteTrailModal = ({ trailId, setDeleted }) => {
  //initialize things
  const { closeModal } = useModal();
  const dispatch = useDispatch();

  //dispatch thunk to delete trail
  const deleteTrail = (e) => {
    dispatch(deleteTrailThunk(trailId))
      .then(dispatch(getCurrentTrailsThunk()))
      .then(closeModal)
      .then(setDeleted(true));
  };

  return (
    <div className="delete-modal-container">
      <div className="delete-modal-contents">
        <h2 className="delete-modal-header">
          Are you sure you want to delete this trail?
        </h2>
        <div className="delete-button-container">
          <button className="delete-yes-button" onClick={deleteTrail}>
            Yes
          </button>
          <button className="delete-cancel-button" onClick={closeModal}>
            Cancel
          </button>
        </div>
      </div>
    </div>
    // <div>
    //   <h2>Confirm Delete</h2>
    //   <button onClick={deleteTrail}>Yes</button>
    //   <button onClick={closeModal}>Cancel</button>
    // </div>
  );
};

export default DeleteTrailModal;
