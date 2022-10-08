import React from "react"
import { graphql, useStaticQuery, Link } from "gatsby"
import "./Navigation.scss"
import Img from "gatsby-image"

export default function Navigation() {
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
          <div className="profile-img-wrapper">
            <Img fluid={data.allFile.edges[3].node.childImageSharp.fluid} />
          </div>
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
              <a href="https://github.com/beming-dev">
                <Img fluid={data.allFile.edges[1].node.childImageSharp.fluid} />
              </a>
            </div>
            <div className="img-wrapper">
              <a href="https://github.com/beming-dev">
                <Img fluid={data.allFile.edges[2].node.childImageSharp.fluid} />
              </a>
            </div>
          </div>
        </div>
        <div className="category">
          {data.allMarkdownRemark.group.map(category => (
            <li key={category.fieldValue}>
              <Link to={`/${category.fieldValue}`}>{category.fieldValue}</Link>
            </li>
          ))}
        </div>
        <span className="copyright">© copyright 2022</span>
      </div>
    </div>
  )
}
