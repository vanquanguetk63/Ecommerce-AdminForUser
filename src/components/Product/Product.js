import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CButton,
  CRow,
} from "@coreui/react";
import React, { useEffect, useState } from "react";
import "./Products.css";

import CIcon from "@coreui/icons-react";
import { Link } from "react-router-dom";

const Product = () => {
  const [addNewProduct, setAddNewProduct] = useState(false);

  useEffect(() => {
    console.log(addNewProduct);
  }, [addNewProduct]);

  return (
    <>
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
                    onClick={() => setAddNewProduct((p) => !p)}
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
                  <tr>
                    <td>
                      <div>1</div>
                    </td>
                    <td>
                      <div>Laptop Lenovo</div>
                    </td>
                    <td className="text-center">
                      {/* <div className="c-avatar"> */}
                      <img
                        src={
                          "https://hc.com.vn/i/ecommerce/media/GS.007601_FEATURE_79449.jpg"
                        }
                        // className="c-avatar-img"
                        alt="admin@bootstrapmaster.com"
                        className="product-image"
                      />
                      {/* <span className="c-avatar-status bg-success"></span> */}
                      {/* </div> */}
                    </td>
                    <td>
                      <div>
                        Thương hiệu: Lenovo Model: LENOVO IDP5 14ITL05
                        82FE000GVN Mã SP: GS.007601
                      </div>
                    </td>

                    <td>
                      <div>$2000.00</div>
                    </td>
                    <td>
                      <div>Laptop</div>
                    </td>
                    <td className="text-center">
                      <div className="product-action">
                        <Link to="/products/1">
                          <CIcon
                            name="cil-pencil"
                            style={{ marginRight: 16 }}
                          />
                        </Link>
                        {/* <Link> */}
                        <CIcon name="cil-delete" />
                        {/* </Link> */}
                      </div>
                    </td>
                  </tr>
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
