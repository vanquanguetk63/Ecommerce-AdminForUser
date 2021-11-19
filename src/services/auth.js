import axios from "axios";
import { domain } from "./domain";

export const getHeaderAuthen = () => {
  const axiosConfig = {
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      "Access-Control-Allow-Origin": "*",
      //   tokenTimeStamp: localStorage.getItem("tokenTimeStamp"),
    },
  };
  return axiosConfig;
};

export const login = (username, password, params) => {
  return new Promise((resolve, rejected) => {
    axios
      .post(domain + "/auth/login", {
        username: username,
        password: password,
      })
      .then((response) => {
        return resolve(response.data);
      })
      .catch((error) => {
        console.log(error.respsonse);
        // self.handleError(error, rejected);
      });
  });
};
