# C++ 기본 문법과 PS 필수 요소 정리

## 1. 기본 입출력

### 헤더파일
```cpp
#include <iostream>
using namespace std;
```

### 기본 사용법
```cpp
// 입력
int n;
cin >> n;

// 출력
cout << n << "\n";  // endl보다 "\n"이 더 빠름

// 빠른 입출력 (필수!)
ios_base::sync_with_stdio(false);
cin.tie(NULL);
cout.tie(NULL);
```

## 2. 자주 사용되는 헤더파일

```cpp
#include <iostream>    // 입출력
#include <vector>      // 벡터
#include <algorithm>   // sort, binary_search 등
#include <string>      // 문자열
#include <queue>       // 큐, 우선순위 큐
#include <stack>       // 스택
#include <set>         // 집합
#include <map>         // 맵
#include <cmath>       // 수학 함수
#include <cstring>     // memset 등
```

**꿀팁**: 모든 헤더를 포함하는 비표준 헤더
```cpp
#include <bits/stdc++.h>  // PS에서만 사용 권장
```

## 3. 자료구조

### Vector (동적 배열)
```cpp
#include <vector>

vector<int> v;              // 빈 벡터
vector<int> v(10);          // 크기 10
vector<int> v(10, 0);       // 크기 10, 0으로 초기화

v.push_back(5);             // 뒤에 추가
v.pop_back();               // 뒤에서 제거
v.size();                   // 크기
v.empty();                  // 비어있는지
v.clear();                  // 모두 제거
v[i];                       // 인덱스 접근
v.front(), v.back();        // 첫/마지막 원소
```

### Pair
```cpp
#include <utility>

pair<int, int> p = {1, 2};
p.first, p.second;          // 접근

// 정렬 시 first 기준, 같으면 second 기준
```

### Stack
```cpp
#include <stack>

stack<int> s;
s.push(5);                  // 추가
s.pop();                    // 제거
s.top();                    // 맨 위 원소
s.empty();                  // 비어있는지
s.size();                   // 크기
```

### Queue
```cpp
#include <queue>

queue<int> q;
q.push(5);                  // 추가
q.pop();                    // 제거
q.front();                  // 맨 앞 원소
q.back();                   // 맨 뒤 원소
q.empty();
q.size();
```

### Priority Queue (힙)
```cpp
#include <queue>

priority_queue<int> pq;              // 최대 힙
priority_queue<int, vector<int>, greater<int>> pq;  // 최소 힙

pq.push(5);
pq.pop();
pq.top();                   // 최대/최소값
pq.empty();
pq.size();
```

### Set (집합)
```cpp
#include <set>

set<int> s;
s.insert(5);                // 추가
s.erase(5);                 // 제거
s.count(5);                 // 존재하면 1, 아니면 0
s.find(5);                  // iterator 반환
s.size();
s.clear();

// 자동 정렬됨, 중복 불가
```

### Map (딕셔너리)
```cpp
#include <map>

map<string, int> m;
m["key"] = 10;              // 추가/수정
m.erase("key");             // 제거
m.count("key");             // 존재 확인
m["key"];                   // 접근 (없으면 0 생성)
m.size();

// 순회
for(auto p : m) {
    cout << p.first << " " << p.second << "\n";
}
```

## 4. 자주 사용되는 알고리즘 함수

### 정렬
```cpp
#include <algorithm>

vector<int> v = {3, 1, 4, 1, 5};
sort(v.begin(), v.end());              // 오름차순
sort(v.begin(), v.end(), greater<>());  // 내림차순

// 배열 정렬
int arr[5] = {3, 1, 4, 1, 5};
sort(arr, arr + 5);
```

### 이진 탐색
```cpp
binary_search(v.begin(), v.end(), 3);  // 존재 여부
lower_bound(v.begin(), v.end(), 3);    // 3 이상 첫 위치
upper_bound(v.begin(), v.end(), 3);    // 3 초과 첫 위치
```

### 기타 유용한 함수
```cpp
reverse(v.begin(), v.end());           // 뒤집기
fill(v.begin(), v.end(), 0);           // 0으로 채우기
max(a, b), min(a, b);                  // 최대/최소
swap(a, b);                            // 교환
abs(x);                                // 절댓값
```

### next_permutation (순열)
```cpp
vector<int> v = {1, 2, 3};
do {
    // v 출력
} while(next_permutation(v.begin(), v.end()));
```

## 5. 문자열

```cpp
#include <string>

string s = "hello";
s.length(), s.size();       // 길이
s.substr(0, 3);             // 부분문자열
s.find("ll");               // 위치 찾기 (없으면 string::npos)
s.push_back('!');           // 문자 추가
s += "world";               // 문자열 추가
stoi(s);                    // string to int
to_string(123);             // int to string
```

## 6. 수학

```cpp
#include <cmath>

pow(2, 3);                  // 거듭제곱
sqrt(16);                   // 제곱근
ceil(3.2), floor(3.8);      // 올림/내림
abs(x);                     // 절댓값
```

## 7. 배열 초기화

```cpp
#include <cstring>

int arr[100];
memset(arr, 0, sizeof(arr));    // 0으로 초기화
memset(arr, -1, sizeof(arr));   // -1로 초기화 (0, -1만 안전)

// 2차원 배열
fill(&arr[0][0], &arr[0][0] + 100*100, 0);
```

## 8. PS 템플릿

```cpp
#include <bits/stdc++.h>
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    cout.tie(NULL);
    
    // 코드 작성
    
    return 0;
}
```

## 9. Python과 주요 차이점

| Python | C++ |
|--------|-----|
| `len(arr)` | `arr.size()` |
| `arr.append(x)` | `arr.push_back(x)` |
| `arr[-1]` | `arr.back()` |
| `x in arr` | `find(arr.begin(), arr.end(), x) != arr.end()` |
| `float('inf')` | `INT_MAX` 또는 `1e9` |
| `//` (정수 나눗셈) | `/` (정수끼리 나누면 정수) |

## 10. 주의사항

- **배열 크기**: 미리 충분히 크게 선언 (보통 1e6 정도)
- **자료형**: `int` 범위 초과 시 `long long` 사용
- **시간복잡도**: C++이 빠르긴 하지만 O(N²)은 N=10⁶에서 위험
- **0-based indexing**: Python과 동일
- **세미콜론**: 문장 끝에 `;` 필수!
