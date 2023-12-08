---
thumbnail: univting.png
slug: "/blog/algorithm/lis"
date: "2023-11-27"
title: "[동적계획] LIS"
categories:
  - mainCategory: "Area"
    subCategory: "algorithm"
---

# 문제

정수 수열 S의 부분 수열이란 S에서 0개 이상의 숫자를 지우고 남은 수열을 말합니다. 이때 남은 숫자들이 순 증가 하면 이를 증가 부분 수열이라 합니다. 주어진 수열에서 얻을 수 있는 증가 부분 수열 중 가장 긴 수열의 길이를 찾아봅시다.
이를 최대 증가 부분 수열 (LIS, Longest Increasing Subsequence)라고 합니다.

# 풀이

```c++
#include<iostream>

using namespace std;

int n;
int box[101] = { 0, };
int dp[101] = {0, };

int solve(int idx) {
	int& ret = dp[idx];
	if (ret != -1)
		return ret;

	ret = 1;

	if (idx == n) return ret;

	for (int i = idx + 1; i < n; i++) {
		if(box[i] > box[idx])
			ret = max(ret, 1 + solve(i));
	}
	return ret;
}

int main(void) {
	cin >> n;
	memset(dp, -1, sizeof(dp));

	for (int i = 0; i < n; i++) {
		cin >> box[i];
	}

	int result = 0;
	for (int i = 0; i < n; i++) {
		result = max(result, solve(i));
	}

	cout << result;

	return 0;
}
```

# 개념

## 최적 부분 구조

현재까지 어떤 경로로 이 부분 문제에 도달했건 남은 부분 문제를 항상 최적으로 풀어도 답을 구할 수 있는 문제를 최적 부분 구조라고 합니다.

# 복기

- 증가하는 부분 수열을 만들려면 수 하나를 선택하고, 뒤의 수 중 더 큰 수를 골라서 그 수에서 시작하는 증가 부분 수열을 다시 만드는 걸 반복하면 됩니다.
- 직전에 고른 수보다 큰 수를 고르는 조건만 추가하면, 그 수에서 시작하는 가장 긴 증가 부분 수열을 구하는걸 반복해서 답을 구할 수 있습니다.
- 그래서 solve()함수가 주어진 idx에 대해 거기서 시작하는 최대 증가 부분 수열의 길이를 반환하도록 작성했습니다.
- 처음에는 solve(0)만을 호출하면 문제가 해결될 줄 알았는데, 이렇게 하면 0번 인덱스에서 시작하는 답만 구하게 돼서, 반복문으로 모든 수에서 시작하는 경우를 고려해야 합니다.

# 시간복잡도

각 경우에 n번 반복에서 n번 재귀 호출을 실행하므로 시간복잡도는 O(n^2)이 됩니다.

# 추가

이분탐색을 활용해 O(nlogn)의 시간복잡도로 문제를 해결할 수 있다.
