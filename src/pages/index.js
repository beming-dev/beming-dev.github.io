import * as React from "react"
import { graphql } from "gatsby"
import { Helmet } from "react-helmet"

import CategoryList from "../components/CategoryList"
import Layout from "../components/layout"
import Seo from "../components/seo"
import "../styles/style.scss"

const IndexPage = ({ data }) => (
  <Layout>
    <Helmet>
      <meta
        name="google-site-verification"
        content="3IsW427y9ifgDvg2qMuZiSL9WStHw0YN-C57cwpHjrE"
      />
      <script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4911380706120456"
        crossorigin="anonymous"
      ></script>
    </Helmet>
    <Seo title="Home" />
    <div className="main">
        <CategoryList />
    </div>
  </Layout>
)

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`

export default IndexPage
