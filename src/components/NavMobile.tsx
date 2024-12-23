import React from "react";
import { graphql, useStaticQuery, Link } from "gatsby";

export default function NavMobile({ sub, always }: any) {
  const data = useStaticQuery(graphql`
    query {
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

  return (
    <div
      className={`flex w-full flex-col items-center z-10 transition duration-1000 flex ${
        always ? "" : "md:hidden"
      }`}
    >
      <span className="text-3xl font-bold my-9">
        <Link to="/">Beming-dev</Link>
      </span>
      <div className="w-full max-w-fit mx-auto mt-7 flex overflow-x-scroll scrollbar-hide">
        {sub
          ? [...sub].map((category, i) => (
              <li key={i} className="mx-5">
                <Link to={`/subCategory/${category.toLowerCase()}`}>
                  {category}
                </Link>
              </li>
            ))
          : data.allMarkdownRemark.group.map((category: any) => (
              <li key={category.fieldValue} className="mx-5">
                <Link to={`/mainCategory/${category.fieldValue.toLowerCase()}`}>
                  {category.fieldValue}
                </Link>
              </li>
            ))}
      </div>
    </div>
  );
}
