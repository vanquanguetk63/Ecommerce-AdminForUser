import React, { useState} from 'react';
import {
    CModal,
    CModalHeader,
    CModalBody,
    CModalFooter,
    CButton,
    CModalTitle
  } from "@coreui/react";


const ModalAddNewProduct = ({ visible }) => {
    console.log("1....", visible);
    return (
      <>
        <CModal alignment="center" visible={visible} >
          <CModalHeader>
            <CModalTitle>Modal title</CModalTitle>
          </CModalHeader>
          <CModalBody>
            Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in,
            egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
          </CModalBody>
          <CModalFooter>
            <CButton color="secondary">
              Close
            </CButton>
            <CButton color="primary">Save changes</CButton>
          </CModalFooter>
        </CModal>
      </>
    )
};

export default ModalAddNewProduct;