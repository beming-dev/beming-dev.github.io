---
thumbnail: default.jpg
slug: /blog/about/pubsub
date: 2025-03-05
title: "Redis 와 Bull을 이용한 메시지 큐 기능 사용.md"
categories:
  - mainCategory: Area
    subCategory: about
---

# 왜 메시지 큐를 사용해야 할까?

About 서비스는 알림을 보내야 하는 다양한 경우가 존재합니다.
메시지 큐를 사용하지 않고 알림 서비스를 운영하면 다음과 같은 문제가 있을 수 있습니다.

1. 알림 전송이 끝날 때까지 기다렸다 응답을 보내면, API 응답 속도가 느려진다.
2. 동시에 많은 요청이 들어오면, 서버의 부하가 증가한다.
3. 장애 발생 시, 재시도가 어렵다.

Nest.js API 서버 - Redis 메시지 큐를 분리하면 이러한 문제들을 한번에 해결할 수 있습니다.

# Redis 서버를 만들어보자

Redis 메시지 큐를 분리하기 위해선 먼저 Redis 서버를 따로 가지고 있어야 합니다.
저는 이전에 생성해두었던 Oracle cloud의 Ubuntu 인스턴스를 사용했습니다.

1. Redis 설치

```shell
sudo apt-get update -y
sudo apt-get install -y redis-server
```

2. Redis 설정
   Redis의 설정 파일은 Ubuntu 기준 /etc/redis/redis.conf 에 위치합니다.
   아래 명령으로 설정 파일을 수정합니다.

```
sudo vim /etc/redis/redis.conf
```

외부 접속을 위한 몇가지 설정을 해줍시다.
아래의 항목들을 찾거나 추가하면 됩니다.

```
bind 0.0.0.0

protected-mode no

requirepass <your_redis_password>
```

설정이 모두 완료되면, Redis를 재시작하여 설정을 적용해줍니다.

```
# Ubuntu
sudo systemctl restart redis-server
```

3. 추가적으로 Linux의 방화벽 설정, cloud 서비스의 VCN을 업데이트 해줍니다.

이렇게 완료되었다면 외부에서 Redis에 접속할 수 있게 됩니다.

# Nest.js에서 Redis를 사용해보자.

Nest.js에는 Bull이라는 Redis 기반의 Queue 시스템을 Nest.js에서 간편하게 사용하도록 만든 BullModule이 존재합니다. 이 BullModule을 사용해서 간편하게 메시지 큐 기능을 구현해봅시다.

먼저, 필요한 라이브러리를 설치해봅시다.

```
npm install @nestjs/bull bull ioredis
```

Redis를 사용할 Module에 Redis 연결 정보를 입력해줍시다.

```javascript
@Module({
  imports: [
    // BullModule 등록
    BullModule.forRoot({
      redis: {
        host: process.env.REDIS_HOST,
        port: parseInt(process.env.REDIS_PORT, 10),
        password: process.env.REDIS_PASSWORD,
      },
    }),
    BullModule.registerQueue({
      name: 'webpush',
    }),
  ],

```

이제 메시지 큐에 데이터를 넣을 Producer와 소비할 Consumer를 추가해봅시다.

## Producer

구독 정보와 payload를 메시지 큐에 넘기는 enqueueWebPush 메소드를 작성해줬습니다.

```typescript
import { InjectQueue } from "@nestjs/bull";
import { Queue } from "bull";

@Injectable()
export class NotificationProducer {
  constructor(@InjectQueue("webpush") private readonly webpushQueue: Queue) {}

  async enqueueWebPush(subscriptions: INotificationSub[], payload: any) {
    await this.webpushQueue.add("sendWebPush", {
      subscriptions,
      payload,
    });
  }
}
```

## Consumer

이제 Consumer를 작성해줍시다.

- 먼저, Consumer에는 Processor annotation이 필요합니다. 여기에 'webpush'를 넣어주면, "webpush" 라는 이름의 큐를 구독하겠다는 의미입니다.
- 다음으로 처리 메소드에, Process annotation과 'sendWebPush'값을 넘겨줍니다. sendWebPush라는 이름의 job을 처리하는 메소드라는 의미입니다.
- 이 Process는 job이라는 매개변수를 받는데, 여기에 Producer가 넘겨주는 값의 정보가 포함돼 있습니다.

```typescript
import { Processor, Process } from "@nestjs/bull";
import { Job } from "bull";
import PushNotifications from "node-pushnotifications";

@Processor("webpush")
export class WebPushConsumer {
  private push: PushNotifications;

  constructor() {
    this.push = new PushNotifications({
      web: {
        /* ...vapid 설정... */
      },
      android: { priority: "high" },
      isAlwaysUseFCM: true,
    });
  }

  @Process("sendWebPush")
  async handleSendWebPush(job: Job) {
    const { subscriptions, payload } = job.data;

    try {
      const results = await Promise.allSettled(
        subscriptions.map(async (sub) => {
          return this.push.send(sub, payload);
        })
      );
      return results;
    } catch (error) {
      throw error;
    }
  }
}
```

# 메시지 큐가 잘 동작하고 있는지 확인해보자

먼저 Redis가 실행중인 인스턴스에서 다음 명령으로 Redis에 접속해줍니다.

```shell
redis-cli -h <REDIS_HOST> -p <REDIS_PORT> -a <PASSWORD>
```

접속에 성공했다면, 생성된 Key 목록을 확인해봅시다.

```shell
KEYS bull:webpushQueue:*
```

저는 다음과 같은 결과를 확인할 수 있었습니다.

```
xxx.xx.xx.xx:6379> KEYS bull:webpushQueue:*
(empty list or set)
144.24.95.17:6379> KEYS *
 1) "bull:webpushQ:1030"
 2) "bull:webpushQ:1062"
 3) "bull:webpushQ:1047"
 4) "bull:webpushQ:1031"
 5) "bull:webpushQ:3"
 6) "bull:webpushQ:failed"
 ...
```

메시지 큐에 Key가 잘 생성되고 있고, 알림이 정상적으로 전송되고 있는걸 확인했습니다.
