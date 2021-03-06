import React, { useState, useEffect } from "react";
import {
  CButton,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CSpinner,
} from "@coreui/react";
import { deleteServices } from "src/services/network";

const Modal = ({ item, isOpen, onDeletePress, onClose }) => {
  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const deleteItem = async () => {
    setLoading(true);
    await deleteServices(`/product/removeProduct/${item?.id}`).then((res) => {
      setLoading(false);
      onDeletePress();
      onClose();
    });
  };

  useEffect(() => {
    setModal(isOpen);
  }, [isOpen]);

  return (
    <CModal show={modal} onClose={setModal}>
      <CModalHeader closeButton>
        <CModalTitle>Delete Product</CModalTitle>
      </CModalHeader>
      <CModalBody>Do you agree to delete {item?.productName}?</CModalBody>
      <CModalFooter>
        <CButton color="danger" onClick={deleteItem}>
          {loading ? <CSpinner size="sm" /> : "Delete"}
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

export default Modal;
