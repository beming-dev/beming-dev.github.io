import React from "react";
import NavDesktop from "./NavDesktop";
import NavMobile from "./NavMobile";
import Footer from "./Footer";

const Layout = ({ children, sub }: any) => {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-1 flex-col md:flex-row">
        <NavMobile sub={sub} />
        <NavDesktop sub={sub} />
        <main className="flex-1 flex items-center transition duration-1000 box-border">
          {children}
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
