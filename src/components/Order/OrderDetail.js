import React, { useEffect, useState, useMemo } from "react";
import {
  CCol,
  CRow,
  CImg,
  CCard,
  CCardHeader,
  CCardBody,
  CCardFooter,
  CDropdown,
  CDropdownToggle,
  CDropdownMenu,
  CDropdownItem,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { numberWithCommas } from "src/lib";
import { get } from "src/services/network";

const OrderDetail = ({ item }) => {
  // const [loadmore, setLoadmore] = useState(false);
  const [category, setCategory] = useState();

  const totalAmount = useMemo(
    () =>
      item?.orderDetails
        ?.map((item) => item?.total)
        ?.reduce((prev, curr) => prev + curr, 0),
    [item?.orderDetails]
  );

  useEffect(() => {
    get("/category/getAllCategory").then((res) => {
      const reduceRes = res?.data?.reduce(
        (prev, next) => ({
          ...prev,
          [next?.id]: next?.categoryName,
        }),
        {}
      );
      setCategory(reduceRes);
    });
  }, []);

  return (
    <CCard style={{ fontSize: 14 }}>
      <CCardHeader
        className="product-header"
        style={{ backgroundColor: "#FFFFFF" }}
      >
        <div style={{ fontWeight: "bold" }}>Order Id: {item?.id}</div>
        {/* <div>
          <CIcon
            name="cil-truck"
            style={{ color: "#00bfa5", marginRight: 8 }}
          />
          Status: {item?.statusOrder?.name}
        </div> */}

        <CDropdown className="mt-2">
          <CDropdownToggle caret color="info">
            Shipping Status
          </CDropdownToggle>
          <CDropdownMenu>
            <CDropdownItem>Packaging</CDropdownItem>
            <CDropdownItem>Shipping</CDropdownItem>
            <CDropdownItem>Received</CDropdownItem>
          </CDropdownMenu>
        </CDropdown>
      </CCardHeader>
      <CCardBody>
        <CRow
          style={{
            borderBottomWidth: 1,
            borderColor: "rgba(0,0,0,.125)",
            borderBottomStyle: "solid",
          }}
        >
          <CCol xs={2}>
            <p style={{ fontSize: 16, fontWeight: "700" }}>Receiver Address:</p>
          </CCol>
          <CCol xs={10}>
            <p style={{ fontSize: 14 }}>{item?.shipAddress?.nameReceiver}</p>
            <p style={{ fontSize: 14 }}>{item?.shipAddress?.phoneNumber}</p>
            <p style={{ fontSize: 14 }}>
              {[
                item?.shipAddress?.streetAddress,
                item?.shipAddress?.city,
              ]?.join(", ")}
            </p>
          </CCol>
        </CRow>
        {item?.orderDetails?.map((eachItem, index) => (
          <CRow
            className="order-detail"
            style={{ marginTop: 16, marginBottom: 16, cursor: "pointer" }}
            key={index}
          >
            <CCol xs={{ size: 2 }}>
              <CImg
                src={
                  eachItem?.productImage ||
                  "https://cf.shopee.vn/file/9e42752c9f0e718d067aaa30063258a5"
                }
                fluidGrow
                style={{
                  borderWidth: 1,
                  borderColor: "#e1e1e1",
                  borderStyle: "solid",
                }}
              />
            </CCol>
            <CCol xs={{ size: 8 }}>
              <div className="title">
                <p>{eachItem?.productName}</p>
              </div>
              {/* <div>Phân loại hàng: {category?.[eachItem?.]}</div> */}
              <div>x {eachItem?.productQuantity}</div>
            </CCol>
            <CCol
              xs={{ size: 2 }}
              className="d-flex flex-row justify-content-center align-items-center"
            >
              <div>
                <span> {numberWithCommas(eachItem?.total)} VND</span>
              </div>
            </CCol>
          </CRow>
        ))}
      </CCardBody>
      <CCardFooter>
        <CRow className="order-detail" style={{ cursor: "pointer" }}>
          <CCol xs={{ size: 9 }}></CCol>
          <CCol
            xs={{ size: 3 }}
            className="d-flex flex-row justify-content-center align-items-center"
          >
            <div>Total amount: {numberWithCommas(totalAmount)} VND</div>
          </CCol>
        </CRow>
      </CCardFooter>
    </CCard>
  );
};

export default OrderDetail;
