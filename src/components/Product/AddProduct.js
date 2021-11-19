import React from "react";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CLabel,
  CInput,
  CTextarea,
  CImg,
  CSelect,
  CButton,
} from "@coreui/react";

import UploadImage from "../../assets/images/upload-image.png";

// import "../../assets/images/upload-image.png"
const AddProduct = () => {
  return (
    <CRow>
      <CCol>
        <CCard>
          <CCardHeader>
            <div>Add New Product</div>
          </CCardHeader>
          <CCardBody>
            <CRow>
              <CCol xs={{ size: 6 }}>
                <div className="mb-3">
                  <CLabel>Product Name</CLabel>
                  <CInput placeholder="Product's Name" />
                </div>
                <div className="mb-3">
                  <CLabel>Price</CLabel>
                  <CCol xs={{ size: 3 }} className="pl-0">
                    <CInput placeholder="Price" />
                  </CCol>
                </div>
                <div className="mb-3">
                  <CLabel>Description</CLabel>
                  <CTextarea placeholder="Description" rows="3" />
                </div>
                <div className="mb-3">
                  <CLabel>Category</CLabel>
                  <CCol xs={{ size: 6 }} className="pl-0">
                    <CSelect
                      size="sm"
                      className="mb-3"
                      aria-label="Small select example"
                    >
                      <option>Open this select menu</option>
                      <option value="1">One</option>
                      <option value="2">Two</option>
                      <option value="3">Three</option>
                    </CSelect>
                  </CCol>
                </div>
              </CCol>
              <CCol xs={{ size: 6 }} className="text-center">
                <div className="mb-3">
                  <CImg
                    align="center"
                    src={UploadImage}
                    width={300}
                    height={200}
                  />
                </div>
                <div className="d-grid gap-2">
                  <CButton size="lg" color="primary">
                    UPLOAD PRODUCT IMAGE
                  </CButton>
                </div>
              </CCol>
            </CRow>
            <div className="d-grid gap-2">
              <CButton size="lg" color="primary">
                ADD NEW PRODUCT
              </CButton>
            </div>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default AddProduct;
