import React, { useState, useCallback, useEffect } from "react";

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
import { useSelector } from "react-redux";
import { getAuthen } from "src/services/network";

const Order = () => {
  const user = useSelector((state) => state.user);
  const [products, setProducts] = useState();
  const [modal, setModal] = useState(false);
  const [eachItem, setEachItem] = useState({});
  const [loading, setLoading] = useState(true);

  const getProduct = useCallback(() => {
    if (user?.id) {
      getAuthen(`/order/getOrderBySellerId/${user?.id}`).then((res) => {
        setProducts(res.data);
        setLoading(false);
      });
    }
  }, [user?.id]);

  useEffect(() => {
    console.log("useer", user.id);
    getProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, user.id]);

  return (
    <CRow>
      <CCol>
        <CCard>
          <CCardHeader className="product-header">
            <div>Order</div>
          </CCardHeader>
          <CCardBody>
            <table className="table table-hover table-outline mb-0 d-none d-sm-table">
              <thead className="thead-light">
                <tr>
                  <th>Index</th>
                  <th>Receiver</th>
                  <th>Address</th>
                  <th>Phone</th>
                  <th>Quantity Order</th>
                  <th>Payment Method</th>
                  <th>Price</th>
                  <th>Status</th>
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
                        <div>{item?.shipAddress?.nameReceiver}</div>
                      </td>
                      <td>
                        <div>{item?.shipAddress?.phoneNumber}</div>
                      </td>

                      <td>
                        <div>
                          {[
                            item?.shipAddress?.streetAddress,
                            item?.shipAddress?.city,
                          ].join(", ")}
                        </div>
                      </td>
                      <td>
                        <div>{item?.orderDetails?.length}</div>
                      </td>
                      <td>
                        <div>{item?.payment?.paymentMethod}</div>
                      </td>
                      <td>
                        <div>{item?.productPrice}</div>
                      </td>
                      <td>
                        {/* <div className="product-action">
                          <Link to={`/products/${item?.id}`}>
                            <CIcon
                              name="cil-pencil"
                              style={{ marginRight: 16 }}
                            />
                          </Link>
                          <a onClick={() => deleteItem(item)}>
                            <CIcon name="cil-delete" />
                          </a>
                        </div> */}
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
  );
};

export default Order;
