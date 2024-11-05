import "../styles/subCategory.scss"
import { graphql, useStaticQuery } from "gatsby"
import * as React from "react"
import "../styles/categories.scss"
import CategoryItemHorizon from "../components/CategoryItemHorizon"
import Layout from "../components/Layout"
import Seo from "../components/seo"

export default function SubCategory({ pageResources }) {
  const {
    json: {
      pageContext: { subCategory, mainCategory },
    },
  } = pageResources

  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
        }
      }
      allMarkdownRemark(sort: { frontmatter: { date: DESC } }) {
        edges {
          node {
            html
            frontmatter {
              thumbnail
              categories {
                mainCategory
                subCategory
              }
              date
              slug
              title
            }
          }
        }
      }
    }
  `)

  console.log(1, subCategory)
  let posts = data.allMarkdownRemark.edges.filter(
    edge =>
      edge.node.frontmatter.categories &&
      edge.node.frontmatter.categories[0].subCategory.toLowerCase() ===
        subCategory.toLowerCase() &&
      edge.node.frontmatter.categories[0].mainCategory.toLowerCase() ===
        mainCategory.toLowerCase(),
  )

  const filteredEdges = data.allMarkdownRemark.edges.filter(
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
      <Seo title={subCategory} />
      <div className="category-page">
        {/* <span className="category-title">{params.frontmatter__categories}</span> */}
        <div className="category-item-box">
          {posts.map((post, i) => (
            <CategoryItemHorizon key={i} info={post.node} />
          ))}
        </div>
      </div>
    </Layout>
  )
}
