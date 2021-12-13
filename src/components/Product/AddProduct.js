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

import UploadImage from "../../assets/images/upload-image.png";
import { Formik } from "formik";
import { get, post } from "../../services/network";
import { useSelector } from "react-redux";
import AddModal from "../Modal/AddModal";
import { useHistory } from "react-router-dom";

const AddProduct = () => {
  const [category, setCategory] = useState();
  const [spinner, setSpinner] = useState(false);
  const [modal, setModal] = useState(false);
  const userId = useSelector((state) => state.user?.id);
  const history = useHistory();

  const schema = yup
    .object({
      product_name: yup.string().min(4).required(),
      product_price: yup.number().required(),
      description: yup.string().min(10).required(),
      category_id: yup.number().required(),
      quantity: yup.number().required(),
    })
    .required();

  useEffect(() => {
    get("/category/getAllCategory").then((res) => {
      setCategory(res?.data);
    });
  }, []);

  return (
    <Formik
      initialValues={{
        product_name: "",
        product_price: undefined,
        description: "",
        category_id: undefined,
        quantity: undefined,
        product_image:
          "https://lh3.googleusercontent.com/7u1ADqRL2Pod00m5jOMM7Q50bJoxKuD4DcWFdVUzZG6cFIOW7vFTE7qX4EB5t1icfXJ0ng91sQMpK1FUkYI7=rw-w300",
      }}
      onSubmit={(values) => {
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
          await post("/product/addProduct", {
            product_name: values?.product_name,
            product_price: values?.product_price?.toString(),
            category_id: values?.category_id?.toString(),
            product_image: values?.product_image,
            user_id: userId?.toString(),
            quantity: values?.quantity,
          }).then((res) => {
            setSpinner(false);
            setTimeout(() => {
              history.push("/products");
            }, 2000);
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
                    <div>Add New Product</div>
                  </CCardHeader>
                  <CCardBody>
                    <CRow>
                      <CCol xs={{ size: 6 }}>
                        <div className="mb-2">
                          <CLabel>Product Name</CLabel>
                          <CInput
                            placeholder="Product's Name"
                            name="product_name"
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
                              />
                              {errors.quantity && touched.quantity && (
                                <p style={{ color: "red" }}>
                                  {errors.quantity}
                                </p>
                              )}
                            </CCol>
                          </CRow>
                        </div>
                        <div className="mb-2">
                          <CLabel>Description</CLabel>
                          <CTextarea
                            placeholder="Description"
                            rows="3"
                            name="description"
                            onChange={handleChange}
                          />
                          {errors.description && touched.description && (
                            <p style={{ color: "red" }}>{errors.description}</p>
                          )}
                        </div>
                        <div className="mb-2">
                          <CLabel>Category</CLabel>
                          <CCol xs={{ size: 6 }} className="pl-0">
                            <CSelect
                              size="sm"
                              className="mb-2"
                              aria-label="Small select example"
                              name="category_id"
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
                        <div className="mb-2">
                          <CImg
                            align="center"
                            src={UploadImage}
                            width={300}
                            height={200}
                          />
                        </div>
                        <div className="d-grid gap-2">
                          <CButton size="lg" color="primary">
                            UPLOAD PRODUCT IMAGE
                          </CButton>
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
                          "ADD NEW PRODUCT"
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
  );
};

export default AddProduct;
