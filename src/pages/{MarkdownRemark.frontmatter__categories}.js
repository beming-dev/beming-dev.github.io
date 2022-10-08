import { graphql } from "gatsby"
import * as React from "react"
import Layout from "../components/layout"
import "./categories.scss"
import CategoryItemHorizon from "../components/CategoryItemHorizon"

export default function BlogPostTemplate({ data, params }) {
  let posts = data.allMarkdownRemark.edges.filter(
    edge => edge.node.frontmatter.categories === params.frontmatter__categories
  )

  return (
    <Layout>
      <div className="category-page">
        <span className="category-title">{params.frontmatter__categories}</span>
        <div className="category-item-box">
          {posts.map((post, i) => (
            <CategoryItemHorizon key={i} info={post.node} />
          ))}
        </div>
      </div>
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
          html
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
