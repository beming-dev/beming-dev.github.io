import React from "react"
import Img from "gatsby-image"
import { useStaticQuery, graphql, Link } from "gatsby"
import "./CategoryItemHorizon.scss"

const CategoryItemHorizon = ({ info }) => {
  let meta = info.frontmatter
  let html = info.html
  const data = useStaticQuery(graphql`
    query {
      file(relativePath: { eq: "imag.jpg" }) {
        childImageSharp {
          # Specify the image processing specifications right in the query.
          # Makes it trivial to update as your page's design changes.
          fluid(maxWidth: 125, maxHeight: 125) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)
  return (
    <div className="category-item-horizon">
      <Link to={`${meta.slug}`}>
        <div className="img-box">
          <Img fluid={data.file.childImageSharp.fluid} alt="as" />
        </div>
        <div className="right">
          <span className="date">{meta.date}</span>
          <span className="title">{meta.title}</span>
          <span
            className="description"
            dangerouslySetInnerHTML={{ __html: html }}
          ></span>
        </div>
      </Link>
    </div>
  )
}

export default CategoryItemHorizon
