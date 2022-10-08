---
thumbnail: gatsby.jpg
slug: "/blog/gatsby01"
date: "2022-09-28"
title: "gatsby로 블로그 만들기 01"
categories: "blog"
typora-copy-images-to: ..\images
typora-root-url: ..\images
---

이전에 github pages와 jekyll을 이용해서 블로그를 만든적이 있는데, 글을 안쓴지 좀 오래됐다. 앞으로 다시 포스팅을 작성하려 하는데 그 전에 블로그를 한번 리메이크 하고 싶었다. jekyll로 만든 블로그를 그냥 수정해서 사용해도 되지만, 그동안 react에 대해 많이 공부하기도 했고, gatsby가 더 좋다는 말을 어디선가 들어서 이 참에 gatsby로 블로그를 만들어 보기로 했다.
gatsby에 대해 아예 백지 상태에서 진행해야 됐기 때문에 좀 애를 먹었지만, 공식 문서가 나름 따라하기 쉽게 돼있어서 적당히 구글링 하며 만들었더니 3일 정도만에 나름 블로그 형태를 갖춘 블로그를 만들 수 있었다.(디자인은 하지 않았지만..)
공식문서는 전부 영어로 작성되어 있었고 한글 자료는 많지 않았어서 내가 블로그를 만들었던 과정을 한번 기록해보려 한다.

1. 설치

```
npm install -g gatsby-cli
```

기존에 만들어져 있는 테마를 사용하려면 아래 방법으로 프로젝트를 만들고,

```
gatsby new "폴더 이름" "테마 경로"
```

처음부터 본인이 만드려면 아래 방법으로 프로젝트를 만들면 된다.

```
gatsby new "폴더 이름"
```

나는 처음부터 만들고 싶어서 후자의 방법을 선택했다.

위 과정을 끝내면 다음과 같은 파일 구조가 만들어진다.
(이미지)

2. 실행
   cd "폴더이름" 으로 생성된 폴더로 이동한 다음, gatsby develop을 실행하면 로컬에서 개발상황을 확인할 수 있다.
   실행하면 cmd창에
   http://localhost:8000/
   http://localhost:8000/\_\_\_graphql
   이렇게 두 개의 주소가 안내된다.
   첫번째 주소로 개발 상황을 확인할 수 있고, 두번째 주소로 graphql로 가져올 수 있는 데이터의 구조를 확인할 수 있다.

3. 구조
   설치된 폴더의 구조를 간단히 살펴보자. 먼저, src/pages폴더의 page-2.js, using-ssr.js파일은 지워줘도 상관없다.
   우리는 src/components의 header.js, layout.js와 src/pages의 index.js정도를 수정하고 몇개의 파일을 추가해서 블로그를 만들것이다.

gatsby에서는 src/pages폴더에 파일을 추가하면 그 파일의 이름이 url의 경로가 된다. 예를들어 src/pages/hello.js 파일을 생성하면 http://localhost:8000//hello로 접속했을 때 이 페이지의 내용이 표시된다. next.js를 사용해 봤다면 쉽게 적응할 수 있을 것이다.

먼저, layout.js는 말그대로 이를 사용한 모든 페이지에 적용되는 레이아웃이다. props로 children을 받아 return하기 때문에

```
<Layout>
	contents
</Layout>
```

이와같은 형태로 page를 작성하면 contents부분이 Layout component의 {children}부분에 들어간다. 이 component에 모든 페이지에 적용될 것들을 넣어두면 중복하여 작성하지 않아도 된다.

다음으로, header.js는 말그대로 페이지의 header부분을 나타낸다. react를 사용해서 꾸미고 싶은 header 형태로 꾸며주면 된다. 기본적으로 layout.js에 포함돼있기 때문에 모든 페이지에 표시된다.

마지막으로 index.js는 처음 내 블로그에 접속했을 때 보여질 페이지이다. 위에서 설명했던 것처럼

```
<Layout>
	contents
</Layout>
```

구조이기 때문에 Layout 태그 안의 내용을 수정하여 꾸미면 된다.
