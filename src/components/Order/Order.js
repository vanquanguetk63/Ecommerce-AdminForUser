import React, { useState, useCallback, useEffect } from "react";

import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CSpinner,
} from "@coreui/react";
import { useSelector } from "react-redux";
import { getAuthen } from "src/services/network";
// import CIcon from "@coreui/icons-react";
import OrderDetail from "./OrderDetail";

const Order = () => {
  const user = useSelector((state) => state.user);
  const [products, setProducts] = useState();
  // const [modal, setModal] = useState(false);
  // const [eachItem, setEachItem] = useState({});
  const [loading, setLoading] = useState(true);

  const getProduct = useCallback(() => {
    if (user?.id) {
      getAuthen(`/order/getOrderBySellerId/${user?.id}`).then((res) => {
        setProducts(res.data);
        setTimeout(() => setLoading(false), 200);
      });
    }
  }, [user?.id]);

  useEffect(() => {
    getProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, user.id]);

  return (
    <CRow>
      <CCol>
        <CCard>
          <CCardHeader className="product-header">
            <div>All Order</div>
          </CCardHeader>
          <CCardBody style={{ backgroundColor: "rgba(0,0,0,.03)" }}>
            {loading ? (
              <div className="d-flex justify-content-between align-items-center p-4">
                <CSpinner color="success" size="lg" />
              </div>
            ) : (
              products?.map((item, index) => (
                <OrderDetail key={index} item={item} />
              ))
            )}
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default Order;
