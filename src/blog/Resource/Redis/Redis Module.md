Redis Module이란, redis에 로딩할 별도의 프로그램을 말합니다.

우리는 그 중 유명한 RedisJSON과 RedisSearch를 알아봅시다.

Redis Module을 사용하기 위해서는 각 Module을 다운받아 Redis에 통합하는 과정이 필요합니다.
그러나 이는 매우 번거로워 다른 방법을 사용하는걸 추천합니다.

1. Redis Stack사용하기: Redis Stack은 주요 Module들을 포함하여 Redis를설치할 수 있게 해줍니다.
2. Redis cloud 사용하기: cloud에서 제공하는 관리형 redis를 사용하면 제약없이 Module에 접근할 수 있습니다.

# Redisearch

redis에서 다향한 hash로 이뤄진 데이터에서 검색을 하는 작업은 꽤 번거롭습니다.
Redisearch를 사용하면, 다양한 데이터 타입을 유지할 필요없이 다양한 해시 데이터를 검색 할 수 있습니다. 또한 다양한 기준으로 검색할 수도 있습니다.

1. Index 생성 (FT.CREATE)
2. query 실행 (FT.SEARCH)

## index
index를 생성할 때는 먼저 검색할 레코드를 지정해야 합니다.
특정 문자열을 제공하면, 그 문자열로 시작하는 모든 hash를 검색합니다.
예를들어, items#을 제공하면 items#로 시작하는 모든 hash를 찾습니다. 

Redisearch의 예시를 위해 예시 데이터를 아래와 같이 만들어봅시다.
```redis
HSET cars#a1 name 'fast car' color red year 1950
HSET cars#b1 name 'car' color red year 1960
HSET cars#c1 name 'old car' color blue year 1970
HSET cars#d1 name 'new car' color blue year 1980
```
## FT.CREATE
```
FT.CREATE idx:cars ON HASH PREFIX 1 cars#
	 SCHEMA name TEXT year NUMERIC color TAG
```
- idx:cars는 key를 의미합니다.
- ON HASH는 우리가 찾으려는 데이터 타입입니다. HASH혹은 JSON만 가능합니다.
- PREFIX 1 cars#: cars#로 시작하는 모든 record를 찾으라는 명령입니다. 여러 개의 key로 검색하고 싶다면, 1을 n으로 변경 후 뒤에 적어주면 됩니다.
- SCHEMA는 Hash안에서 찾길 원하는 속성을 설명합니다. 필드의 이름, 타입 을 반복해서 적습니다.

## 타입
- NUMERIC: 숫자를 의미합니다.
- GEO: 지리적 좌표를 의미합니다.
- VECTOR: 레코드들 간의 유사성을 찾을 수 있게 합니다.
- TAG: 문자열의 query에 사용됩니다.
- TEXT: 문자열의 search에 사용됩니다.
### Querying과 Searching의 차이

- Querying은 주어진 조건과 완전히 일치하는 것을 찾는 것입니다.
- Searching은 정확하지 않아도 근접한 것들을 찾는다는 개념입니다.

TEXT를 사용하면 Redis가 단순 검색을 넘어 내부적으로 추가적인 연산을 합니다.

## FT.SEARCH

FT.SEARCH \[key] \[query] \[query]
```
FT.SEARCH idx:cars '@name:(fast car)'
```
```
FT.SEARCH idx:cars '@color:{blue}'
```
```
FT.SEARCH idx:cars '@year:[1955, 1980]'
%% +inf, -inf, ( 사용 가능 %%
query 앞에 -를 사용하면 제외하고 검색
```
- query를 작성할 때는 항상 @다음에 필드이름을 작성해줍니다.
- query를 여러개 이어 작성할 수 있습니다.
- (): TEXT
- {}:TAG
- \[]:NUMBER
을 위해 사용합니다.

### Number query
- @year: \[1955 1980] : 기본
- @year: \[(1955 (1980]: 경계값 미포함
- @year: \[-inf  +inf]: 양의 무한대, 음의 무한대
- -@year: \[1955 1980]: 범위 제외하고 검색

### Tag query
- @color{blue}: 기본
- -@color{blue}: blue제외하고 검색
- @color{red | blue}: or
- @color{light\\ blue}: 공백 포함하려면 백슬래시 필요

추가로 알아둬야 할 것은 Tag query에 사용할 수 없는 단어가 있습니다.
a, is, the, an, and등의 언어들이 Tag query에 포함되면 자동으로 제거됩니다.

예를 들어, @cities:{to|a|or}은 @cities:{}와 같습니다.

### Text query

- fast: 'fast'로 모두 검색
- @name:(%fast%): 문자 1개의 불일치 허용. 최대 3개까지 %로 감쌀 수 있다.
- @name:(fa*): fa로 시작하는 모든 것 검색. * 앞에 최소한 2개의 문자가 와야 한다.
- @name:(fast car): 'fast' and 'car' 포함하는 것 검색
- @name:(fast | car): 'fast'or 'or' 포함하는 것 검색
- -@name:(fast): 'fast'로 검색되는 것 제외하고 검색

Text query를 작성할 때, query의 내용에 전처리가 들어갑니다.
예를 들어,  'a fast, fast car!'이라는 query로 검색한다면 전처리가 되어 \[fast, fast, car]이 query로 들어갑니다.

추가로, stemming 기법이 사용됩니다. 
fasting, fastly, fasts 와 같은 단어는 모두 fast와 같은 단어로 취급됩니다.

### 실제 사용

실제 환경에서 사용할 때, 유저가 검색한 값을 query에 집어넣어야 할겁니다.
query에 유저가 입력한 문자열을 사용하기 위해서는 전처리가 필요합니다.

사용자가 fast ca라는 문자열을 입력했다고 가정합시다.
1. 공백 기준 분리: \['fast', 'car']
2. 마지막 문자에 * 붙히기, 혹은 %사용: \['fast*', 'car*']
3. | 로 묶기 혹은 and로 묶기: fast* | ca*

정해진 것은 없지만, 위와 같은 방법으로 전처리를 할 수 있습니다.