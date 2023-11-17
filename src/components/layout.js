import * as React from "react"
import PropTypes from "prop-types"
import "./layout.scss"
import "../styles/global.scss"

import Navigation from "./Navigation"
import MobileNav from "./MobileNav"
import Footer from "./Footer"

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <div className="content">
        <MobileNav />
        <Navigation />
        <main>{children}</main>
      </div>
      <Footer />
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
