import React from "react";
import FooterNav from "./FooterNav";

function Layout({ children }) {
  return (
    <div className="layout">
      {children}
      <FooterNav />
    </div>
  );
}

export default Layout;
