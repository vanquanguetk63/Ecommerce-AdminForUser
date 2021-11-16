import {
  TheContent,
  TheFooter,
  TheHeader,
  TheSidebar,
} from "../containers/index";

import React from "react";

const Dashboard = () => {
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
