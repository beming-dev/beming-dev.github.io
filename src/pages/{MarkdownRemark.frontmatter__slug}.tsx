import { graphql } from "gatsby";
import * as React from "react";
import Layout from "../components/Layout";

export default function BlogPostTemplate({ data: { markdownRemark } }: any) {
  const { frontmatter, html, tableOfContents } = markdownRemark;
  return (
    <Layout>
      <div className="w-full flex flex-col md:flex-row mt-12 md:mt-0">
        <div className="w-full md:w-4/5 mx-auto mt-24 max-w-4xl flex flex-col items-center">
          <h1 className="text-2xl md:text-3xl font-bold text-center">
            {frontmatter.title}
          </h1>
          <h2 className="text-sm text-gray-500 text-center">
            {frontmatter.date}
          </h2>
          <span
            className="w-full my-12 prose prose-lg prose-headings:underline prose-h1:decoration-solid prose-h1:underline-offset-4 prose-h2:decoration-dashed prose-h2:underline-offset-4"
            dangerouslySetInnerHTML={{ __html: html }}
          ></span>
        </div>
        <div
          className="hidden md:block min-w-[150px] max-w-[150px] overflow-hidden text-ellipsis whitespace-nowrap break-words"
          dangerouslySetInnerHTML={{ __html: tableOfContents }}
        />
      </div>
    </Layout>
  );
}

export const pageQuery = graphql`
  query ($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
      }
      tableOfContents
    }
  }
`;
