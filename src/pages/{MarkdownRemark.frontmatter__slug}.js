import { graphql } from "gatsby"
import * as React from "react"
import Layout from "../components/layout"
import Seo from "../components/seo"
import "../styles/post.scss"

export default function BlogPostTemplate({ data: { markdownRemark } }) {
  const { frontmatter, html } = markdownRemark
  return (
    <Layout>
      <Seo title={frontmatter.title} />
      <div className="post-page">
        <h1 className="title">{frontmatter.title}</h1>
        <h2 className="date">{frontmatter.date}</h2>
        <span
          className="post-body"
          dangerouslySetInnerHTML={{ __html: html }}
        ></span>
      </div>
    </Layout>
  )
}

export const pageQuery = graphql`
  query ($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
      }
    }
  }
`
