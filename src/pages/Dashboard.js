import {
  TheContent,
  TheFooter,
  TheHeader,
  TheSidebar,
} from "../containers/index";

import React, { useEffect } from "react";
import useToken from "src/hooks/useToken";
import { useDispatch } from "react-redux";
import { setUserToken } from "src/redux/slice/userSlice";

const Dashboard = () => {
  const { token } = useToken();
  const dispatch = useDispatch();

  useEffect(() => {
    if (token?.id !== "") {
      console.log("vaoo...", token);
      const userInfor = {
        id: token?.id,
        token: token?.token,
        authorities: token?.authorities,
        username: token?.username,
        email: token?.email,
      };
      dispatch(setUserToken(userInfor));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="c-app c-default-layout">
      <TheSidebar />
      <div className="c-wrapper">
        <TheHeader />
        <div className="c-body">
          <TheContent />
        </div>
        <TheFooter />
      </div>
    </div>
  );
};

export default Dashboard;
