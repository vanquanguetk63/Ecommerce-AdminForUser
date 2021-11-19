import { CInput } from "@coreui/react";
import React, { forwardRef } from "react";

const ButtonNew = forwardRef((props, ref) => (
  <CInput innerRef={ref} {...props} />
));

export default ButtonNew;
