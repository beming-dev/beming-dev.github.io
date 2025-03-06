import { graphql } from "gatsby";
import * as React from "react";
import NavMobile from "../components/NavMobile";

// 전역으로 폰트를 적용하고 싶다면 Head 컴포넌트(또는 gatsby-browser.js)에 추가
export function Head() {
  return (
    <>
      <title>Blog Post</title>
      <meta name="description" content="Simple and clean blog post layout" />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="anonymous"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap"
        rel="stylesheet"
      />
    </>
  );
}

export default function BlogPostTemplate({ data: { markdownRemark } }: any) {
  const { frontmatter, html, tableOfContents } = markdownRemark;

  return (
    <>
      {/* 상단 네비게이션 */}
      <NavMobile always={true} />

      {/* 전체 컨테이너 */}
      <div className="min-h-screen font-sans text-gray-800 bg-white">
        {/* 본문 최대 너비 지정 및 좌우 여백 설정 */}
        <div className="container mx-auto px-4 py-8 max-w-5xl">
          {/* 본문 영역과 목차 영역을 좌우로 배치 (md 이상일 때) */}
          <div className="flex flex-col md:flex-row gap-8">
            {/* 실제 포스트 콘텐츠 영역 */}
            <main className="w-full md:w-3/4">
              <h1 className="text-3xl md:text-4xl font-bold text-center mb-4 mt-20">
                {frontmatter.title}
              </h1>
              <p className="text-sm text-gray-500 text-center mb-20">
                {frontmatter.date}
              </p>

              {/* Tailwind Typography 플러그인이 적용된 블록(대체로 prose 클래스) */}
              <div
                className="prose prose-lg max-w-none mx-auto"
                dangerouslySetInnerHTML={{ __html: html }}
              />
            </main>

            {/* 목차 영역 (md 이상일 때만 보이도록) */}
            <aside className="toc hidden md:block w-full md:w-1/4 md:sticky md:top-20 border-l border-gray-200 pl-6 self-start">
              <h2 className="text-lg font-semibold mb-4">목차</h2>
              <div
                className="text-sm leading-6 text-gray-600"
                dangerouslySetInnerHTML={{ __html: tableOfContents }}
              />
            </aside>
          </div>
        </div>
      </div>
    </>
  );
}

// 쿼리는 그대로 유지
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
