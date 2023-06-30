import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./collectionModal.css";

const CollectionModal = () => {
  //initialize things
  const { closeModal } = useModal();
  const dispatch = useDispatch();

  return <h1>Hello from collection modal</h1>;
};

export default CollectionModal;
