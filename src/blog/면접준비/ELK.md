시스템 장애를 빠르게 대응하기 위함.
응답이 늦는 API도 찾아내기 위해 적용해보는중

- ElasticSearch: 로그 저장 및 검색
- Logstash: 로그 수집
- Kibana: 로그 시각화 및 관리

- Filebeat: 로그 파일을 경량 에이전트 형태로 수집. Logstash와 달리 자원이 많이 소모되지 않으므로, 서버 측에서 로그 수집 오버헤드를 줄일 수 있다. 추후 로그 수집 설정을 바꿀 때, Beats의 설정만 조정하면 돼서 확장에 유리하다.
  로그 수집 역할을 분리했다고 생각하면 좋을듯.

Beat에는 로그 파일 담당 Filebeat 뿐 아니라, Metric 담당 MEtricbeat, 네트워크 담당 Packetbeat

- 오픈소스라 프로젝트에 적용해보기가 좋았다.
- Docker의 Log를 수집하기 편리하고, ElasticSearch의 속도가 매우 빠르다.


ElasticSearch
역색인 구조 => 검색어 기준으로 문서 목록을 빠르게 찾을 수 있게 하는 자료구조
데이터를 여러 샤드에 나눠 저장함. 노드 수에 따라 데이터를 병렬로 처리함.
내부적으로 OS 레벨의 파일 시스템 캐시, segment단위로 활용 가능한 캐시를 활용함.

## Prometheus, Grafana
kubernetes 환경에서는 애플리케이션 상태, 노드/POD 자원 사용량, 네트워크 트래픽 등 모니터링이 중요.
Prometheus는 kubernetes의 API server와 직접 연동하여 메트릭을 수집 가능.