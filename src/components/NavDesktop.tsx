import React from "react";
import { graphql, useStaticQuery, Link } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";

export default function NavDesktop({ sub }: any) {
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
  `);

  console.log(data);
  return (
    <div className="navigation fixed left-0 top-0 h-screen w-72 p-4 box-border transition duration-1000 bg-gray-100 hidden md:block">
      <div className="content flex flex-col items-center justify-center h-full">
        <h2 className="logo text-lg font-bold">
          <Link to="/">Beming-dev</Link>
        </h2>
        <div className="profile flex flex-col items-center my-5">
          <div className="profile-img-wrapper w-30 h-30 rounded-full overflow-hidden mb-2">
            <GatsbyImage
              alt="altImg"
              image={data.allFile?.edges[3].node.childImageSharp.fluid}
            />
          </div>
          <div className="contacts flex space-x-4">
            <div
              className="img-wrapper cursor-pointer w-8 h-8"
              onClick={() => {
                window.open("mailto:mingfordev@gmail.com");
              }}
            >
              <GatsbyImage
                alt="altImg"
                image={data.allFile?.edges[0].node.childImageSharp.fluid}
              />
            </div>
            <div className="img-wrapper w-8 h-8">
              <a href="https://github.com/beming-dev">
                <GatsbyImage
                  alt="altImg"
                  image={data.allFile.edges[1].node.childImageSharp.fluid}
                />
              </a>
            </div>
            <div className="img-wrapper w-8 h-8">
              <a href="https://github.com/beming-dev">
                <GatsbyImage
                  alt="altImg"
                  image={data.allFile.edges[2].node.childImageSharp.fluid}
                />
              </a>
            </div>
          </div>
        </div>
        <div className="category space-y-2">
          {sub
            ? [...sub].map((category, i) => (
                <li key={i}>
                  <Link
                    className="text-blue-600 hover:underline"
                    to={`/subCategory/${category.toLowerCase()}`}
                  >
                    {category}
                  </Link>
                </li>
              ))
            : data.allMarkdownRemark.group.map((category) => (
                <li key={category.fieldValue}>
                  <Link
                    className="text-blue-600 hover:underline"
                    to={`/mainCategory/${category.fieldValue.toLowerCase()}`}
                  >
                    {category.fieldValue}
                  </Link>
                </li>
              ))}
        </div>
        <span className="copyright text-gray-500 mt-4">© copyright 2022</span>
      </div>
    </div>
  );
}
