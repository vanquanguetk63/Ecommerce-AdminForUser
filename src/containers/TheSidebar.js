import {
  CCreateElement,
  CSidebar,
  CSidebarBrand,
  CSidebarMinimizer,
  CSidebarNav,
  CSidebarNavDivider,
  CSidebarNavDropdown,
  CSidebarNavItem,
  CSidebarNavTitle,
} from "@coreui/react";
import { useDispatch, useSelector } from "react-redux";

import CIcon from "@coreui/icons-react";
import React from "react";
// sidebar nav config
import navigation from "./_nav";
import { setNavigation } from "src/redux/slice/navSlice";

const TheSidebar = () => {
  const dispatch = useDispatch();
  const show = useSelector((state) => state.navigation.sidebarShow);

  return (
    <CSidebar show={show} onShowChange={() => dispatch(setNavigation())}>
      <CSidebarBrand className="d-md-down-none" to="/">
        <CIcon
          className="c-sidebar-brand-full"
          name="logo-negative"
          height={35}
        />
        <CIcon
          className="c-sidebar-brand-minimized"
          name="sygnet"
          height={35}
        />
      </CSidebarBrand>
      <CSidebarNav>
        <CCreateElement
          items={navigation}
          components={{
            CSidebarNavDivider,
            CSidebarNavDropdown,
            CSidebarNavItem,
            CSidebarNavTitle,
          }}
        />
      </CSidebarNav>
      <CSidebarMinimizer className="c-d-md-down-none" />
    </CSidebar>
  );
};

export default React.memo(TheSidebar);
