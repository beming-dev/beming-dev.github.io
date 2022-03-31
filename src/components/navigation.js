import React from "react"
import { StaticQuery, graphql, useStaticQuery, Link } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"
import "./Navigation.scss"
export default function Navigation() {
  const data = useStaticQuery(graphql`
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
  `)
  return (
    <div className="navigation">
      <div className="content">
        <h2 className="logo">
          <Link to="/">Beming-dev</Link>
        </h2>
        <div className="profile">
          <span>beming-dev blog</span>
        </div>
        <div className="category">
          cate:
          {data.allMarkdownRemark.group.map(category => (
            <li key={category.fieldValue}>
              <Link to={`/${category.fieldValue}`}>{category.fieldValue}</Link>
            </li>
          ))}
        </div>
        <div className="contact"></div>
        <span className="copyright">© copyright 2022</span>
      </div>
    </div>
  )
}
