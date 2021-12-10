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
import AddModal from "../Modal/AddModal";

const EditProduct = () => {
  const route = useParams();
  const user = useSelector((state) => state.user);
  const [products, setProducts] = useState();
  const [category, setCategory] = useState();
  const [spinner, setSpinner] = useState(false);
  const [modal, setModal] = useState(false);
  const userId = useSelector((state) => state.user?.id);

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
      quantity: yup.number().required(),
    })
    .required();

  return (
    <>
      {products ? (
        <Formik
          initialValues={{
            product_name: products?.productName,
            product_price: products?.productPrice,
            description: "",
            category_id: products?.category?.id,
            product_image: products?.productImage,
            quantity: products?.quantity,
          }}
          onSubmit={async (values) => {
            setModal(true);
            setSpinner(true);
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
          }) => {
            const onAddPress = async () => {
              setModal(false);
              await put(`/product/editProduct/${route?.id}`, {
                product_name: values?.product_name,
                product_price: values?.product_price?.toString(),
                category_id: values?.category_id?.toString(),
                product_image: values?.product_image,
                user_id: userId?.toString(),
                quantity: values?.quantity,
              }).then((res) => {
                console.log("res...", res);
                setSpinner(false);
              });
            };

            return (
              <>
                <AddModal
                  item={values}
                  isOpen={modal}
                  onAddPress={onAddPress}
                  onClose={() => {
                    setModal(false);
                    setSpinner(false);
                  }}
                />

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
                            <div className="mb-2">
                              <CRow className="ml-1">
                                <CCol xs={{ size: 6 }} className="pl-0">
                                  <CLabel>Price</CLabel>
                                  <CInput
                                    placeholder="Price"
                                    name="product_price"
                                    onChange={handleChange}
                                    value={values.product_price}
                                  />
                                  {errors.product_price &&
                                    touched.product_price && (
                                      <p style={{ color: "red" }}>
                                        {errors.product_price}
                                      </p>
                                    )}
                                </CCol>

                                <CCol xs={{ size: 6 }} className="pl-0">
                                  <CLabel>Quantity</CLabel>
                                  <CInput
                                    placeholder="Quantity"
                                    name="quantity"
                                    onChange={handleChange}
                                    value={values.quantity}
                                  />
                                  {errors.quantity && touched.quantity && (
                                    <p style={{ color: "red" }}>
                                      {errors.quantity}
                                    </p>
                                  )}
                                </CCol>
                              </CRow>
                            </div>
                            <div className="mb-3">
                              <CLabel>Description</CLabel>
                              <CTextarea placeholder="Description" rows="3" />
                              {errors.description && touched.description && (
                                <p style={{ color: "red" }}>
                                  {errors.description}
                                </p>
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
                                <p style={{ color: "red" }}>
                                  {errors.category_id}
                                </p>
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
                          </CCol>
                        </CRow>
                        <div className="d-grid gap-2">
                          <CButton
                            disabled={spinner}
                            size="lg"
                            color="primary"
                            onClick={handleSubmit}
                          >
                            {!spinner ? (
                              "UPDATE"
                            ) : (
                              <div className="spinner-border" role="status">
                                <span className="sr-only">Loading...</span>
                              </div>
                            )}
                          </CButton>
                        </div>
                      </CCardBody>
                    </CCard>
                  </CCol>
                </CRow>
              </>
            );
          }}
        </Formik>
      ) : null}
    </>
  );
};

export default EditProduct;
