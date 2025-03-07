---
thumbnail: default.jpg
slug: /blog/about/clustering
date: 2025-01-05
title: "위도 경도 기반 clustering 알고리즘"
categories:
  - mainCategory: Area
    subCategory: about
---

# 왜 clustering 기능이 필요했을까?

스터디 매칭기능은 About 프로젝트의 주요 기능중 하나입니다.

## 기존의 방식

기존의 스터디 투표에는 다음과 같은 요소가 있었습니다
- 1지망, 2지망 선택 가능
- 스터디 장소 선택가능
- 시간 선택 가능
  
이를 지원하기 위해 매칭 알고리즘은 과정을 따랐습니다.
1. 1지망의 데이터를 대상으로 시간이 겹치는 사람을 탐색
2. 2시간이상 겹치는 사람이 n명 이상이면, 스터디 상태를 open으로 변경
3. 1지망 투표에 실패한 사람들 중 open된 장소에 2지망 투표를 한 사람이라면 그곳으로 이동
4. 스터디 매칭이 완료된 사람과 장소는 제외하고, 매칭이 실패한 장소에서 2지망 투표한 사람들을 대상으로 스터디가 열릴 수 있는지 확인.

# 기존 방식엔 어떤 문제가 있었을까?

기존의 스터디 투표 방식에는 아래와 같은 문제들이 있었습니다.

- 유저가 1,2지망 장소 시간 등을 선택해야 해서 행동이 많아진다.
- 1,2지망이 잘 겹치지 않아 가까운 거리임에도 매칭이 잘 이루어지지 않음
- 데이터 구조의 문제이기도 하나, 기존의 데이터 구조에서는 효율적으로 알고리즘을 구현하기가 어려움.


이에 먼저 유저가 선택해야 할 것들을 줄이고 싶었고, 전체적으로 알고리즘도 수정하고 싶었습니다.

# DBSCAN 알고리즘을 활용한 알고리즘을 도입하자

이런 문제점들을 해결하기 위해 유저에게 위치(위도, 경도)만을 입력받고, 이를 밀도 기반 클러스터링으로 묶은 뒤, 적절한 스터디 장소로 보내는 방식을 채택했습니다.
## 밀도 기반 클러스터링(DBSCAN)
다차원 데이터를 기반으로, 가까운 포인트들을 클러스터링하는 알고리즘입니다.

K-means알고리즘도 고려했으나, cluster될 개수를 미리 정해줘야 한다는 점과, 초기 centroid값을 정해줘야 한다는 점, 결과가 매번 달라진다는 점이 우리의 데이터와 잘 맞지 않는다 생각하여 DBSCAN알고리즘을 선택했습니다.

DBSCAN알고리즘은 minPts(최소 점의 개수)와 epsilon(반경) 두 가지의 변수를 사용합니다.
동작 방식을 간단히 설명하면,
1. 특정 점 A를 중심으로 epsilon 거리 내에 minPts이상의 점들이 존재하면 A를 core point로 판단
2. core point끼리 epsilon 거리 내에 있다면 같은 cluster가 된다. 
3. 나머지 점들은 noise point로 판단한다.
와 같이 동작합니다.

# 적용

DBSCAN알고리즘은 "density-clustering" 라이브러리를 사용하였습니다.
```javascript
DBSCANClustering(
    coords: coordType[],
    eps: number,
  ): { clusters: number[][]; noise: number[] } {
    const DBSCAN = new clustering.DBSCAN();

  
    const data = coords.map(({ lat, lon }: any) => [lat, lon]);
  
    const minPts = 3; // 한 지점 근처에 최소 3개 이상 모여야 클러스터로 인정
  
    const clusters = DBSCAN.run(data, eps, minPts);
  
    return {
      clusters,
      noise: DBSCAN.noise,
    };
}
```
위 코드와 같이 위도, 경도로 구성된 배열 데이터를 만든 다음, DBSCAN알고리즘을 돌려주면 됩니다. cluster 그룹과, noise그룹이 배열 인덱스를 값으로 하는 데이터 구조로 반환됩니다.

여기서 저희가 설정할 수 있는 것들은, 클러스터의 거리 eps와 최소 점 개수 minPts 두 개 뿐입니다. 

그러나 스터디를 위한 그룹을 만들 때는, 한 카페에 너무 많은 인원이 가는것도 안되므로 최대 인원도 제한해야 합니다. 이를 어떻게 구현할까요?

방법은 간단합니다. 크기가 큰 그룹을 대상으로 더 작은 eps값을 이용해 DBSCAN 알고리즘을 다시 돌려 쪼개주면 됩니다.

저는 가장 긴 클러스터가 8이 될때까지 계속 쪼개주도록 반복문을 돌렸습니다.
DBSCAN알고리즘 관련 코드가 길어져 별도의 ClusterUtils라는 클래스로 분리했습니다.

``` javascript
async setResult(date: Date) {
    const participations: IParticipation[] 
      await this.Vote2Repository.findParticipationsByDate(date);
  
    const coords: coordType[] = participations.map((loc) => {
      return {
        lat: parseFloat(loc.latitude),
        lon: parseFloat(loc.longitude),
      };
    });
  
    //시작 거리
    let eps = 0.01;
    const maxMember = 8;
  
    let { clusters, noise } = ClusterUtils.DBSCANClustering(coords, eps);
  
    //클러스터 결과 8명이 넘는 클러스터가 있을 경우, 더 작게 더 분해.
    while (ClusterUtils.findLongestArrayLength(clusters) > maxMember) {
      clusters.forEach((cluster: number[], i) => {
        if (cluster.length <= 8) return;
        const newCoords = coords.filter((coord, j) => cluster.includes(j));
  
        let { clusters: newClusters, noise: newNoise } =
          ClusterUtils.DBSCANClustering(newCoords, (eps /= 2));
  
        clusters.splice(i, 1, ...newClusters);
      });
    }
  
    //cluster결과(인덱스)를 실제 데이터로 치환
    const formedClusters = ClusterUtils.transformArray(
      clusters,
      participations,
    );
  
    const places: IPlace[] = await this.PlaceRepository.findByStatus('active');
  
    //클러스터링 결과 계산
    const voteResults = await ClusterUtils.findClosestPlace(
      formedClusters,
      places,
    );
  
    await this.Vote2Repository.setVoteResult(date, voteResults);
  }
```

while문 외에는 대부분 데이터를 가공하고 DB에 읽고 쓰는 과정이므로, while문 부분만 보면 될 것 같습니다. 

![](images/20241230140929.png)
mock data로 테스트 결과, 다음과 같이 101명의 참여자가 14개의 그룹으로 잘 클러스터링 된 것을 확인할 수 있었습니다.
# 마무리

위 알고리즘이 실제 데이터에서 얼마나 잘 작동할지는 앞으로 지켜봐야 합니다. 
그리고 지역마다 eps값을 조정해야 하는 경우도 있을 것 같고, 유저별로 선호하는 거리가 다를 수 있다는 점도 고려해야 할 수 있습니다.