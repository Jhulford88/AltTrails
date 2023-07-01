import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { deleteCollectionThunk } from "../../store/collections";
import "./deleteCollectionModal.css";

const DeleteCollectionModal = ({ collectionId, setDeleted }) => {
  //Initialize things
  const { closeModal } = useModal();
  const dispatch = useDispatch();

  //Dispatch thunk to delete collection
  const deleteCollection = (e) => {
    dispatch(deleteCollectionThunk(collectionId))
      .then(setDeleted(true))
      .then(closeModal);
  };

  return (
    <div className="delete-modal-container">
      <div className="delete-modal-contents">
        <h2 className="delete-modal-header">
          Are you sure you want to delete this collection?
        </h2>
        <div className="delete-button-container">
          <button className="delete-yes-button" onClick={deleteCollection}>
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

export default DeleteCollectionModal;
