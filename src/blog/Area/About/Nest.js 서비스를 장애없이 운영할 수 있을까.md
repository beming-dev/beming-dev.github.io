---
thumbnail: default.jpg
slug: /blog/about/elk
date: 2025-03-01
title: "Nest.js 서비스를 장애없이 운영할 수 있을까?"
categories:
  - mainCategory: Area
    subCategory: about
---

# Error 로깅과 모니터링의 중요성
서비스를 운영하며 가장 중요하게 생각된 부분은 서비스를 장애 없이 운영하는 것이었습니다.
Express.js에서 Nest.js로 코드를 porting하며 처음에 가장 문제가 됐던 부분은 에러 발생시 백엔드가 종료돼버리는 것이었습니다.
처음에는 종료되는 에러가 발생하면 처리하는 식으로 해결해보려 했는데, 계속 서버가 종료되는걸 그냥 둘 수 없었습니다.

서비스가 예기치 않게 종료되는건 Error가 제대로 Handling 되지 않아서 인데, Nest.js에서 처리되지 않은 Error를 Handling할 수 있는 Listener를 제공합니다.
main.ts에 다음과 같은 코드를 추가하여 해결할 수 있었습니다.
```
//전역 에러 핸들링
process.on('unhandledRejection', (reason, promise) => {
  logger.error('🔥 Unhandled Rejection', { promise, reason });
});
  
process.on('uncaughtException', (error) => {
  logger.error('🔥 Uncaught Exception', { error });
});
```
일단 급한불은 껐지만 얼른 에러에 대한 처리를 해주고, 에러가 발생할 때마다 바로 바로 대응이 가능하도록 하고 싶었습니다.

# 왜 ELK 스택은 선택했을까?

1. ELK는 Open source입니다. Splunk와 같은 다른 유료 서비스와 비교했을 때, 무료로 사용할 수 있는 ELK 스택이 서비스에 맞았습니다.
2. Docker container의 로그를 수집할 수 있고, ElasticSearch 기반으로 빠른 검색 성능을 보유하고 있습니다.
3. Kubernetes를 사용하고 있지 않습니다. Kubernetes를 사용중이라면, Prometheus, Grafana같은 다른 서비스도 고려해봤을 수 있지만, ELK가 가장 간편하게 사용할 수 있었습니다.

# ELK란 무엇일까?
ELK란 ElasticSearch, Logstash, Kibana 라는 세가지 인기있는 데이터 처리 솔루션을 일컫는 말입니다.

ElasticSearch는 검색 및 분석
Logstash는 데이터 수집
Libana는 데이터 시각화

이렇게 각각 담당합니다.

# Docker-compose로 ELK 구성하기

About은 Frontend와 Backend를 Docker Container로 배포하고 있습니다.
ELK를 Docker conatiner로 띄우고, Docker의 로그를 수집하는 과정을 구성해봅시다.

여기선 Container의 로그를 Logstash로 전송해주기 위해 추가로 Filebeat을 사용합니다.

ELK는 현재 8.xx 버전까지 나와있지만, 8버전 이상부터는 보안 문제를 해결하려면 무료 사용에 제한이 있어 7버전을 사용했습니다.
## Elasticsearch
```
elasticsearch:
    image: docker.elastic.co/elasticsearch/elasticsearch:7.17.27
    container_name: elasticsearch
    environment:
      - discovery.type=single-node
      - "ES_JAVA_OPTS=-Xms512m -Xmx512m"
      - xpack.security.enabled=false  # 데모용. 프로덕션에서는 보안 설정 권장
      - xpack.license.self_generated.type=basic
      - http.cors.enabled=true  # CORS 활성화
      - http.cors.allow-origin="*"
      - http.cors.allow-methods=OPTIONS,HEAD,GET,POST,PUT,DELETE
      - http.cors.allow-headers=X-Requested-With,X-Auth-Token,Content-Type,Content-Length,Authorization
      - http.cors.allow-credentials=true
      - xpack.security.authc.api_key.enabled=false  # API Key 인증 비활성화
      - xpack.security.authc.anonymous.roles=superuser  # 익명 사용자에게 슈퍼유저 권한 부여
    volumes:
      - es-data:/usr/share/elasticsearch/data
    ports:
      - "9200:9200"
```
- 보안 관련 설정을 비활성화했으므로, 누구나 접근할 수 있습니다. 실제 배포 환경에서는 보안 설정을 해야합니다.
- Cors 설정을 활성화했습니다.
- 익명 사용자가 superuser 권한을 가집니다. 이 또한 실제로는 수정해야 합니다.
- 메모리 사용량을 512mb로 제한합니다.
## kibana
```
kibana:
    image: docker.elastic.co/kibana/kibana:7.17.27
    container_name: kibana
    environment:
      - ELASTICSEARCH_HOSTS=http://elasticsearch:9200
      - XPACK_SECURITY_ENABLED=false
      - SERVER_HOST=0.0.0.0
    ports:
      - "5601:5601"
    depends_on:
      - elasticsearch
```
- elasticsearch가 실행돼야 kibanan가 작동되도록 합니다.
- 마찬가지로 보안설정은 해두지 않았습니다.
- 5601 포트로 접속하면 kibana UI를 사용할 수 있습니다.
## Logstash
```
logstash:
    image: docker.elastic.co/logstash/logstash:7.17.27
    container_name: logstash
    depends_on:
      - elasticsearch
    volumes:
      - ./logstash/pipeline:/usr/share/logstash/pipeline
    ports:
      - "5044:5044"
      - "5000:5000"
      - "9600:9600"
    environment:
      - LS_JAVA_OPTS=-Xms256m -Xmx256m
```

- /logstash/pipeline폴더에 logstash.yml 설정파일을 두어 적용합니다.
- 5044 포트를 통해 filebeat에서 logstash로 로그를 전송합니다.
- 5000번 포트는 추가적인 데이터 입력을 받을때 필요합니다.
- 9600 포트는 logstash를 모니터링 하기위한 api입니다.

logstash.yml
```
input {
  beats {
    port => 5044
  }
}

filter {
  json {
    source => "message"
    target => "parsed_json"
  }
  if "_jsonparsefailure" in [tags] {
    mutate {
      rename => { "message" => "raw_message" }
      remove_field => [ "parsed_json" ]
    }
  }
}

output {
  elasticsearch {
    hosts => ["http://elasticsearch:9200"]
    index => "nest-logs-%{+YYYY.MM.dd}"
  }
  stdout { codec => rubydebug }
}
```
- 5044포트에서 beats 프로토콜 데이터를 받습니다.
- 로그 데이터를 JSON 형식으로 변환합니다. 변환이 실패하면 raw_message로 저장합니다.
- output을 elasticsearch:9200으로 전송합니다. 

## Filebeat
```
filebeat:
    image: docker.elastic.co/beats/filebeat:7.17.27
    container_name: filebeat
    depends_on:
      - logstash
    user: root
    volumes:
      - ./filebeat/filebeat.yml:/usr/share/filebeat/filebeat.yml:ro
      - /var/lib/docker/containers:/var/lib/docker/containers:ro
      - /var/run/docker.sock:/var/run/docker.sock:ro
```
- 로그를 수집하고 logstash로 전송합니다.
- ./filebeat 폴더에 filebeat.yml 설정파일을 둡니다.
- /var/lib/docker/containers를 마운트하여 Docker 컨테이너 내부 로그 파일을 수집합니다.
- /var/run/docker.sock을 마운트하여 Docker 컨테이너 이벤트를 추적합니다.


filebeat.yml
```
filebeat.inputs:
  - type: container
    paths:
      - /var/lib/docker/containers/*/*.log
    processors:
      - add_docker_metadata: ~
output.logstash:
  hosts: ["logstash:5044"]
```
- docker container의 로그파일을 읽어서 수집합니다.
- add_docker_metadata로 메타데이터를 추가합니다.
- 수집한 로그를 logstash:5044로 전송합니다.
