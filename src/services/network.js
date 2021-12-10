import axios from "axios";
import { domain } from "./domain";

const dataLocal = localStorage.getItem("user");
const objUser = JSON.parse(dataLocal);

export const getHeaderAuthen = () => {
  const axiosConfig = {
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      "Access-Control-Allow-Origin": "*",
      Authorization: `Beaer ${objUser?.token}`,
    },
  };
  return axiosConfig;
};

export const getHeader = () => {
  const axiosConfig = {
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      "Access-Control-Allow-Origin": "*",
    },
  };
  return axiosConfig;
};

export const getAuthen = (url) => {
  return new Promise((resolve, rejected) => {
    axios
      .get(domain + url, getHeaderAuthen())
      .then(function (response) {
        return resolve(response.data);
      })
      .catch(function (error) {
        // handleError(error, reject ed);
        // return rejected(error)
      });
  });
};

export const get = (url) => {
  return new Promise((resolve, rejected) => {
    axios
      .get(domain + url, getHeader())
      .then(function (response) {
        return resolve(response.data);
      })
      .catch(function (error) {
        // handleError(error, reject ed);
        // return rejected(error)
      });
  });
};

export const post = (url, params) => {
  return new Promise((resolve, rejected) => {
    axios
      .post(domain + url, params, getHeaderAuthen())
      .then((response) => {
        console.log("--response--", response);
        return resolve(response.data);
      })
      .catch((error) => {
        console.log(error.respsonse);
        // self.handleError(error, rejected);
      });
  });
};

export const put = (url, params) => {
  return new Promise((resolve, rejected) => {
    axios
      .put(domain + url, params, getHeaderAuthen())
      .then((response) => {
        console.log("--response--", response);
        return resolve(response.data);
      })
      .catch((error) => {
        console.log(error.respsonse);
        // self.handleError(error, rejected);
      });
  });
};

export const deleteServices = (url, params) => {
  return new Promise((resolve, rejected) => {
    axios
      .delete(domain + url, params, getHeaderAuthen())
      .then((response) => {
        console.log("--response--", response);
        return resolve(response.data);
      })
      .catch((error) => {
        console.log(error.respsonse);
        // self.handleError(error, rejected);
      });
  });
};

//   upload(url, params) {
//     return new Promise((resolve, rejected) => {
//       axios
//         .post(this.domain + url, params, this.getHeaderUpload())
//         .then(function (response) {
//           return resolve(response.data);
//         })
//         .catch(function (error) {
//           console.log("UploadError", error);
//           self.handleError(error, rejected);
//         });
//     });
//   }

//   patch(url, params) {
//     return new Promise((resolve, rejected) => {
//       axios
//         .patch(this.domain + url, params, this.getHeader())
//         .then(function (response) {
//           // console.log('lala');
//           return resolve(response.data);
//         })
//         .catch(function (error) {
//           // console.log('1234');
//           console.log(error);
//           self.handleError(error, rejected);
//         });
//     });
//   }

//   put(url, params) {
//     return new Promise((resolve, rejected) => {
//       axios
//         .put(this.domain + url, params, this.getHeader())
//         .then(function (response) {
//           // console.log('lala');
//           return resolve(response.data);
//         })
//         .catch(function (error) {
//           // console.log('1234');
//           console.log(error);
//           self.handleError(error, rejected);
//         });
//     });
//   }

//   get(url) {
//     return new Promise((resolve, rejected) => {
//       axios
//         .get(this.domain + url, this.getHeader())
//         .then(function (response) {
//           return resolve(response.data);
//         })
//         .catch(function (error) {
//           self.handleError(error, rejected);
//           // return rejected(error)
//         });
//     });
//   }
//   delete(url) {
//     return new Promise((resolve, rejected) => {
//       axios
//         .delete(this.domain + url, this.getHeader())
//         .then(function (response) {
//           return resolve(response.data);
//         })
//         .catch(function (error) {
//           console.log(error);
//           // self.handleError(error, rejected);
//         });
//     });
//   }
