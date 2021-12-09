import * as yup from "yup";

import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow,
  CSpinner,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { Formik } from "formik";
import { login } from "src/services/auth";
import { useDispatch } from "react-redux";
import { setUserToken } from "../../../redux/slice/userSlice";
import { useHistory } from "react-router-dom";
import useToken from "src/hooks/useToken";

const Login = () => {
  const { token } = useToken();
  const [spinner, setSpinner] = useState(false);
  const schema = yup
    .object({
      username: yup.string().min(6).required(),
      password: yup.string().min(6).required(),
    })
    .required();
  const dispatch = useDispatch();
  const history = useHistory();

  return (
    <>
      {!token ? (
        <div className="c-app c-default-layout flex-row align-items-center">
          <CContainer>
            <CRow className="justify-content-center">
              <CCol md="8">
                <CCardGroup>
                  <CCard className="p-4">
                    <CCardBody>
                      <Formik
                        initialValues={{ username: "", password: "" }}
                        validationSchema={schema}
                        onSubmit={async (values, { setSubmitting }) => {
                          try {
                            setSpinner(true);
                            await login(
                              values?.username,
                              values?.password
                            ).then(async (response) => {
                              const { data } = response;
                              const userInfor = {
                                id: data.user.id,
                                token: data.token,
                                authorities: data.user.authorities,
                                username: data.user.username,
                                email: data.user.email,
                              };
                              await dispatch(setUserToken(userInfor));

                              setTimeout(() => {
                                setSpinner(false);

                                history.push("/dashboard");
                              }, 500);
                            });
                          } catch (err) {
                            console.log("error login... ", err);
                          }
                        }}
                      >
                        {({
                          values,
                          errors,
                          touched,
                          handleChange,
                          handleBlur,
                          handleSubmit,
                        }) => (
                          <CForm>
                            <h1>Login</h1>
                            <p className="text-muted">
                              Sign In to your account
                            </p>
                            <CInputGroup className="mb-3">
                              <CInputGroupPrepend>
                                <CInputGroupText>
                                  <CIcon name="cil-user" />
                                </CInputGroupText>
                              </CInputGroupPrepend>
                              <CInput
                                name="username"
                                value={values.username}
                                type="text"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                placeholder="Username"
                                autoComplete="username"
                              />
                            </CInputGroup>
                            {errors.username && touched.username && (
                              <p style={{ color: "red" }}>{errors.username}</p>
                            )}
                            <CInputGroup className="mb-4">
                              <CInputGroupPrepend>
                                <CInputGroupText>
                                  <CIcon name="cil-lock-locked" />
                                </CInputGroupText>
                              </CInputGroupPrepend>
                              <CInput
                                name="password"
                                value={values.password}
                                type="password"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                placeholder="Password"
                                autoComplete="current-password"
                              />
                            </CInputGroup>
                            {errors.password && touched.password && (
                              <p style={{ color: "red" }}>{errors.username}</p>
                            )}
                            <CRow>
                              <CCol xs="6">
                                <CButton
                                  color="primary"
                                  className="px-4"
                                  onClick={handleSubmit}
                                  disabled={spinner}
                                >
                                  {!spinner ? "Login" : <CSpinner size="sm" />}
                                </CButton>
                              </CCol>
                              <CCol xs="6" className="text-right">
                                <CButton color="link" className="px-0">
                                  Forgot password?
                                </CButton>
                              </CCol>
                            </CRow>
                          </CForm>
                        )}
                      </Formik>
                    </CCardBody>
                  </CCard>
                  <CCard
                    className="text-white bg-primary py-5 d-md-down-none"
                    style={{ width: "44%" }}
                  >
                    <CCardBody className="text-center">
                      {/* <div>
                        <h2>Sign up</h2>
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipisicing
                          elit, sed do eiusmod tempor incididunt ut labore et
                          dolore magna aliqua.
                        </p>
                        <Link to="/register">
                          <CButton
                            color="primary"
                            className="mt-3"
                            active
                            tabIndex={-1}
                          >
                            Register Now!
                          </CButton>
                        </Link>
                      </div> */}
                    </CCardBody>
                  </CCard>
                </CCardGroup>
              </CCol>
            </CRow>
          </CContainer>
        </div>
      ) : (
        <Redirect />
      )}
    </>
  );
};

export default Login;
