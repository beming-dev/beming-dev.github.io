---
thumbnail: gatsby.jpg
slug: "/blog/gatsby05"
date: "2022-10-02"
title: "gatsby로 블로그 만들기 05"
categories: "blog"
typora-copy-images-to: ..\images
typora-root-url: ..\images
---

1. sass, scss 사용하기

먼저 sass와 gatsby 플러그인을 설치해준다.

```
npm install sass gatsby-plugin-sass
```

그 후, gatsby-config.js에 gatsby-plugin-sass를 추가해주면 된다.

```
plugins: [`gatsby-plugin-sass`],
```

2. 이미지 사용하기

먼저, 필요한 플러그인을 설치해준다.

```
npm install gatsby-plugin-image gatsby-plugin-sharp gatsby-source-filesystem gatsby-transformer-sharp
```

그리고 gatsby-config.js파일에 포함시켜준다.

```
module.exports = {
  plugins: [
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`, // Needed for dynamic images
  ],
}
```

이미지는 static image와 dynamic image로 구분할 수 있다.

먼저, static image를 사용하는 방법을 보자.
gatsby를 처음 설치하면 src/pages/index.js파일에 StaticImage 태그로 감싸진 부분을 볼 수 있다.
이것과 같은 방식으로 사용하면 되는데, 이미지를 src/images같은 폴더에 넣어주고 StaticImage를 사용해주면 된다.

```
import { StaticImage } from "gatsby-plugin-image"

export function Dino() {
  return <StaticImage src="../images/dino.png" alt="A dinosaur" />
}
```

외부의 이미지를 사용할 땐 src부분에 url을 적어줘도 된다.

StaticImage태그에는 아래와 같이 사용할 수 있는 여러 옵션이 있다.

```
<StaticImage
      src="../images/dino.png"
      alt="A dinosaur"
      placeholder="blurred"
      layout="fixed"
      width={200}
      height={200}
/>
```

자세한 내용은 아래 사이트에서 확인할 수 있다.
[https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-plugin-image](https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-plugin-image)

다음으로 Dynamic image를 사용하는 방법이다.
Dynamic image를 사용하기 위해서는 graphql로 이미지를 불러와야 한다.

```
query {
  blogPost(id: { eq: $Id }) {
    title
    body
    author
    avatar {
      childImageSharp {
        gatsbyImageData(
          width: 200
          placeholder: BLURRED
          formats: [AUTO, WEBP, AVIF]
        )
      }
    }
  }
}
```

이런식으로 graphql에서 image를 로딩하면 된다. 옵션도 줄 수 있다.
이제 image를 표현하려면 getImage함수와 GatsbyImage태그를 사용하면 된다.

```\import { graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

function BlogPost({ data }) {
  const image = getImage(data.blogPost.avatar)
  return (
    <section>
      <h2>{data.blogPost.title}</h2>
      <GatsbyImage image={image} alt={data.blogPost.author} />
      <p>{data.blogPost.body}</p>
    </section>
  )
}

export const pageQuery = graphql`
  query {
    blogPost(id: { eq: $Id }) {
      title
      body
      author
      avatar {
        childImageSharp {
          gatsbyImageData(
            width: 200
            placeholder: BLURRED
            formats: [AUTO, WEBP, AVIF]
          )
        }
      }
    }
  }
`
```
