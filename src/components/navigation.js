import React from "react"
import { graphql, useStaticQuery, Link } from "gatsby"
import "./Navigation.scss"
import Img from "gatsby-image"

export default function Navigation({ sub }) {
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
                  <Link
                    to={`/mainCategory/${category.fieldValue.toLowerCase()}`}
                  >
                    {category.fieldValue}
                  </Link>
                </li>
              ))}
        </div>
        <span className="copyright">© copyright 2022</span>
      </div>
    </div>
  )
}
