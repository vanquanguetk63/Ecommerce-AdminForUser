import * as yup from "yup";

import React, { useEffect, useState } from "react";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CInput,
  CRow,
  CSpinner,
  CButton,
} from "@coreui/react";

import { Formik } from "formik";
import { get, post } from "../../services/network";
import { useSelector } from "react-redux";
import AddModal from "../Modal/AddModal";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import CIcon from "@coreui/icons-react";
import XLSX, { read } from "xlsx";

const Excel = () => {
  const [category, setCategory] = useState();
  const [spinner, setSpinner] = useState(false);
  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [parseData, setData] = useState([]);

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

  const convertToJson = (csv) => {
    var lines = csv.split("\n");

    var result = [];

    var headers = lines[0].split(",");

    for (var i = 1; i < lines.length - 1; i++) {
      var obj = {};
      var currentline = lines[i].split(",");

      for (var j = 0; j < headers.length; j++) {
        obj[headers[j]] = currentline[j];
      }

      result.push(obj);
    }
    return result;
  };

  const handleChangeFile = (e) => {
    setLoading(true);
    let reader = new FileReader();
    reader.onload = (evt) => {
      // evt = on_file_select event
      /* Parse data */
      const bstr = evt.target.result;
      const wb = XLSX.read(bstr, { type: "binary" });
      /* Get first worksheet */
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      /* Convert array of arrays */
      const dataXlsx = XLSX.utils.sheet_to_csv(ws, { header: 1 });
      /* Update state */
      const parseDataXlsx = convertToJson(dataXlsx);
      setTimeout(() => {
        setData(parseDataXlsx);
        setLoading(false);
      }, 2000);
    };
    reader.readAsArrayBuffer(e.target.files[0]);
  };

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
          const arrData = parseData?.map((item) => ({
            product_image: item?.image,
            product_name: item?.name,
            product_price: item?.price,
            quantity: item?.quantity,
            category_id: item?.category,
            user_id: userId,
          }));
          setModal(false);
          console.log(arrData);
          await post("/product/addMultiProduct", {
            listProduct: arrData,
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
              item={{ product_name: `${parseData?.length} items` }}
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
                  <CCardHeader className="d-flex flex-row justify-content-between">
                    <div>Import From Excel</div>
                    <CButton
                      color="success"
                      size="sm"
                      disabled={parseData?.length === 0}
                      onClick={() => setModal((modal) => !modal)}
                    >
                      <CIcon name="cil-plus" /> Approve To Add
                    </CButton>
                  </CCardHeader>
                  <CCardBody>
                    <CRow>
                      <CCol xs={6}>
                        <CInput
                          type="file"
                          ID="fileSelect"
                          accept=".xlsx, .xls, .csv"
                          onChange={handleChangeFile}
                        />
                      </CCol>
                    </CRow>
                    <CRow className={"mt-3"}>
                      <table className="table table-hover table-outline mb-0 d-none d-sm-table">
                        <thead className="thead-light">
                          <tr>
                            <th>Index</th>
                            <th>Name</th>
                            <th className="text-center">Image</th>
                            {/* <th>Description</th> */}
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Category</th>

                            {/* <th className="text-center">Action</th> */}
                          </tr>
                        </thead>
                        <tbody>
                          {loading ? (
                            <CRow>
                              <CCol
                                className="d-flex justify-content-between align-items-center p-4"
                                xs={12}
                              >
                                <CSpinner color="success" size="lg" />
                              </CCol>
                            </CRow>
                          ) : (
                            parseData?.map((item, index) => {
                              return (
                                <tr key={index}>
                                  <td>{index + 1}</td>
                                  <td>{item?.name}</td>
                                  <td className="text-center">
                                    <img
                                      src={item?.image}
                                      alt="admin@bootstrapmaster.com"
                                      className="product-image"
                                    />
                                  </td>
                                  <td>{item?.price}</td>
                                  <td>{item?.quantity}</td>
                                  <td>
                                    {
                                      category?.find(
                                        (itemCategory) =>
                                          itemCategory?.id.toString() ===
                                          item?.category?.toString()
                                      )?.categoryName
                                    }
                                  </td>
                                </tr>
                              );
                            })
                          )}
                        </tbody>
                      </table>
                    </CRow>
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

export default Excel;
