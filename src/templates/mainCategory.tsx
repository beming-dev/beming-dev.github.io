import { Link, graphql, useStaticQuery } from "gatsby";
import * as React from "react";
import Layout from "../components/Layout";
import { StaticImage } from "gatsby-plugin-image";

export default function MainCategory({ pageResources }: any) {
  const {
    json: {
      pageContext: { mainCategory },
    },
  } = pageResources;

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
  `);

  const {
    allMarkdownRemark: { edges },
  } = data;

  const filteredEdges = edges.filter(
    (edge: any) =>
      edge.node.frontmatter.categories &&
      edge.node.frontmatter.categories[0].mainCategory.toLowerCase() ===
        mainCategory.toLowerCase()
  );

  const subCategoryList = new Set();
  filteredEdges.forEach((edge) => {
    subCategoryList.add(edge.node.frontmatter.categories[0].subCategory);
  });

  return (
    <Layout sub={subCategoryList}>
      <div className="w-full h-full flex justify-center items-center flex-wrap">
        {[...subCategoryList].map((name: any, i) => (
          <Link
            to={`/subCategory/${name}`}
            className="w-1/3 m-10 flex flex-col justify-center items-center"
            key={i}
          >
            <StaticImage
              src="../images/folder.png"
              alt="folder"
              className="w-24"
            />
            <span className="mt-2 text-center">{name}</span>
          </Link>
        ))}
      </div>
    </Layout>
  );
}
