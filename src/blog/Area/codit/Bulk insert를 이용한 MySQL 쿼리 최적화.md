---
thumbnail: default.jpg
slug: "/blog/codit/sql"
date: "2025-07-13"
title: "Bulk insert를 이용한 MySQL 쿼리 최적화"
categories:
  - mainCategory: "Area"
    subCategory: "codit"
---

# 문제 상황

뉴스 알림을 보내는 기능은, 코딧 서비스에서 중요한 역할을 합니다.

그 중에는 다음과 같은 로직이 있었습니다.
(실제 사용되는 코드이므로, 코드는 매우 단순화 하였습니다.)

```javascript
async discoverNotification(userId, shopId, /*...*/) {
	for (const datum of retdata) {
		await this.Models.writeNotification(
		userId,
		shopId,
		//...
	}
	return retdata;
}
```

```javascript
async writeNotification(
	userId,
	shopId,
	/...
) {
	const query = `
		INSERT INTO ${table} (
		userId,
		shopId,
		...
		\`order\`
		) VALUES (
		'${userId}',
		'${shopId}',
		//...
		)
	`;

	if (query && query.length > 0) {
		await this.orm.query(query).then(([results, metadata]) => {});
	}
}
```

위의 코드에서는 데이터 하나당 반복문을 돌며 DB에 값을 넣어주고 있습니다.
실제로 코드를 짜다보면, 여러 데이터를 반복문으로 돌며 DB에 넣어주는 로직을 짜는 경우가 자주 생깁니다.

# 어떤 문제가 있을까요?

위 상황에서는 다음과 같은 문제가 발생할 수 있습니다.

1. for 루프 안에서 await를 사용합니다. 알림 개수가 많아지면 전체 실행 시간이 정비례하여 증가합니다.
2. 개별 INSERT마다 DB와의 연결이 필요하고, 네트워크 전송이 필요하므로 네트워크가 병목되고 DB 트랜잭션 관리 부담도 커집니다.
3. 동시에 DB로 여러 요청이 갈 경우 connection pool이 금방 소진됩니다.

2번 문제는 설정에 따라 매번 새 connection이 생기지는 않을 수 있지만, DB가 새 쿼리를 받을 때마다 쿼리 파싱, 계획 수립 비용이 생기고 네트워크 병목이 일어나게 됩니다.

# Bulk Insert를 사용한 해결

MySQL은 여러 레코드를 한번의 쿼리로 DB에 넣을 수 있는 Bulk Insert를 제공합니다.

대충 아래와 같은 형태입니다.

```sql
INSERT INTO notifications(field1, field2, field3, field4)
VALUES
  ('u1', 's1', 'Hello', 1),
  ('u2', 's2', 'World', 2),
  ('u3', 's3', 'Foo',   3);
```

이런 쿼리를 만들어주기 위해서는, 데이터를 위의 형태로 파싱해줘야 합니다.

javascript에서는 아래와 같이 할 수 있습니다.

```javascript
const insertValues = insertList
  .map((item) => {
    return `(
	'${item.userId}',
	'${item.shopId}',
	'${item.country}',
	'${item.type}',
	'${item.uniqId}'
	)`;
  })
  .join(",");
```

이렇게 해주면 Values에 들어갈 형태의 데이터가 만들어집니다.
이제, 이걸 사용해서 하나의 쿼리를 만들어주면 됩니다.

```javascript
const query = `

INSERT INTO ${table} (
userId,
shopId,
country,
type,
number,
) VALUES
${insertValues}
`;
```

# Bulk insert의 이점, 시간 단축

여러번 날리던 쿼리를 이렇게 하나의 쿼리로 처리하면 다음과 같은 이점이 있습니다.

1. 네트워크 왕복 지연 감소
2. DB엔진의 쿼리 처리 비용 감소
3. 트랜잭션 오버헤드 감소

이 외에도 락, 디스크 효율등 다양한 이점을 가지고 있습니다.

그럼 실제로 얼마만큼 효율이 좋아졌을까요?
시간을 확인해보기 위해, 모든 데이터를 기록할 때까지의 시간을 console.time으로 찍어보았습니다.

제가 사용한 코드에서 기존에는 50개의 데이터를 반복문으로 돌며 insert 해줬습니다.
아래는 시간을 찍어보며 테스트 한 결과입니다.

```
default: 1.528s
default: 1.521s
default: 1.594s
default: 1.660s
default: 1.393s
default: 1.468s
default: 1.561s
default: 1.445s
default: 1.387s
default: 1.370s
default: 1.238s
default: 1.473s
```

데이터를 확인해보면 평균 1.5s가 소요되는 것을 확인할 수 있습니다.

이제 bulk insert를 적용한 시간을 봅시다.

```
default: 488.031ms
default: 469.722ms
default: 353.171ms
default: 369.206ms
default: 625.083ms
default: 414.684ms
default: 729.071ms
default: 363.519ms
default: 435.876ms
default: 368.932ms
default: 535.38ms
default: 348.015ms
default: 368.04ms
default: 455.504ms
```

평균적으로 500ms가 소요되는 것을 확인해볼 수 있습니다.

약 1/3의 시간이 줄었습니다. 한번에 처리하는 데이터의 양이 많아지면 더 큰 효과를 느릴 수 있을것이란걸 기대해볼 수 있습니다.

# Bulk insert의 단점

물론 장점만 있는것은 아닙니다.

1. 단일 쿼리가 너무 커지면 패킷 크기 제한, 메모리 부족 등 문제 발생
2. 하나의 레코드에 에러가 나면 전체 쿼리 롤백
3. 롤백 비용이 커짐

이러한 문제들이 있는데, 이 문제들은 간단히 해결이 가능합니다.

# Bulk insert 개선

먼저, 단일 쿼리가 너무 커지면 패킷 크기 제한에 걸리거나 메모리가 부족하거나 롤백 비용이 커지는 문제는 어떻게 해결할까요?

당연히 단일 쿼리의 크기를 줄이면 됩니다!

적절한 크기로 Batch 사이즈를 나누고 시스템 자원을 고려해 수백~수천개씩 bulk insert를 날리면 됩니다.

---

다음으로, 하나의 레코드에 에러가 나면 전체 쿼리가 롤백되는 문제는 어떻게 해결할까요?
물론 요구사항에 따라, 전체를 롤백해야 할 수 있습니다.

하지만 저의 경우는 문제가 있는 데이터는 삽입하지 않고, 나머지는 정상적으로 삽입되길 바랐습니다.

이 경우, INSERT에 IGNORE 값을 주면 됩니다

```javascript
const query = `

INSERT IGNORE INTO ${table} (
userId,
shopId,
country,
type,
number,
) VALUES
${insertValues}
`;
```

INSERT IGNORE 구문은, 삽입 중 발생하는 경고 수준의 에러는 무시합니다.
중복 키 충돌과 같은 문제는 무시하고 삽입을 진행합니다.

혹은 ON DUPLICATE KEY 옵션을 줄 수도 있습니다.

```javascript
const query = `

INSERT IGNORE INTO ${table} (
userId,
shopId,
country,
type,
number,
) VALUES
${insertValues}
ON DUPLICATE KEY UPDATE
  userId = VALUES(name);
  ...
`;
```

요구사항에 맞게 적절히 사용하면 됩니다.
