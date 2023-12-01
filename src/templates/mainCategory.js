import { Link, graphql, useStaticQuery } from "gatsby"
import * as React from "react"
import "../styles/mainCategory.scss"
import Layout from "../components/Layout"
import folder from "../images/folder.png"
import Seo from "../components/seo"

export default function MainCategory({ pageResources }) {
  const {
    json: {
      pageContext: { mainCategory },
    },
  } = pageResources

  const data = useStaticQuery(graphql`
    query {
      allMarkdownRemark {
        edges {
          node {
            frontmatter {
              categories {
                mainCategory
                subCategory
              }
            }
          }
        }
      }
    }
  `)

  const {
    allMarkdownRemark: { edges },
  } = data

  const filteredEdges = edges.filter(
    edge =>
      edge.node.frontmatter.categories &&
      edge.node.frontmatter.categories[0].mainCategory.toLowerCase() ===
        mainCategory.toLowerCase(),
  )

  const subCategoryList = new Set()
  filteredEdges.map((edge, i) => {
    subCategoryList.add(edge.node.frontmatter.categories[0].subCategory)
  })

  return (
    <Layout sub={subCategoryList}>
      <Seo title={mainCategory} />
      <div className="main-category">
        <div className="container">
          {[...subCategoryList].map((name, i) => (
            <Link to={`/subCategory/${name}`} className="item" key={i}>
              <img src={folder} alt="folder" className="folder-img" />
              <span>{name}</span>
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  )
}
