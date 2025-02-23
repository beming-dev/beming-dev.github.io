---
thumbnail: default.jpg
slug: "/blog/redis/start"
date: "2025-02-17"
title: "Redis 시작하기"
categories:
  - mainCategory: "Resource"
    subCategory: "redis"
---
# Redis

redis는 데이터베이스입니다.
저장한 데이터를 쿼리로 갖고 온다는 점은 다른 데이터베이스와 다른게 없습니다.
그렇다면 Redis는 어떤점이 다를까요? 왜 Redis를 사용할까요?
답은 간단합니다. 매우 빠르기 때문입니다.

그렇다면 왜 빠를까요?
1. 모든 데이터가 memory에 저장됩니다.
2. 모든 데이터를 아주 단순한 구조(linked list, hash map 등)으로 관리합니다.
3. 다양한 기능이 추가돼있지 않아 단순합니다.

물론 단점도 있습니다.
메모리보다 큰 데이터를 가지고 작업하기 어렵습니다.
Redis의 장점을 누리기 위해, 제한된 공간에서 제한된 기능으로 데이터를 사용하는 법을 배워야합니다.


# Redis 설치
Redis를 사용하는 방법은 두가지가 있습니다.

1. redis.com에서 Redis인스턴스 생성하기
2. 로컬에 설치하기

간편하게 사용하려면 redis.com에서 설치하는게 편하지만, 무료로 사용할때는 메모리 제한이 있습니다.

설치가 완료되면 redis cli 혹은 실행 환경에서 redis가 실행중인 인스턴스 정보를 입력하고 명령어를 입력하면 됩니다.


# 명령어

먼저 기본적인 GET, SET 명령을 봅시다.
```redis
SET message 'Hello world' //"OK"

GET message //'Hello world'
```

GET/SET \[key] \[value] 다음과 같은 형태로 사용하면 key값을 기준으로 value를 저장하고 가져옵니다.

GET/SET 명령은 string, number 타입에만 사용이 가능합니다. List, Hash등 다른 타입데 데이터를 삽입하고 싶다면, 다른 명령을 사용해야 합니다.

명령어에 대한 공식 문서를 확인하고싶다면,
[공식문서](https://redis.io/commands)에서 확인할 수 있습니다.

## SET
SET 명령을 조금 더 자세히 사용해봅시다.
```
SET key value [NX | XX] [GET] [EX seconds | PX milliseconds |
  EXAT unix-time-seconds | PXAT unix-time-milliseconds | KEEPTTL]
```
공식문서에는 다음과 같이 나와있습니다. SET \[key] \[value] 외에도 다양한 옵션이 있는걸 확인할 수 있습니다.

- GET 옵션은, set을 하면서 이전에 저장된 값이 있다면 반환해줍니다.
- XX: redis에 이미 key가 존재할 때만 SET이 실행됩니다.
- NX: redis에 이미 key가 존재하지 않을 때만 SET이 실행됩니다.
- EX/PX: seconds/milliseconds초 후에 데이터를 redis에서 삭제합니다.
- EXAT/PXAT: unix time을 기준으로 그 시간이 지나면 데이터를 redis에서 삭제합니다.

자동으로 데이터를 삭제하는 기능은 왜 필요할까요?
이전에 말했듯이 Redis는 매우 빠릅니다. Redis를 통해 데이터를 접근하면 데이터베이스에 접근하는 것보다 빠르게 접근할 수 있습니다. 

따라서 자주 사용되는 데이터를 Redis에 저장해두고, 특정 시간동안 이를 유지하면 그 시간동안은 Redis를 통해 빠르게 데이터를 조회하는 캐싱 기능을 위해 자동으로 데이터를 삭제하는 기능이 존재합니다.

## SET 추가

- SETEX: SET에 EX 명령을 사용한것과 동일.
- SETNX: SET에 NX 명령을 사용한것과 동일.
- MSET: 여러 key value 동시에 등록. (MSET \[key] \[value] \[key] \[value])
- DEL \[key]: key를 삭제합니다.
- SETRANGE: start인덱스부터의 값을 value로 변경합니다.
	SETRANGE \[key] \[start] \[value]

## GET

- MGET: 여러 key의 값을 배열 형태로 반환해줍니다.
	MGET \[key] \[key] // \["value", "value"\]
- GETRANGE: 저장된 문자열의 start에서 end까지의 index 값만을 가져옵니다.
	GETRANGE \[key] \[start] \[end]

## 숫자 다루기

숫자도 기본적으로 문자열과 같이 GET, SET명령을 사용합니다.
그러나 추가로 숫자에만 사용가능한 명령들이 있습니다.

- INCR \[key]: key의 값을 1 증가시킵니다.
- DECR \[key]: key의 값을 1 감소시킵니다.
- INCRBY \[key] \[value]: key의 값을 value 만큼 증가시킵니다.
- DECRBY \[key] \[value]: key의 값을 value 만큼 감소시킵니다.
- INCRBYFLOAT \[key] \[value]: key의 값을 value(실수) 만큼 증가시킵니다.