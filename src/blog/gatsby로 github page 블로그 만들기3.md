---
thumbnail: gatsby.jpg
slug: "/blog/gatsby03"
date: "2022-09-30"
title: "gatsby로 블로그 만들기 03"
categories: "blog"
typora-copy-images-to: ..\images
typora-root-url: ..\images
---

카테고리 분류하기

markdown으로 작성된 포스트를 읽는 페이지를 만드는 것까지 성공했다면, 카테고리를 구분하는 것도 매우 쉽게 가능하다.

먼저, 우리가 작성했던 포스트의 frontmatter에 categories 필드를 추가해준다.

```
slug: "/blog/my-first-post"
date: "2021-04-09"
title: "My first blog post"
categories: "algorithm"
```

이렇게 해주는 것만으로도 우리는 이제 graphql을 이용해 categories필드의 내용을 불러올 수 있다.

이제 {MarkdownRemark.frontmatter**slug}.js를 만들 때와 마찬가지로 src/pages폴더에 {MarkdownRemark.frontmatter**categories}.js 파일을 만들어주자. 이렇게 파일을 만들면 http://localhost:8000/카테고리이름 의 링크로 접속할 수 있다. {MarkdownRemark.frontmatter**categories}.js안의 내용을 수정해서 페이지를 꾸며주기만 하면 된다.
참고로 페이지에서 전달반은 카테고리의 이름은, props.params.frontmatter**categories에 접근하면 값을 얻을 수 있다.

예시로 내가 만든 {MarkdownRemark.frontmatter\_\_categories}.js 코드를 올려놓겠다.

```
import { graphql } from "gatsby"
import * as React from "react"
import Layout from "../components/layout"
import CategoryItem from "../components/CategoryItem"
import "./categories.scss"

export default function BlogPostTemplate({ data, params }) {
  let posts = data.allMarkdownRemark.edges.filter(
    edge => edge.node.frontmatter.categories === params.frontmatter__categories
  )
  return (
    <Layout>
      <div className="category-page">
        <span className="category-title">{params.frontmatter__categories}</span>
        <div className="category-item-box">
          {posts.map((post, i) => (
            <CategoryItem
              key={i}
              info={post.node.frontmatter}
              categoryPage={true}
            />
          ))}
        </div>
      </div>
    </Layout>
  )
}

export const pageQuery = graphql`
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
`

```

간단히 설명하면 모든 포스트를 불러와서 category이름이 일치하는 것만 필터링하여 화면에 표시해줬다.

마지막으로 다른 페이지에서 graphql을 사용해 categories에 접근하려면 아래의 구문을 통해서 중복없이 어떤 카테고리들이 있는지 뽑아올 수 있다.

```
query {
    allMarkdownRemark(limit: 2000) {
      group(field: frontmatter___categories) {
        fieldValue
        totalCount
      }
    }
  }
```
