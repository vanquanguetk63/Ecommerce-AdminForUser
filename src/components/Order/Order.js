import React from "react";

import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CButton,
  CRow,
} from "@coreui/react";
import { Link } from "react-router-dom";
import CIcon from "@coreui/icons-react";

const Order = () => {
  return (
    <CRow>
      <CCol>
        <CCard>
          <CCardHeader className="product-header">
            <div>Order</div>
            {/* <div className="product-header-button">
              <Link to="/products/add">
                <CButton
                  color="success"
                  size="sm"
                  // onClick={() => setAddNewProduct((p) => !p)}
                >
                  <CIcon name="cil-plus" /> Add New Product
                </CButton>
              </Link>
            </div> */}
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
                {/* {products?.map((item, index) => {
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
                })} */}
              </tbody>
            </table>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default Order;