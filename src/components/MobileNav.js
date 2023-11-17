import React from "react"
import "./mobilenav.scss"
import { graphql, useStaticQuery, Link } from "gatsby"

const MobileNav = () => {
  const data = useStaticQuery(graphql`
    query {
      allMarkdownRemark(limit: 2000) {
        group(field: { frontmatter: { categories: SELECT } }) {
          fieldValue
          totalCount
        }
      }
    }
  `)
  return (
    <div className="mobile-nav">
      <span className="logo">
        <Link to="/">Beming-dev</Link>
      </span>
      <div className="categories">
        {data.allMarkdownRemark.group.map(category => (
          <li key={category.fieldValue}>
            <Link to={`/${category.fieldValue}`}>{category.fieldValue}</Link>
          </li>
        ))}
      </div>
    </div>
  )
}

export default MobileNav
