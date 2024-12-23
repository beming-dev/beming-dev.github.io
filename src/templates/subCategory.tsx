import { graphql, useStaticQuery } from "gatsby";
import * as React from "react";
import Layout from "../components/Layout";
import CategoryItemHorizon from "../components/CategoryItemHorizon";

export default function SubCategory({ pageResources }: any) {
  const {
    json: {
      pageContext: { subCategory, mainCategory },
    },
  } = pageResources;

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
  `);

  let posts = data.allMarkdownRemark.edges.filter(
    (edge) =>
      edge.node.frontmatter.categories &&
      edge.node.frontmatter.categories[0].subCategory.toLowerCase() ===
        subCategory.toLowerCase() &&
      edge.node.frontmatter.categories[0].mainCategory.toLowerCase() ===
        mainCategory.toLowerCase()
  );

  const filteredEdges = data.allMarkdownRemark.edges.filter(
    (edge) =>
      edge.node.frontmatter.categories &&
      edge.node.frontmatter.categories[0].mainCategory.toLowerCase() ===
        mainCategory.toLowerCase()
  );

  const subCategoryList = new Set();
  filteredEdges.map((edge, i) => {
    subCategoryList.add(edge.node.frontmatter.categories[0].subCategory);
  });

  return (
    <Layout sub={subCategoryList}>
      {/* <Seo title={subCategory} /> */}
      <div className="mt-16">
        {/* <span className="category-title">{params.frontmatter__categories}</span> */}
        <div className="flex flex-col items-center justify-center">
          {posts.map((post: any, i: number) => (
            <CategoryItemHorizon key={i} info={post.node} />
          ))}
        </div>
      </div>
    </Layout>
  );
}
