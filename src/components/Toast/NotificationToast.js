import React from "react";

import { CToast, CToastHeader, CToastBody } from "@coreui/react";

const NotificationToast = () => {
  return (
    <CToast title="CoreUI for React.js" autohide={false} visible={true}>
      <CToastHeader close>
        <svg
          className="rounded me-2"
          width="20"
          height="20"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid slice"
          focusable="false"
          role="img"
        >
          <rect width="100%" height="100%" fill="#007aff"></rect>
        </svg>
        <strong className="me-auto">CoreUI for React.js</strong>
        <small>7 min ago</small>
      </CToastHeader>
      <CToastBody>Hello, world! This is a toast message.</CToastBody>
    </CToast>
  );
};

export default NotificationToast;
