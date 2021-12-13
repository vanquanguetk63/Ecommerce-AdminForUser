import React, { useState, useEffect } from "react";
import {
  CButton,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
} from "@coreui/react";

const NotyModal = ({ isOpen, message, onClose }) => {
  const [modal, setModal] = useState(false);

  const addItem = async () => {
    setModal(false);
    onClose();
  };

  useEffect(() => {
    setModal(isOpen);
  }, [isOpen, message]);

  return (
    <CModal show={modal} onClose={setModal}>
      <CModalHeader closeButton>
        <CModalTitle>Succesfully</CModalTitle>
      </CModalHeader>
      <CModalBody>{message}</CModalBody>
      <CModalFooter>
        <CButton color="primary" onClick={addItem}>
          Done
        </CButton>
      </CModalFooter>
    </CModal>
  );
};

export default NotyModal;
