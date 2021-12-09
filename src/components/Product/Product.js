import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CButton,
  CRow,
  CSpinner,
} from "@coreui/react";
import React, { useEffect, useState, useCallback } from "react";

import CIcon from "@coreui/icons-react";
import { Link } from "react-router-dom";
import { getAuthen } from "../../services/network";
import { useSelector } from "react-redux";
import Modals from "src/components/Modal/DeleteModal";

const Product = () => {
  const user = useSelector((state) => state.user);
  const [products, setProducts] = useState();
  const [modal, setModal] = useState(false);
  const [eachItem, setEachItem] = useState({});
  const [loading, setLoading] = useState(true);

  const getProduct = useCallback(() => {
    getAuthen(`/product/getByUserId/${user.id}`).then((res) => {
      setProducts(res.data);
      setLoading(false);
    });
  }, [user?.id]);

  const deleteItem = (item) => {
    setEachItem(item);
    setModal((modal) => !modal);
  };

  const onDeletePress = () => {
    setModal(false);
    getProduct();
  };

  useEffect(() => {
    getProduct();
  }, [getProduct, user, user.id]);

  return (
    <>
      <Modals item={eachItem} isOpen={modal} onDeletePress={onDeletePress} />

      <CRow>
        <CCol>
          <CCard>
            <CCardHeader className="product-header">
              <div>Product</div>
              <div className="product-header-button">
                <Link to="/products/add">
                  <CButton color="success" size="sm">
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
                  {loading ? (
                    <div className="d-flex justify-content-between align-items-center p-4">
                      <CSpinner color="success" size="lg" />
                    </div>
                  ) : (
                    products?.map((item, index) => {
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
                              <Link to={`/products/${item?.id}`}>
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
                    })
                  )}
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
