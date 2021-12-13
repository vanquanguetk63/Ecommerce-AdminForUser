import React, { useState, useEffect } from "react";
import {
  CButton,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
} from "@coreui/react";

const EditModal = ({ item, isOpen, onAddPress, onClose }) => {
  const [modal, setModal] = useState(false);

  const addItem = async () => {
    setModal(false);
    onAddPress();
  };

  useEffect(() => {
    setModal(isOpen);
  }, [isOpen, item]);

  return (
    <CModal show={modal} onClose={setModal}>
      <CModalHeader closeButton>
        <CModalTitle>Update Product</CModalTitle>
      </CModalHeader>
      <CModalBody>Do you wanna confirm to add {item?.product_name}?</CModalBody>
      <CModalFooter>
        <CButton color="primary" onClick={addItem}>
          Update
        </CButton>
        <CButton
          color="secondary"
          onClick={() => {
            setModal(false);
            onClose();
          }}
        >
          Cancel
        </CButton>
      </CModalFooter>
    </CModal>
  );
};

export default EditModal;
