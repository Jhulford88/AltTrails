import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./collectionModal.css";

const CollectionModal = ({ trailId }) => {
  //initialize things
  const { closeModal } = useModal();
  const dispatch = useDispatch();

  //State
  const [collectionName, setCollectionName] = useState();
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    //Frontend form validation
    const newErrors = {};
    if (collectionName.length > 55)
      newErrors["collectionName"] =
        "Collection name must be 55 characters or less!";
    if (collectionName.length < 1)
      newErrors["collectionName"] = "Collection name is required!";

    setErrors(newErrors);
    if (Object.keys(newErrors).length) return;

    // Fetch to post new trail
    const res = await fetch(`/api/collections/new`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        collectionName,
        trailId,
      }),
    });
  };

  return (
    <div className="collection-modal-parent-container">
      <div className="add-to-new">
        <h2>Add trail to a new collection</h2>
        <form className="create-collection-form" onSubmit={handleSubmit}>
          <label>
            Collection Name{" "}
            <span className="errors">
              {errors.collectionName ? errors.collectionName : null}
            </span>
            <input
              type="text"
              value={collectionName}
              placeholder="Collection Name"
              onChange={(e) => setCollectionName(e.target.value)}
            />
          </label>
          <button className="create-collection-button" type="submit">
            Create Collection
          </button>
        </form>
      </div>
    </div>
  );
};

export default CollectionModal;
