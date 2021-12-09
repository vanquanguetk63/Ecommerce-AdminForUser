import CIcon from "@coreui/icons-react";
import React from "react";

const _nav = [
  {
    _tag: "CSidebarNavItem",
    name: "Dashboard",
    to: "/dashboard",
    icon: <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon" />,
  },
  {
    _tag: "CSidebarNavItem",
    name: "Products",
    to: "/products",
    icon: (
      <CIcon name="cil-hamburger-menu" customClasses="c-sidebar-nav-icon" />
    ),
  },
  {
    _tag: "CSidebarNavItem",
    name: "Orders",
    to: "/orders",
    icon: <CIcon name="cil-monitor" customClasses="c-sidebar-nav-icon" />,
  },
];

export default _nav;
