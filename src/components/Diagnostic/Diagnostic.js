import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CSpinner,
} from "@coreui/react";
import React, { useEffect, useState, useCallback } from "react";

import { getAuthen } from "../../services/network";
import { useSelector } from "react-redux";
import { numberWithCommas } from "src/lib";

const Diagnostic = () => {
  const user = useSelector((state) => state.user);
  const [products, setProducts] = useState();
  const [loading, setLoading] = useState(true);
  const getProduct = useCallback(() => {
    if (user?.id) {
      getAuthen(`/order/getInfoAllOrderBySellerId/${user.id}`).then((res) => {
        setProducts(res.data);
        setLoading(false);
      });
    }
  }, [user?.id]);

  useEffect(() => {
    getProduct();
  }, []);

  const formatCurrencyVND = (currency) => {
    const currencyNumber = currency.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });
    return currencyNumber;
  };
  return (
    <>
      <CRow>
        <CCol>
          <CCard>
            <CCardHeader className="product-header">
              <div>Product</div>
            </CCardHeader>
            <CCardBody>
              <table className="table table-hover table-outline mb-0 d-none d-sm-table">
                <thead className="thead-light">
                  <tr>
                    <th>Index</th>
                    <th>Name</th>
                    <th className="text-center">Image</th>
                    <th>Quantity</th>
                    <th>Total</th>
                    <th>List User</th>
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
                          <td>{index + 1}</td>
                          <td>{item?.productName}</td>
                          <td className="text-center">
                            <img
                              src={item?.productImage}
                              alt="admin@bootstrapmaster.com"
                              className="product-image"
                            />
                          </td>
                          <td className="text-center">
                            {`${numberWithCommas(item?.productQuantity)}`}
                          </td>

                          <td>{formatCurrencyVND(item?.total)}</td>
                          <td>
                            {item?.listUser?.map((item) => item)?.join(", ")}
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

export default Diagnostic;
