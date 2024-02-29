import React from "react";

import Footernolog from "./Footerlog";
import FooterCus from "./FooterCus";
import FooterKB from "./FooterKB";
import FooterFarm from "./FooterFarm";
import FooterAdmin from "./FooterAdmin";

function Footer({ auth }) {
  if (auth == 0) {
    return <Footernolog />;
  } else if (auth == 1) {
    return <FooterCus />;
  } else if (auth == 2) {
    return <FooterKB />;
  } else if (auth == 3) {
    return <FooterFarm />;
  } else if (auth == 4) {
    return <FooterAdmin />;
  }
}

export default Footer;
