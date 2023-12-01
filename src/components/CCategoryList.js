import { Link, graphql, useStaticQuery } from "gatsby"
import React from "react"
import "./CCategoryList.scss"

const CCategoryList = () => {
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
  `)

  const PARA = [
    {
      name: "Project",
      explain:
        "목표와 데드라인이 명확한 것들을 모아둔 폴더입니다. 현재 진행중인것들이기도 합니다.",
    },
    {
      name: "Area",
      explain:
        "목표와 데드라인은 없지만 장기간에 걸쳐 꾸준히 신경써야 하는 것들을 모아둔 폴더입니다.",
    },
    {
      name: "Resource",
      explain: "최근에 관심이 가는 주제들을 모아둔 폴더입니다.",
    },
    {
      name: "Archive",
      explain: "완료된, 더이상 필요없는 것들을 모아둔 폴더입니다.",
    },
  ]
  return (
    <div className="template">
      <div className="category-box">
        {PARA.map((category, i) => (
          <Link
            to={`/mainCategory/${category.name.toLowerCase()}`}
            className="category-item"
            key={i}
          >
            <span className="name">{category.name}</span>
            <span className="explain">{category.explain}</span>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default CCategoryList
