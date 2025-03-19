---
thumbnail: default.jpg
slug: "/blog/redis/use"
date: "2025-02-18"
title: "Redis 사용하기"
categories:
  - mainCategory: "Resource"
    subCategory: "redis"
---

# Redis design

Redis를 사용할 때, 기존의 데이터베이스를 사용할 때와는 다르게 접근해야 합니다.
## SQL database
1. 데이터를 테이블에 집어넣는다.
2. 어떻게 query해 사용할지 생각한다.

## Redis
1. 답을 얻기 위해 어떤 query가 필요한지 생각한다.
2. query에 맞게 데이터를 넣는다.


# 명령어 

## 해시

Key-Value 쌍으로 저장할 수 있는 데이터입니다.
중첩하거나 배열 값을 가질 수는 없습니다.

다양한 속성이 묶인 item이 있을 때 해시 구조로 저장합니다.

### HSET
HSET \[key] \[key1] \[value] \[key2] \[value]
ex) HSET company name 'Hello Co' age 1915
	 company -> name: 'Hello Co', age: 1915

- 추가로 알아두어야 할 것은, node-redis와 같은 라이브러리를 사용할 때, null값이 있다면 에러가 발생할 수 있습니다. node-redis 내부적으로 .toString()을 호출하기 때문인데, null || '' 와 같이 사용해주어야 합니다.
### HGET
HGET \[key] \[key1]
ex) HGET company name // 'Hello Co'

HGETALL company // {name 'Hello Co', age 1915}

- HGETALL을 할 때, 존재하지 않는 키에 대해 실행하면 {} 빈 Object를 응답으로 받습니다. 이 부분을 유의해서 처리해야 합니다.
### HEXISTS
HEXISTS \[key] \[key1]
key 값 안에 key1의 값이 존재하는지 확인합니다.
ex) HEXISTS company name // 1

### DEL, HDEL
DEL \[key]
key에 저장된 값을 삭제합니다.
ex) DEL company

HDEL \[key] \[key1]
필드 하나만 삭제합니다.
ex) HDEL company name

### HINCRBY, HINCRBYFLOAT

HINCRBY \[key] \[key1] \[value]
value만큼의 값을 key1 값에 추가합니다.
해시에 키가 존재하지 않으면 생성합니다.

HINCRBYFLOAT \[key] \[key1] \[value]
value(실수)만큼의 값을 key1 값에 추가합니다.
해시에 키가 존재하지 않으면 생성합니다.

### HSTRLEN
HSTRLEN \[key] \[key1]
key1의 길이를 반환합니다. string이 아니면 0을 반환합니다.

### HKEYS, HVALS
HKEYS \[key]
key에 저장된 값의 key들을 가져옵니다.

HVALS \[key]
key에 저장된 값의 value들을 가져옵니다.

## Set

문자열의 집합을 저장합니다. 중복값은 저장되지 않습니다.

### SADD
SADD  \[key]\[value]
key 이름으로 set을 생성하고, value를 저장합니다.
중복 값은 저장되지 않으므로, 저장이 성공하면 1, 실패하면 0을 반환합니다.
### SMEMBERS
SMEMBERS \[key]
key에 저장된 모든 값을 반환합니다.

### SUNION
SUNION \[key1] \[key2] \[key3] ...

합집합을 반환하는 명령입니다.

SUNIONSTORE \[key] \[key1] \[key2] \[key3] ...
명령으로 새로운 key에 바로 저장할 수 있습니다.

### SDIFF
SDIFF \[key1] \[key2] \[key3] ...

key1의 집합에서 key2이후의 key들의  집합을 뺍니다.
차집합을 반환하는 명령입니다.

SDIFFSTORE \[key] \[key1] \[key2] \[key3] ...
명령으로 새로운 key에 바로 저장할 수 있습니다.

### SINTER
SINTER \[key1] \[key2] \[key3] ...

교집합을 반환하는 명령입니다.

SINTERSTORE \[key] \[key1] \[key2] \[key3] ...
명령으로 새로운 key에 바로 저장할 수 있습니다.

### SISMEMBER
SISMEMBER \[key] \[value]

key에 value가 존재하면 1 존재하지 않으면 0을 반환합니다.

### SMISMEMBER
SMISMEMBER \[key] \[value1] \[value2] \[value3] ...

key에 각 value가 존재하는지를 배열로 반환합니다.

### SCARD
SCARD \[key]

key의 크기(요소의 개수)를 알려줍니다.

### SREM
SCARD \[key] \[value]

key 집합에서 value를 제거합니다.

### SSCAN
SSCAN \[key] \[cursorID] \[#of elements]
ex) SSCAN items 0 COUNT 2
\[ 
	"3",
	\[
		"orange",
		"red"
	]
]

cursor 값으로 부터 n개 값을 읽어옵니다.
반환값에 다음 cursor가 포합됩니다.
SMEMBERS로 데이터를 읽어오기에는 너무 많은 데이터가 있을 때 사용하면 좋습니다.

## 정렬집합

정렬집합은 hash와 같이 key value 같이 생긴 값을 내부에 갖습니다.
하지만 key value 라고 부르지는 않고, member score라 부릅니다.
member값은 고유해야 합니다.
score는 항상 숫자여야 하고, 내부적으로 score를 기준으로 오름차순으로 정렬됩니다.

### ZADD
ZADD \[key] \[score] \[member]
key값의 정렬 집합에 값을 저장합니다.

### ZSCORE
ZSCORE \[key] \[member]
key값의 정렬 집합에서 member의 score를 가져옵니다.

### ZREM
ZREM \[key] \[member]
key값의 정렬 집합에서 member를 삭제합니다.

### ZCARD
ZCARD \[key]
key의 member 개수를 반환합니다.

### ZCOUNT
ZCOUNT \[key] \[val1] \[val2]
key값의 정렬 집합에서 val1과 val2 사이의 값을 가진 member의 개수를 반환합니다. 경계값은 포함합니다.
- val앞에 ( 를 붙히면 경계값을 포함하지 않습니다.
- -inf, +inf 값을 사용할 수 있습니다.

### ZPOPMIN, ZPOPMAX
ZPOPMIN \[key] \[cnt]
ZPOPMAX \[key] \[cnt]

상위, 하위에서 cnt개수 만큼의 값을 가져와 삭제하고 반환합니다.

### ZINCRBY
ZINCRBY \[key] \[value] \[member]
key값의 정렬집합에서 member의 값을 value만큼 증가시킵니다.
음수를 줄 수도 있습니다.

### ZRANGE
ZRANGE \[key] \[idx1] \[idx2] \[KEYWORD]
key값의 정렬집합에서 idx1~idx2사이의 인덱스를 가진 member를 반환합니다. 
- WITHSCORES키워드를 사용하면 score 값도 같이 반환합니다.
- BYSCORE 키워드를 사용하면 idx를 인덱스로 보지 않고 score로 봅니다.
- REV옵션은 정렬집합을 반대로 정렬한 후 결과를 반환합니다.
- LIMIT a b옵션은 a만큼을 건너뛰고 b개만큼을 반환합니다. BYSCORE와 함께 사용해야 합니다.


## HyperLogLog

HyperLogLog는 요소를 실제로 저장하지 않는 데이터 타입입니다.
내부적으로 복잡한 알고리즘에 의해 문자열을 기억하지만 값이 실제로 저장되지 않습니다.

관련된 명령어가 두 개밖에 없으므로 간편하게 사용할 수 있습니다.

어떨때 사용할 수 있을까요?
만약 상품의 조회수를 증가시킬 때, 사용자 당 한번씩만 증가시키고 싶다고 생각해봅시다.

1. SET을 추가하여 itemID마다 view를 증가시킨 userID를 증가시킨다.
2. HYPERLOGLOG를 사용한다.

1번 방법을 사용하는 것도 가능하지만, item마다 조회한 userID를 저장하면, 엄청난 메모리가 필요할 것입니다. 이건 Redis와는 잘 맞지 않습니다.

HYPERLOG는 안에 값이 얼마나 들어있는지와 상관 없이 12kb만 사용합니다. 하지만 값을 실제로 저장하지 않기 때문에 안에 몇개의 값이 존재하는지 계산하는 명령이 정확하지 않습니다. 대략 0.81%의 에러가 발생한다고 알려져 있습니다.
하지만 조회수를 계산하는데 저정도의 오차는 그렇게 큰 영향이 아닐겁니다. 그래서 조회수와 같은 로직을 위해 HYPERLOGLOG를 사용한다면, 공간을 많이 아낄 수 있습니다.
### PFADD

PFADD \[key]  \[value]
값을 추가합니다.

### PFCOUNT
PFCOUNT \[key] 
요소의 추정적인 개수를 반환합니다.

## LIST
Redis에서 List는 이중 연결 리스트 형태로 저장됩니다.

Redis에서 List는 잘 사용하지 않는게 좋습니다. 비효율적이고, 대부분 다른 데이터 타입으로 더 효율적으로 사용할 수 있습니다.
데이터의 수정 삭제 없이 끝에 계속 추가하는 경우, 수집된 데이터의 마지막 몇 개만 조회하는 경우 정도가 List와 어울립니다.

### LPUSH, RPUSH
LPUSH \[key] \[value]
RPUSH \[key] \[value]
각각 List의 왼쪽, 오른쪽에 값을 추가합니다. List의 항목 개수를 반환합니다.

### LLEN
LLEN \[key]
key에 해당하는 List의 길이를 반환합니다.
### LINDEX
LLEN \[key] \[idx]
idx에 해당하는 값을 가져옵니다.
idx는 음수도 사용할 수 있습니다. -1이 제일 마지막 항목을 의미합니다.
### LRANGE
LRANGE \[key] \[startIdx] \[endIdx]
특정 범위의 값을 가져옵니다.
startIdx와 endIdx에 있는 값을 포함해서 가져옵니다.
### LPOS
LRANGE \[key] \[value]
	RANK
	COUNT
	MAXLEN
key의 list에서 value 값을 찾습니다. RANK의 값으로 N번째, COUNT값으로 N개, MAXLEN 값으로 최대 N개를 찾도록 할 수 있습니다.

### LPOP, RPOP
LPOP \[key]
RPOP \[key]
각각 왼쪽 끝, 오른쪽 끝에서 값을 하나씩 제거합니다.
맨 뒤에 숫자 n을 명시하면 n개를 제거합니다.

### LSET
LSET \[key] \[idx] \[value]
idx위치의 값을 value로 바꿉니다.

### LTRIM
LSET \[key] \[startIdx] \[endIdx]
startIdx에서 endIdx 까지를 남겨두고 나머지는 전부 제거합니다.

### LINSERT
LINSERT \[key] \[BEFORE/AFTER] \[value1] \[value2]
value1값을 찾은 후, 앞이나 뒤에 value2값을 삽입합니다.

### LREM
LREM \[key] \[num] \[value]
value의 값을 num개 제거하는 명령입니다.
num이 양수라면 왼쪽에서 오른쪽으로 찾으며 제거하고,
num이 음수라면 오른쪽에서 왼쪽으로 찾으며 제거합니다.
num에 0을 입력하면 value 전부를 지웁니다.
