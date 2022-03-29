import { graphql } from "gatsby"
import * as React from "react"
import Layout from "../components/layout"

export default function BlogPostTemplate({ data }) {
  return <Layout>hello</Layout>
}

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
