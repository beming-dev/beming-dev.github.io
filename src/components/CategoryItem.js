import React from "react"
import Img from "gatsby-image"
import { useStaticQuery, graphql, Link } from "gatsby"
import "./CategoryItem.scss"

const CategoryItem = ({ info, categoryPage }) => {
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
  return (
    <div
      className={
        categoryPage ? "category-page-item category-item" : "category-item"
      }
    >
      <Link to={`${info.slug}`}>
        <span className="date">{info.date}</span>
        <div className="img-box">
          <Img fixed={data.file.childImageSharp.fixed} alt="as" />
        </div>
        <span className="title">{info.title}</span>
      </Link>
    </div>
  )
}

export default CategoryItem
