import * as React from "react";
import type { HeadFC, PageProps } from "gatsby";
import Layout from "../components/Layout";
import Para from "../components/PARA";
import { Helmet } from "react-helmet";

const pageStyles = {
  color: "#232129",
  fontFamily: "-apple-system, Roboto, sans-serif, serif",
};

const IndexPage: React.FC<PageProps> = () => {
  return (
    <Layout>
      {/* <Helmet>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Helmet> */}
      <main style={pageStyles}>
        <Para />
      </main>
    </Layout>
  );
};

export default IndexPage;

export const Head: HeadFC = () => <title>Home Page</title>;
