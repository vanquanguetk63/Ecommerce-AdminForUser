import * as yup from "yup";

import React, { useEffect, useState } from "react";
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

import { useParams } from "react-router";
import { getAuthen, get, put } from "src/services/network";
import { useSelector } from "react-redux";
import { Formik } from "formik";

const EditProduct = () => {
  const route = useParams();
  const user = useSelector((state) => state.user);
  const [products, setProducts] = useState();
  const [category, setCategory] = useState();

  useEffect(() => {
    if (user?.id) {
      getAuthen(`/product/getByUserId/${user?.id}`).then((res) => {
        const proData = res.data?.find(
          (item) => item?.id?.toString() === route?.id
        );
        setProducts(proData);
      });
    }
  }, [route?.id, user?.id]);

  useEffect(() => {
    get("/category/getAllCategory").then((res) => {
      setCategory(res?.data);
    });
  }, []);

  const schema = yup
    .object({
      product_name: yup.string().min(4).required(),
      product_price: yup.string().required(),
      // description: yup.string().min(10).required(),
      category_id: yup.number().required(),
    })
    .required();

  return (
    <>
      {products ? (
        <Formik
          initialValues={{
            product_name: products?.productName?.slice(
              1,
              products?.productName?.length - 1
            ),
            product_price: products?.productPrice,
            description: "",
            category_id: products?.category?.id,
            product_image: products?.productImage,
          }}
          onSubmit={async (values) => {
            console.log("values", values);
            await put(`/product/editProduct/${route?.id}`, {
              product_name: values?.product_name,
              product_price: values?.product_price?.toString(),
              category_id: values?.category_id?.toString(),
              product_image: values?.product_image,
              user_id: user?.id?.toString(),
            }).then((res) => console.log("res...", res));
          }}
          validationSchema={schema}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
          }) => (
            <CRow>
              <CCol>
                <CCard>
                  <CCardHeader>
                    <div>Edit Product</div>
                  </CCardHeader>
                  <CCardBody>
                    <CRow>
                      <CCol xs={{ size: 6 }}>
                        <div className="mb-3">
                          <CLabel>Product Name</CLabel>
                          <CInput
                            placeholder="Product's Name"
                            name="product_name"
                            value={values.product_name}
                            onChange={handleChange}
                          />
                          {errors.product_name && touched.product_name && (
                            <p style={{ color: "red" }}>
                              {errors.product_name}
                            </p>
                          )}
                        </div>
                        <div className="mb-3">
                          <CLabel>Price</CLabel>
                          <CCol xs={{ size: 5 }} className="pl-0">
                            <CInput
                              placeholder="Price"
                              name="product_price"
                              value={values.product_price}
                              onChange={handleChange}
                            />
                          </CCol>
                          {errors.product_price && touched.product_price && (
                            <p style={{ color: "red" }}>
                              {errors.product_price}
                            </p>
                          )}
                        </div>
                        <div className="mb-3">
                          <CLabel>Description</CLabel>
                          <CTextarea placeholder="Description" rows="3" />
                          {errors.description && touched.description && (
                            <p style={{ color: "red" }}>{errors.description}</p>
                          )}
                        </div>
                        <div className="mb-3">
                          <CLabel>Category</CLabel>
                          <CCol xs={{ size: 6 }} className="pl-0">
                            <CSelect
                              size="sm"
                              className="mb-3"
                              aria-label="Small select example"
                              name="category_id"
                              value={values.category_id}
                              onChange={handleChange}
                            >
                              <option>Open this select menu</option>
                              {category?.map((item) => (
                                <option value={item?.id} key={item?.id}>
                                  {item?.categoryName}
                                </option>
                              ))}
                            </CSelect>
                          </CCol>
                          {errors.category_id && touched.category_id && (
                            <p style={{ color: "red" }}>{errors.category_id}</p>
                          )}
                        </div>
                      </CCol>
                      <CCol xs={{ size: 6 }} className="text-center">
                        <div className="mb-3">
                          <CImg
                            align="center"
                            src={products?.productImage}
                            width={200}
                            height={200}
                            fluid
                          />
                        </div>
                        {/* <div className="d-grid gap-2">
                          <CButton size="lg" color="primary">
                            UPLOAD PRODUCT IMAGE
                          </CButton>
                        </div> */}
                      </CCol>
                    </CRow>
                    <div className="d-grid gap-2">
                      <CButton size="lg" color="primary" onClick={handleSubmit}>
                        Update
                      </CButton>
                    </div>
                  </CCardBody>
                </CCard>
              </CCol>
            </CRow>
          )}
        </Formik>
      ) : null}
    </>
  );
};

export default EditProduct;
