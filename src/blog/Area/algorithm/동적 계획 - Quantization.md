---
thumbnail: default.jpg
slug: /blog/algorithm/quantization
date: 2023-12-05
title: "[동적계획] 와일드카드"
categories:
  - mainCategory: Area
    subCategory: algorithm
---

# 문제
![](../../images/Pasted%20image%2020231209224957.png)

# 풀이
```c++
#include<iostream>
#include<vector>
#include<algorithm>

using namespace std;

const int INF = 987654321;

int n, m;
vector<int> v;
int dp[101][101];

int minError(int start, int end){
	int minNum = v[start];
	int maxNum = v[end];

	int result = INF;
	for (int num = minNum; num <= maxNum; num++) {
		int calc = 0;
		for (int i = start; i <= end; i++) {
			calc += (num - v[i]) * (num - v[i]);
		}
		result = min(result, calc);
	}
	return result;
}

//start이휴를 part개로 나눌때
int solve(int start, int parts) {
	if (start == n) return 0;
	if (parts == 0) return INF;

	int &ret = dp[start][parts];
	if (ret != -1) return ret;

	ret = INF;

	for (int partsSize = 1; start + partsSize <= n; partsSize++) {
		ret = min(ret, minError(start, start + partsSize - 1) + solve(start + partsSize, parts - 1));
	}
	return ret;
}

int main(void) {
	memset(dp, -1, sizeof(dp));

	cin >> n >> m;
	for (int i = 0; i < n; i++) {
		int a;
		cin >> a;
		v.push_back(a);
	}

	sort(v.begin(), v.end());

	cout << solve(0, m);
}
```

# 복기
- 문제의 단순화
  이 문제를 곧이 곧대로 푸려면, 양자화 할 수 10개를 1000의 범위에서 골라야 하므로 1000C10 이라는 엄청 큰 수의 계산을 해야 하므로 문제를 풀 수 없다.
  그래서 다음과 같은 아이디어가 필요하다.
  "주어진 수열을 정렬하면, 같은 숫자로 양자화 되는 숫자들은 항상 인접해있다."
  주어진 수열을 정렬하면, 인접한 숫자들은 같은 수로 양자화 되기 때문에, 수열을 m등분 하는 것으로 문제를 단순화 할 수 있다.
  따라서 solve함수를 solve(start, parts): start인덱스에서부터 parts개로 양자화 했을 때, 최소 오차를 반환. 과 같이 정의하면 문제를 쉽게 풀 수 있다.