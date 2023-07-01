import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { deleteFromCollectionThunk } from "../../store/collections";
import "./deleteFromCollectionModal.css";

const DeleteFromCollectionModal = ({ collectionId, trailId, setDeleted }) => {
  //Initialize things
  const { closeModal } = useModal();
  const dispatch = useDispatch();

  //Dispatch thunk to delete collection
  const deleteFromCollection = (e) => {
    console.log("collectionId in modal..........", collectionId);
    console.log("trailId in modal..........", trailId);
    dispatch(deleteFromCollectionThunk(collectionId, trailId))
      .then(setDeleted(true))
      .then(closeModal);
  };

  return (
    <div className="delete-modal-container">
      <div className="delete-modal-contents">
        <h2 className="delete-modal-header">
          Are you sure you want to delete this trail from your collection?
        </h2>
        <div className="delete-button-container">
          <button className="delete-yes-button" onClick={deleteFromCollection}>
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

export default DeleteFromCollectionModal;
