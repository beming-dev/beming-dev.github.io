import React from "react"
import { graphql, useStaticQuery, Link } from "gatsby"
import CategoryItem from "./CategoryItem"
import "./CategoryList.scss"

const CategoryList = ({ category }) => {
  const data = useStaticQuery(graphql`
    query {
      allMarkdownRemark(sort: { frontmatter: { date: DESC } }) {
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
  `)
  let { allMarkdownRemark } = data
  let { edges } = allMarkdownRemark
  edges = edges.filter(edge => edge.node.frontmatter.categories === category)

  return (
    <div className="category-list">
      <span className="name">
        <Link to={`/${category}`}>{category}</Link>
      </span>
      <div className="items">
        {edges.map((edge, i) => (
          <CategoryItem key={i} info={edge.node.frontmatter} />
        ))}
        {/* {edges.foreach((edge, i) => (
          createPage({
            component: path.resolve()
          })
        ))} */}
      </div>
    </div>
  )
}

export default CategoryList
