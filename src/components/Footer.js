import React from "react"
import { graphql, useStaticQuery, Link } from "gatsby"
import Img from "gatsby-image"
import "./footer.scss"
const Footer = () => {
  const data = useStaticQuery(graphql`
    query {
      allFile(
        filter: {
          extension: { regex: "/" }
          relativeDirectory: { eq: "navigation" }
        }
      ) {
        edges {
          node {
            base
            childImageSharp {
              fluid(maxWidth: 200, maxHeight: 200) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
  `)
  return (
    <div className="footer">
      <div className="contacts">
        <div
          className="img-wrapper"
          onClick={() => {
            window.open("mailto:mingfordev@gmail.com")
          }}
        >
          <Img fluid={data.allFile.edges[0].node.childImageSharp.fluid} />
        </div>
        <div className="img-wrapper">
          <Link to="https://github.com/beming-dev">
            <Img fluid={data.allFile.edges[1].node.childImageSharp.fluid} />
          </Link>
        </div>
        <div className="img-wrapper">
          <Link to="https://github.com/beming-dev">
            <Img fluid={data.allFile.edges[2].node.childImageSharp.fluid} />
          </Link>
        </div>
      </div>
      <span className="copyright">© copyright 2022</span>
    </div>
  )
}

export default Footer
