import React from "react"
import "./mobilenav.scss"
import { graphql, useStaticQuery, Link } from "gatsby"

const MobileNav = ({ sub }) => {
  const data = useStaticQuery(graphql`
    query {
      allMarkdownRemark(limit: 2000) {
        group(
          field: { frontmatter: { categories: { mainCategory: SELECT } } }
        ) {
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
        {sub
          ? [...sub].map((category, i) => (
              <li key={i}>
                <Link to={`/subCategory/${category.toLowerCase()}`}>
                  {category}
                </Link>
              </li>
            ))
          : data.allMarkdownRemark.group.map(category => (
              <li key={category.fieldValue}>
                <Link to={`/mainCategory/${category.fieldValue.toLowerCase()}`}>
                  {category.fieldValue}
                </Link>
              </li>
            ))}
      </div>
    </div>
  )
}

export default MobileNav
