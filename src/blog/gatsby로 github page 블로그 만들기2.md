---
thumbnail: gatsby.jpg
slug: "/blog/gatsby02"
date: "2022-09-29"
title: "gatsby로 블로그 만들기 02"
categories: "blog"
typora-copy-images-to: ..\images
typora-root-url: ..\images
---

카테고리 나누기, 글 페이지 만들기, scss적용, 이미지, component에서 graphql사용

블로그 기능을 갖추기 위해서는 category를 나누는 기능과 markdown으로 작성한 글을 읽을 수 있는 페이지가 필요하다.

1. 글 읽는 페이지

우리는 github page로 블로그를 호스팅하기 위해 markdown 형식으로 블로그의 글을 작성할 것이다. 그러기 위해선 우리가 markdown으로 쓴 글을 프로젝트의 폴더에 넣어놨을 때 그걸 읽어줄 페이지가 필요하다.
[https://www.gatsbyjs.com/docs/how-to/routing/adding-markdown-pages/](https://www.gatsbyjs.com/docs/how-to/routing/adding-markdown-pages/)
공식문서는 이 페이지에서 확인 가능하다.

먼저,

```
npm install gatsby-source-filesystem
npm install gatsby-transformer-remark
```

으로 gatsby-source-filesystem와 gatsby-transformer-remark 설치해준다.
gatsby-source-filesystem는 local의 filesystem을 gatsby 앱에 포함시켜주기 위해 사용되고, gatsby-transformer-remark는 markdown파일의 frontmatter metadata들을 인식시키고 내용을 html에 포함시켜준다.

참고로 frontmatter이란 YAML로 markdown 파일을 작성하기전에 써주는
"---"로 감싸진 내용을 말한다.

이제 src폴더에 원하는 이름으로 markdown포스트들을 담을 폴더를 만들어준다. 나는 blog라는 이름으로 지어서 src/blog폴더를 만들었다.

다음으로 gatsby-config.js 파일의 plugins 배열에 다음 내용을 추가해준다.

```
plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `blog`,
        path: `${__dirname}/src/blog`,
      },
    },
	 `gatsby-transformer-remark`,
  ],
```

테스트를 위해 markdown 파일 하나를 src/blog폴더에 만들어보자.

```
---
slug: "/blog/my-first-post"
date: "2022-04-09"
title: "My first blog post"
---
my first post. 내 첫글.
```

위에서 말한 frontmatter까지 포함돼있다.

이제 준비는 끝났다. 다음으로 src/pages폴더에 {MarkdownRemark.frontmatter**slug}.js라는 이름의 파일을 만들어주자. 이 이름으로 파일을 만들면 gatsby가 markdown으로 작성된 글의 frontmatter에 포함된 slug의 내용을 읽어서 그 값에 맞는 주소로 페이지를 만들어 준다.
{MarkdownRemark.frontmatter**slug}.js의 내용은 공식 문서의 내용을 그대로 가져와서 써보자.

```
import React from "react"
import { graphql } from "gatsby"
export default function Template({
  data, // this prop will be injected by the GraphQL query below.
}) {
  const { markdownRemark } = data // data.markdownRemark holds your post data
  const { frontmatter, html } = markdownRemark
  return (
    <div className="blog-post-container">
      <div className="blog-post">
        <h1>{frontmatter.title}</h1>
        <h2>{frontmatter.date}</h2>
        <div
          className="blog-post-content"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
    </div>
  )
}
export const pageQuery = graphql`
  query ($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        slug
        title
      }
    }
  }
`

```

끝이다. 이제 http://localhost:8000/blog/my-first-post/로 접속하면 아래와 같이 뜰것이다.
(이미지)

간혹 옛날에 쓴 블로그들의 글을 보면 gatsby-node.js의 내용을 수정해서 글 페이지를 만들던데, 검색해본 결과 그 방법은 이제 사용하지 않는 것 같다. 나도 옛날 글들을 보고 헷갈려서 많이 헤맸었다.

위의 코드를 보면 export const pageQuery부분에 graphql을 사용한 것을 볼 수 있다. gatsby에서는 graphql을 사용해서 데이터를 가져온다고 한다. 나도 graphql은 간단하게만 공부해서 자세히 모른지만 gatsby에서 사용하는데 문제는 없었다. 저런식으로 graphql구문을 export해주면 component의 props로 값이 전달된다. 위 예에서는

```
props.data.markdownRemark.frontmatter
props.data.markdownRemark.html
```

로 markdown파일의 내용에 접근할 수 있다.

```
npm run develop
```

을 실행한 후, http://localhost:8000/\_\_\_graphql 에 접속하면 graphql로 접속할 수 있는 데이터들을 전부 볼 수 있고 grapgql구문도 만들어주니 한번씩 확인해보는 것이 좋다.

추가로 src/pages가 아닌 src/components에서 위의 문법처럼 graphql에 접근하면 오류가 발생하므로 다른 방법으로 접근해야 하는데 다음에 설명하겠다. 다음 포스트에서는 카테고리를 만드는 방법에 대해 설명해보겠다.
