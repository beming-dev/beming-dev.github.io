---
thumbnail: default.jpg
slug: "/blog/redis/relation"
date: "2025-02-19"
title: "Redis 관계형 데이터"
categories:
  - mainCategory: "Resource"
    subCategory: "redis"
---

# 관계형 데이터

redis에서 관계형 데이터를 어떻게 다룰까요?

1. id의 list를 가져온 후 list를 이용해 id에 맞는 데이터 가져오기
2. SORT사용하기

1번 방법을 사용하면 Redis에 두번 요청을 보내게 됩니다.SORT를 사용하는 방법에 대해 알아봅시다.

## SORT

SORT 명령어는 이름과 다르게 꼭 정렬할때만 사용하지는 않습니다.

다음과 같은 데이터를 예시로 만들어봅시다.
```
HSET books:good title 'Good book' year 1950
HSET books:bad title 'Bad book' year 1930
HSET books:ok title 'OK book' year 1940

ZADD books:likes 999 good
ZADD books:likes 0 bad
ZADD books:likes 40 ok
```

여기서 한가지 알아둬야할 것은, 정렬집합에 SORT를 사용할 때, 정렬집합의 member를 SORT에서는 score라 부릅니다. 매우 헷갈리죠.

### 정렬하기
```
SORT books:likes ALPHA // ["bad", "good", "ok"]
```
- ALPHA는 alphabet순으로 정렬하라는 의미입니다.

### BY 사용
```
SORT books:likes BY books:*->year // ["bad", "ok", "good"]
```
1. 정렬 집합에서 member를 전부 추출한다.
2. books:\*->year \* 위치에 모든 값을 순회하며 집어넣는다. 즉, 이 과정에서 books:good, books:ok, books:bad 키를 가진 HASH를 전부 순회하게 된다. 
3. 순회한 결과에서 year값을 가져온 후, 그 값을 기준으로 정렬한다.

이 과정이 관계형 데이터를 처리하는 것과 같은 효과를 냅니다.
BY에 nosort라는 특수한 값을 사용할 수도 있습니다.

## 예시

item을 조회수를 기준으로 정렬하여 가지고 오고싶은 상황이라 생각해봅시다.

여기서는 node-redis를 이용하여 예를 들겠습니다.

```javascript
const results = await client.sort(
	itemsByViewsKey(), // return 'items#views'
	{
		GET:[
			'#',
			`${itemsKey('*')} -> name`,
			`${itemsKey('*')} -> views`
		],
		BY: 'score'
	}
);
```
- \#는 원래의 member를 포함하겠다는 뜻입니다.
- itemsByViewsKey와 itemsKey함수는 각각 정의해둔 key를 반환하는 함수입니다.

간단히 설명해보자면, items#views를 key로 가지는 정렬집합에서 score값(views) 기준으로 정렬한다음 원래의 member(id), name, views 값을 itemsKey를 key로 가지는 hash에서 가져오는 것입니다.
