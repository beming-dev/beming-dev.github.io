---
thumbnail: default.jpg
slug: "/blog/redis/streams"
date: "2025-02-22"
title: "Redis Streams"
categories:
  - mainCategory: "Resource"
    subCategory: "redis"
---

Stream 데이터 타입은, 지금까지 본 데이터 타입과는 많이 다릅니다.
list와 sorted set이 섞인 형태라고 볼 수 있습니다.
주로 서로 다른 서버 간 통신이 필요할 때 많이 사용합니다.

## 동작 원리

Message Producer -> Redis(stream) -> Message consumer
와 같은 흐름을 가집니다.

1. Producer가 message(Hash) 생성
2. Redis의 Stream에 저장되고, ID(UNIX Timestamp)가 부여됨
3. Consumer가 message 요청하면 전송. message를 전송해도 stream에 그대로 남아있음.

## 사용 예시

만약 A@gmail.com으로 메일을 보내달라는 요청이 들어왔다고 생각해봅시다.
우리의 서버는 그 요청을 Third Party Email API로 전송하고 응답을 기다릴 것입니다.
Third Party Email API에서 메일을 보내는 데에는 약간의 시간이 필요하므로, 그 기간동안 처음 들어온 요청은 대기하고 있을 것입니다.
요청이 대기 상태로 있는건 그렇게 좋은 상황은 아닙니다.
Stream을 사용해 요청을 대기 상태에 두지 않고 처리할 수 있습니다.
요청을 stream에 달아두고 응답을 반환하는 것이죠. 그럼 Email API가 비어있을 때 요청을 가져다 처리하면 됩니다.

## 명령어

### XADD
XADD \[key] * \[key] \[value] \[key] \[value]
- * 표시는 Redis에게 key를 생성해 달라는 의미입니다.
- 첫 key는 stream의 key를 의미합니다.
- 뒤의 key value는 Hash에서와 같이 key value를 저장하는 것입니다.

### XREAD
XREAD STREAMS \[key] \[range]
- range는 0-0와 같은 형태를 띕니다. 0-0는 stream의 모든 message를 읽겠다는 의미입니다. timestamp를 넣어 범위를 지정할 수 있습니다.

XREAD COUNT 2 STREAMS \[key] \[range]
- XREAD와 STREAMS사이에 COUNT N을 넣으면 N개만 읽어올 수도 있습니다.
