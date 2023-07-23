import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { getCurrentCollectionsThunk } from "../../store/collections";
import "./collectionModal.css";

const CollectionModal = ({ trailId }) => {
  //initialize things
  const { closeModal } = useModal();
  const dispatch = useDispatch();
  let history = useHistory();

  //useSelectors
  const userCollections = useSelector(
    (state) => state.collections.userCollections
  );

  //State
  const [collectionName, setCollectionName] = useState("");
  const [collectionId, setCollectionId] = useState();
  const [errors, setErrors] = useState({});

  //Dispatch thunk to get users collections
  useEffect(() => {
    dispatch(getCurrentCollectionsThunk());
  }, [dispatch]);

  //handles adding a trail to a new collection
  const newHandleSubmit = async (e) => {
    e.preventDefault();

    //Frontend form validation
    const newErrors = {};
    if (collectionName?.length > 55)
      newErrors["collectionName"] =
        "Collection name must be 55 characters or less!";
    if (collectionName?.length < 1)
      newErrors["collectionName"] = "Collection name is required!";
    if (
      Object.values(userCollections).filter(
        (collection) => collection.name === collectionName
      ).length
    )
      newErrors["collectionName"] =
        "Collection name already exists! Please pick a different name!";

    setErrors(newErrors);
    if (Object.keys(newErrors)?.length) return;

    // Fetch to post trail to new collection
    const res = await fetch(`/api/collections/new`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        collectionName,
        trailId,
      }),
    });
    let newCollection = await res.json();
    history.push(`/collections/${newCollection.collectionId}`);
    closeModal();
  };

  //Handles adding a trail to an existing collection
  const addHandleSubmit = async (e) => {
    e.preventDefault();

    //Frontend form validation
    const newErrors = {};
    if (!collectionId)
      newErrors["collection"] = "Please select a collection to add to!";
    setErrors(newErrors);
    if (Object.keys(newErrors)?.length) return;

    // Fetch to post trail to existing collection
    const res = await fetch(`/api/collections/add`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        collectionId,
        trailId,
      }),
    })
      .then(history.push(`/collections/${collectionId}`))
      .then(closeModal);
  };

  return (
    <div className="collection-modal-parent-container">
      <div className="add-to-new">
        <h2 className="collection-form-headers">
          Add trail to a new collection
        </h2>
        <form className="create-collection-form" onSubmit={newHandleSubmit}>
          <label className="form-labels">
            Collection Name{" "}
            <span className="errors">
              {errors.collectionName ? errors.collectionName : null}
            </span>
            <input
              className="add-to-new-input"
              type="text"
              value={collectionName}
              onChange={(e) => setCollectionName(e.target.value)}
            />
          </label>
          <br className="break"></br>
          <div className="create-collection-button-container">
            <button className="create-collection-button" type="submit">
              Create Collection
            </button>
          </div>
        </form>
      </div>
      <hr className="bar" />
      <div className="add-to-existing">
        <h2 className="existing-collection-form-headers">
          Add trail to an existing collection
        </h2>
        <form className="add-collection-form" onSubmit={addHandleSubmit}>
          <label className="form-labels">
            Select Collection{" "}
            <span className="errors">
              {errors.collection ? errors.collection : null}
            </span>
            <select
              className="add-to-existing-select"
              value={collectionId}
              onChange={(e) => setCollectionId(e.target.value)}
            >
              <option default>Collections</option>
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
