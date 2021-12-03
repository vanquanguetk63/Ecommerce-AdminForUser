import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CButton,
  CRow,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
} from "@coreui/react";
import React, { useEffect, useState } from "react";
import "./Products.css";

import CIcon from "@coreui/icons-react";
import { Link } from "react-router-dom";
import { getAuthen } from "../../services/network";
import { useSelector } from "react-redux";
import Modals from "src/components/Modal/Modal";

const Product = () => {
  const user = useSelector((state) => state.user);
  const [products, setProducts] = useState();
  const [modal, setModal] = useState(false);
  const [eachItem, setEachItem] = useState({});

  const deleteItem = (item) => {
    setEachItem(item);
    setModal((modal) => !modal);
  };

  const onDeletePress = () => {
    setModal(false);
  };

  useEffect(() => {
    getAuthen(`/product/getByUserId/${user?.id}`).then((res) => {
      setProducts(res.data);
    });
  }, [user, user?.id]);

  return (
    <>
      {/* <Modals /> */}
      {/* <CModal show={modal} onClose={setModal}>
        <CModalHeader closeButton>
          <CModalTitle>Delete Product</CModalTitle>
        </CModalHeader>
        <CModalBody>Do you agree to delete {item?.productName}?</CModalBody>
        <CModalFooter>
          <CButton color="primary">Do Something</CButton>{" "}
          <CButton color="secondary" onClick={() => setModal(false)}>
            Cancel
          </CButton>
        </CModalFooter>
      </CModal> */}
      <Modals item={eachItem} isOpen={modal} onDeletePress={onDeletePress} />

      <CRow>
        <CCol>
          <CCard>
            <CCardHeader className="product-header">
              <div>Product</div>
              <div className="product-header-button">
                <Link to="/products/add">
                  <CButton
                    color="success"
                    size="sm"
                    // onClick={() => setAddNewProduct((p) => !p)}
                  >
                    <CIcon name="cil-plus" /> Add New Product
                  </CButton>
                </Link>
              </div>
            </CCardHeader>
            <CCardBody>
              <table className="table table-hover table-outline mb-0 d-none d-sm-table">
                <thead className="thead-light">
                  <tr>
                    <th>Index</th>
                    <th>Name</th>
                    <th className="text-center">Image</th>
                    <th>Description</th>
                    <th>Price</th>
                    <th>Category</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {products?.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td>
                          <div>{index + 1}</div>
                        </td>
                        <td>
                          <div>{item?.productName}</div>
                        </td>
                        <td className="text-center">
                          <img
                            src={item?.productImage}
                            alt="admin@bootstrapmaster.com"
                            className="product-image"
                          />
                        </td>
                        <td>
                          <div>
                            Thương hiệu: Lenovo Model: LENOVO IDP5 14ITL05
                            82FE000GVN Mã SP: GS.007601
                          </div>
                        </td>

                        <td>
                          <div>{item?.productPrice}</div>
                        </td>
                        <td>
                          <div>{item?.category?.categoryName}</div>
                        </td>
                        <td className="text-center">
                          <div className="product-action">
                            <Link to="/products/1">
                              <CIcon
                                name="cil-pencil"
                                style={{ marginRight: 16 }}
                              />
                            </Link>
                            <a onClick={() => deleteItem(item)}>
                              <CIcon name="cil-delete" />
                            </a>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  );
};

export default Product;
