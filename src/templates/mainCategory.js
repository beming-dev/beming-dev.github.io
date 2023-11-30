import { graphql, useStaticQuery } from "gatsby"
import * as React from "react"
import "../styles/mainCategory.scss"
import MobileNav from "../components/MobileNav"
import Navigation from "../components/Navigation"
import Layout from "../components/Layout"

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

  edges.filter(() => true)
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
      <div className="main-category">
        <div className="container">
          {[...subCategoryList].map((name, i) => (
            <a href={`/subCategory/${name}`} className="item" key={i}>
              <img src="/folder.png" className="folder-img" />
              <span>{name}</span>
            </a>
          ))}
        </div>
      </div>
    </Layout>
  )
}
