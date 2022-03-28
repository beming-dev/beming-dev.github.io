import React from "react"
import { StaticQuery, graphql } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"
import "./navigation.scss"
export default function Header() {
  return (
    <StaticQuery
      query={graphql`
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
      `}
      render={data => (
        <div className="navigation">
          <h2 className="logo">Beming-dev</h2>
          <div className="profile">
            <StaticImage />
            <span>beming-dev blog</span>
          </div>
          <ul className="category">
            {data.allMarkdownRemark.group.map(category => (
              <li key={category.fieldValue}>{category.fieldValue}</li>
            ))}
          </ul>
          <div className="contact"></div>
          <span>copyright</span>
        </div>
      )}
    />
  )
}
