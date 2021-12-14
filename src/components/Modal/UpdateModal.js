import React, { useState, useEffect } from "react";
import {
  CButton,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
} from "@coreui/react";

const UpdateModal = ({ item, isOpen, onUpdatePress, onClose }) => {
  const [modal, setModal] = useState(false);

  const addItem = async () => {
    setModal(false);
    onUpdatePress();
  };

  useEffect(() => {
    setModal(isOpen);
  }, [isOpen, item]);

  return (
    <CModal show={modal} onClose={setModal}>
      <CModalHeader closeButton>
        <CModalTitle>Update Order</CModalTitle>
      </CModalHeader>
      <CModalBody>Do you wanna confirm to update order: {item?.id}?</CModalBody>
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

export default UpdateModal;
