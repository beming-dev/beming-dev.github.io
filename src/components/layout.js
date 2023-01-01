/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import * as React from "react"
import PropTypes from "prop-types"
import "./layout.scss"
import "./global.scss"

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
        <Footer />
      </div>
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
