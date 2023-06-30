import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { getCurrentCollectionsThunk } from "../../store/collections";
import "./collectionModal.css";

const CollectionModal = ({ trailId }) => {
  //initialize things
  const { closeModal } = useModal();
  const dispatch = useDispatch();

  //useSelectors
  const userCollections = useSelector(
    (state) => state.collections.userCollections
  );

  //State
  const [collectionName, setCollectionName] = useState();
  const [collectionId, setCollectionId] = useState();
  const [errors, setErrors] = useState({});

  //Dispatch thunk to get users collections
  useEffect(() => {
    dispatch(getCurrentCollectionsThunk());
  }, [dispatch]);

  const newHandleSubmit = async (e) => {
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

  const addHandleSubmit = async (e) => {
    e.preventDefault();

    //Frontend form validation
    const newErrors = {};
    // if (collectionName.length > 55)
    //   newErrors["collectionName"] =
    //     "Collection name must be 55 characters or less!";

    setErrors(newErrors);
    if (Object.keys(newErrors).length) return;

    // Fetch to post new trail
    const res = await fetch(`/api/collections/add`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        collectionId,
        trailId,
      }),
    });
  };

  return (
    <div className="collection-modal-parent-container">
      <div className="add-to-new">
        <h2>Add trail to a new collection</h2>
        <form className="create-collection-form" onSubmit={newHandleSubmit}>
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
      <div className="add-to-existing">
        <form className="add-collection-form" onSubmit={addHandleSubmit}>
          <label>
            Select Collection <span className="errors"></span>
            <select
              value={collectionId}
              onChange={(e) => setCollectionId(e.target.value)}
            >
              <option default>Select a Collection</option>
              {userCollections &&
                Object.values(userCollections).map((collection) => (
                  <option key={collection.id} value={collection.id}>
                    {collection.name}
                  </option>
                ))}
            </select>
          </label>
          <button className="add-collection-button" type="submit">
            Add Trail
          </button>
        </form>
      </div>
    </div>
  );
};

export default CollectionModal;
