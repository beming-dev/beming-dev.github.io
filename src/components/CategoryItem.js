import React from "react"
import Img from "gatsby-image"
import { useStaticQuery, graphql } from "gatsby"
import "./CategoryItem.scss"

const CategoryItem = ({ info }) => {
  const data = useStaticQuery(graphql`
    query {
      file(relativePath: { eq: "imag.jpg" }) {
        childImageSharp {
          # Specify the image processing specifications right in the query.
          # Makes it trivial to update as your page's design changes.
          fixed(width: 125, height: 125) {
            ...GatsbyImageSharpFixed
          }
        }
      }
    }
  `)
  console.log(data)
  return (
    <div className="category-item">
      <span>{info.date}</span>
      <Img fixed={data.file.childImageSharp.fixed} alt="as" />
      <span>{info.title}</span>
    </div>
  )
}

export default CategoryItem
