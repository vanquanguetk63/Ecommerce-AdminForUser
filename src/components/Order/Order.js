import React, { useState, useCallback, useEffect } from "react";

import { CCard, CCardBody, CCardHeader, CCol, CRow, CImg } from "@coreui/react";
import { useSelector } from "react-redux";
import { getAuthen } from "src/services/network";
import CIcon from "@coreui/icons-react";

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
          <CCardBody style={{ backgroundColor: "rgba(0,0,0,.03)" }}>
            <CCard style={{ fontSize: 14 }}>
              <CCardHeader
                className="product-header"
                style={{ backgroundColor: "#FFFFFF" }}
              >
                <div style={{ fontWeight: "bold" }}>Order Id: 1</div>
                <div>
                  <CIcon
                    name="cil-truck"
                    style={{ color: "#00bfa5", marginRight: 8 }}
                  />
                  Status
                </div>
              </CCardHeader>
              <CCardBody>
                <CRow>
                  <CCol xs={{ size: 2 }}>
                    <CImg
                      src="https://cf.shopee.vn/file/9e42752c9f0e718d067aaa30063258a5"
                      fluidGrow
                      style={{
                        borderWidth: 1,
                        borderColor: "#e1e1e1",
                        borderStyle: "solid",
                        // backgroundColor: "red",
                      }}
                    />
                  </CCol>
                  <CCol xs={{ size: 8 }}>
                    <div>
                      [ Sạc Pin 1 Năm 2 lần ] Cân Điện Tử Sạc USB Padabanic Cân
                      Sức Khỏe Gia Đình Chuẩn Xác Hiển Thị Nhiệt Độ Phòng
                    </div>
                    <div>Phân loại hàng: 1000Đen sạcUSB+Thước</div>
                    <div>x1</div>
                  </CCol>
                  <CCol
                    xs={{ size: 2 }}
                    className="d-flex flex-row justify-content-center align-items-center"
                  >
                    <div>
                      <span>₫168.000</span>
                      <span> ₫135.000</span>
                    </div>
                  </CCol>
                </CRow>
              </CCardBody>
            </CCard>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default Order;
