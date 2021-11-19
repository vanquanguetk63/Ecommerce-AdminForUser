import CIcon from "@coreui/icons-react";
import React from "react";
import { icons } from "src/assets/icons";


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
    icon: <CIcon name="cil-hamburger-menu" customClasses="c-sidebar-nav-icon" />,
  },
];

export default _nav;
