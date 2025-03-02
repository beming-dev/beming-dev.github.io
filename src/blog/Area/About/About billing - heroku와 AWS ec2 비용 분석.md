---
thumbnail: default.jpg
slug: /blog/about/billing
date: 2024-12-23
title: "About billing - heroku와 AWS ec2 비용 분석"
categories:
  - mainCategory: Area
    subCategory: about
---

현재 About은 Heroku로 Frontend와 Backend모두 배포하고 있습니다.

# Heroku

## Frontend

![](../../images/20241223132945.png)

대략적인 비용을 계산해보면 0.146 _ 24 _ 30 = 105.12. 즉 한달에 $105정도 청구되고 있다.

![](../../images/20241223133004.png)
메모리 사용량을 보면 최대 1GB의 메모리를 사용중인데, 현재 최대 1.6GB를 사용하고 있어서 평균적으로 메모리 사용량을 넘고 있는걸 확인할 수 있다.

## Backend

![](../../images/20241223133034.png)
대략적인 비용을 계산해보면 0.035 _ 24 _ 30 = 25.2. 즉 $25정도 청구되고 있는걸 확인할 수 있다.

![](../../images/20241223133059.png)
백엔드는 최대 512 MB의 메모리를 사용할 수 있는데, 평균적으로 20% 정도의 메모리만 사용하고 있다.

## 총정리

# AWS EC2

## 인스턴스

다음은 아시아 서울 지역에서 AWS EC2의 인스턴스별 시간당 요금이다.

![](../../images/20241223134501.png)

현재 백엔드는 110MB정도의 메모리만 사용하고, 프론트엔드는 1.6GB정도를 사용하고 있으므로 4GB 메모리의 인스턴스를 빌리면 앱을 충분히 배포할 수 있을 것으로 보인다.

- 4GB메모리가 필요할 것으로 예상되므로, t4g.medium 인스턴스를 사용한다면 시간당 $0.0416가 청구된다.

## Public IP V4 주소

![](../../images/20241223141541.png)

- 프론트엔드와 백엔드 각각 Elastic IP를 한개씩 제공받는다면, 2 _ 0.005 _ 24 \* 30 = 7.2. 즉 $7.2정도가 매달 청구될 것이다.

## EBS 볼륨

![](../../images/20241223134956.png)

- t4g.medium 인스턴스는 EBS 볼륨을 따로 사용해야 하므로, EBS 볼륨의 범용 SSD storage를 100GB 사용한다면 한달에 $9가 청구된다.

총 비용을 정리해보면 9 + 7.2 + (0.041 _ 24 _ 30) = 46.2. 약 $46정도의 비용이 청구될 것이다.

여기에 추가적으로 데이터 송수신 비용이 GB당 최대 $0.1 정도 청구될 수 있는데, 동일 지역에서 발생하는 트래픽에는 청구되지 않는듯 하다. 이 부분은 실제 운영을 해봐야 가늠할 수 있을것 같다.

# 비용 비교

## Heroku

- 백엔드 $25/월
- 프론트엔드 $105/월

총 130$/월

## AWS EC2

- 인스턴스 비용 $30/월
- Elastic IP $7.2/월
- SSD storage $9/월

총 $46/월

# 결론

배포를 Heroku에서 AWS EC2로 옮긴다면 매월 $84. 환화로 약 122000원 정도를 매달 절약할 수 있다.
