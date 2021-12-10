import React, { useState, useEffect } from "react";
import {
  CButton,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
} from "@coreui/react";
import { deleteServices } from "src/services/network";

const Modal = ({ item, isOpen, onDeletePress }) => {
  const [modal, setModal] = useState(false);

  const deleteItem = async () => {
    await deleteServices(`/product/removeProduct/${item?.id}`).then((res) => {
      onDeletePress();
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
          Delete
        </CButton>
        <CButton color="secondary" onClick={() => setModal(false)}>
          Cancel
        </CButton>
      </CModalFooter>
    </CModal>
  );
};

export default Modal;
