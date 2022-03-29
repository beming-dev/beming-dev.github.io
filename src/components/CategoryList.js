import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import CategoryItem from "./CategoryItem"
import "./CategoryList.scss"

const CategoryList = ({ category }) => {
  const data = useStaticQuery(graphql`
    query {
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
  `)
  let { allMarkdownRemark } = data
  let { edges } = allMarkdownRemark
  edges = edges.filter(edge => edge.node.frontmatter.categories === category)

  return (
    <div className="category-list">
      <span>{category}</span>
      {edges.map((edge, i) => (
        <CategoryItem key={i} info={edge.node.frontmatter} />
      ))}
    </div>
  )
}

export default CategoryList
