import React from "react";
import { graphql, useStaticQuery } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";

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
  `);

  return (
    <div className="w-full h-30 flex flex-col items-center justify-center transition duration-1000">
      <div className="flex mb-2">
        <div
          className="cursor-pointer w-10 h-10 mx-2"
          onClick={() => {
            window.open("mailto:mingfordev@gmail.com");
          }}
        >
          <GatsbyImage
            alt="altImg"
            image={data.allFile.edges[0].node.childImageSharp.fluid}
          />
        </div>
        <div className="w-10 h-10 mx-2">
          <a href="https://github.com/beming-dev">
            <GatsbyImage
              alt="altImg"
              image={data.allFile.edges[1].node.childImageSharp.fluid}
            />
          </a>
        </div>
        <div className="w-10 h-10 mx-2">
          <a href="https://github.com/beming-dev">
            <GatsbyImage
              alt="altImg"
              image={data.allFile.edges[2].node.childImageSharp.fluid}
            />
          </a>
        </div>
      </div>
      <span className="text-gray-600">© copyright 2022</span>
    </div>
  );
};

export default Footer;
