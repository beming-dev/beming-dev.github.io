import * as React from "react"
import { graphql } from "gatsby"

import CategoryList from "../components/CategoryList"
import Layout from "../components/layout"
import Seo from "../components/seo"
import "./style.scss"

const IndexPage = ({ data }) => (
  <Layout>
    <Seo title="Home" />
    <div className="main">
      {data.allMarkdownRemark.group.map((category, i) => (
        <CategoryList key={i} category={category.fieldValue} />
      ))}
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
    allMarkdownRemark(limit: 2000) {
      group(field: frontmatter___categories) {
        fieldValue
        totalCount
      }
    }
  }
`

export default IndexPage
