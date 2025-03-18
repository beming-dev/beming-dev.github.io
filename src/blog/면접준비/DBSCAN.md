- Epsilon: Cluster 구성하는 최소 거리
- Min Points: Cluster 구성 시, 필요한 최소 데이터 포인트 수

임의 포인트 선택, Epsilon 거리 내에 있는 모든 데이터 포인트 찾음.
데이터 포인트 갯수가 Min Points 이상이면, Cluster 생성.
Cluster에 존재하는 점 중, 다른 Cluster의 중심이 되는 점이 있다면 합침
반복
최종적으로 포함 안되면 이상치
