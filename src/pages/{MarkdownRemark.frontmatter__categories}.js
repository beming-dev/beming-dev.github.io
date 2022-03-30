import { graphql } from "gatsby"
import * as React from "react"
import Layout from "../components/layout"
import CategoryItem from "../components/CategoryItem"
export default function BlogPostTemplate({ data, params }) {
  let posts = data.allMarkdownRemark.edges.filter(
    edge => edge.node.frontmatter.categories === params.frontmatter__categories
  )
  return (
    <Layout>
      {posts.map((post, i) => (
        <CategoryItem
          key={i}
          info={post.node.frontmatter}
          categoryPage={true}
        />
      ))}
    </Layout>
  )
}

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
      edges {
        node {
          frontmatter {
            thumbnail
            categories
            date
            slug
            title
          }
        }
      }
    }
  }
`
