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
import { post } from "src/services/network";

const UpVoteModal = ({ item, isOpen, onUpvotePress, onClose }) => {
  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const addItem = async () => {
    setLoading(true);
    await post(`/product/requestUpdateRate/${item?.id}`).then((res) => {
      setLoading(false);
      setModal(false);
      onClose(res?.messageResponse?.message);
    });
  };

  useEffect(() => {
    setModal(isOpen);
  }, [isOpen, item]);

  return (
    <CModal show={modal} onClose={setModal}>
      <CModalHeader closeButton>
        <CModalTitle>Upvote Product</CModalTitle>
      </CModalHeader>
      <CModalBody className="d-ll">
        Do you wanna confirm to upvote {item?.productName}?
      </CModalBody>
      <CModalFooter>
        <CButton color="primary" onClick={addItem}>
          {loading ? <CSpinner size="sm" /> : "Upvote"}
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

export default UpVoteModal;
