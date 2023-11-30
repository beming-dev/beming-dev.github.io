import React from "react"
import { graphql, useStaticQuery, Link } from "gatsby"
import CategoryItem from "./CategoryItem"
import "./CategoryList.scss"

const CategoryList = () => {
  const data = useStaticQuery(graphql`
    query {
      allMarkdownRemark(sort: { frontmatter: { date: DESC } }) {
        edges {
          node {
            frontmatter {
              thumbnail
              categories {
                subCategory
              }
              date
              slug
              title
            }
            excerpt
          }
        }
      }
    }
  `)
  let { allMarkdownRemark } = data
  let { edges } = allMarkdownRemark

  return (
    <div className="category-list">
      <div className="items">
        {edges.map((edge, i) => (
          <CategoryItem key={i} info={edge.node} />
        ))}
      </div>
    </div>
  )
}

export default CategoryList
