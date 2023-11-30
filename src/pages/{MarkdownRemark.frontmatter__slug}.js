import { graphql } from "gatsby"
import * as React from "react"
import Layout from "../components/Layout"
import Seo from "../components/seo"
import "../styles/post.scss"

export default function BlogPostTemplate({ data: { markdownRemark } }) {
  const { frontmatter, html, tableOfContents } = markdownRemark
  console.log(tableOfContents)
  return (
    <Layout>
      <Seo title={frontmatter.title} />
      <div className="post-box">
        <div className="post-page">
          <h1 className="title">{frontmatter.title}</h1>
          <h2 className="date">{frontmatter.date}</h2>
          <span
            className="post-body"
            dangerouslySetInnerHTML={{ __html: html }}
          ></span>
        </div>
        <div
          className="table"
          dangerouslySetInnerHTML={{ __html: tableOfContents }}
        />
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
      tableOfContents
    }
  }
`
