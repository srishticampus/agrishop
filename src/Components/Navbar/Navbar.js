import React from "react";
import Navnolog from "./Navnolog";
import NavCus from "./NavCus";
import NavKB from "./NavKB";
import NavFarm from "./NavFarm";
import NavAdmin from "./NavAdmin";

function Navbar({ auth }) {
  if (auth == 0) {
    return <Navnolog />;
  } else if (auth == 1) {
    return <NavCus />;
  } else if (auth == 2) {
    return <NavKB />;
  } else if (auth == 3) {
    return <NavFarm />;
  } else if (auth == 4) {
    return <NavAdmin />;
  }
}

export default Navbar;
