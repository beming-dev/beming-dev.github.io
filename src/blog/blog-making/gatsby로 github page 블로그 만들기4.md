---
thumbnail: gatsby.jpg
slug: "/blog/gatsby04"
date: "2022-10-01"
title: "gatsby로 블로그 만들기 04"
categories:
  - mainCategory: "Area"
    subCategory: "blog"
typora-copy-images-to: ..\images
typora-root-url: ..\images
---

component에서 graphql 데이터 불러오기

우리는 src/pages에 있는 파일들에서 graphql을 사용할 때 아래와 같은 방법을 사용했다.

```
export const pageQuery = graphql`
  query ($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
      }
    }
  }
`
```

그러나 src/components의 component에서 위와같은 방법으로 접근하려 하면 오류가 발생한다. 따라서 우리는 gatsby에 포함돼 있는 useStaticQuery를 사용해서 graphql을 사용해야 한다. 예시를 한번 보자.

```
import React from "react"
import { graphql, useStaticQuery, Link } from "gatsby"
import CategoryItem from "./CategoryItem"
import "./CategoryList.scss"

const CategoryList = ({ category }) => {
  const data = useStaticQuery(graphql`
    query {
      allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
        edges {
          node {
            frontmatter {
              thumbnail
              categories
              date
              slug
              title
            }
          }
        }
      }
    }
  `)
  let { allMarkdownRemark } = data
  let { edges } = allMarkdownRemark
  edges = edges.filter(edge => edge.node.frontmatter.categories === category)

  return (
    <div className="category-list">
      <span className="name">
        <Link to={`/${category}`}>{category}</Link>
      </span>
      <div className="items">
        {edges.map((edge, i) => (
          <CategoryItem key={i} info={edge.node.frontmatter} />
        ))}
      </div>
    </div>
  )
}

export default CategoryList

```

그냥 component안에서 return전에 useStaticQuery로 graphql을 사용하고 결과를 변수에 저장하면 변수를 통해서 모든 데이터에 접근할 수 있다.

끝이다.
