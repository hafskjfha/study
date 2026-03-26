# Rust 프로그래밍 문제풀이 완전 가이드

## 목차
1. [기본 설정과 입출력](#기본-설정과-입출력)
2. [변수와 데이터 타입](#변수와-데이터-타입)
3. [소유권과 차용](#소유권과-차용)
4. [컬렉션 (Vector, HashMap, BTreeMap)](#컬렉션)
5. [문자열 처리](#문자열-처리)
6. [반복문과 제어문](#반복문과-제어문)
7. [함수와 클로저](#함수와-클로저)
8. [패턴 매칭과 Option/Result](#패턴-매칭과-optionresult)
9. [알고리즘 구현 팁](#알고리즘-구현-팁)
10. [자주 하는 실수와 해결법](#자주-하는-실수와-해결법)

---

## 기본 설정과 입출력

### 기본 템플릿
```rust
use std::io::{self, BufRead, BufReader};
use std::collections::*;

fn main() {
    // 빠른 입출력을 위한 설정
    let stdin = io::stdin();
    let mut lines = stdin.lock().lines();
    
    // 또는 간단한 입력의 경우
    let mut input = String::new();
    io::stdin().read_line(&mut input).unwrap();
    let n: i32 = input.trim().parse().unwrap();
}
```

### 입출력 패턴들
```rust
// 1. 한 줄에 여러 숫자 읽기
let mut input = String::new();
io::stdin().read_line(&mut input).unwrap();
let nums: Vec<i32> = input
    .trim()
    .split_whitespace()
    .map(|x| x.parse().unwrap())
    .collect();

// 2. 매크로를 이용한 간편 입력 (경진대회용)
macro_rules! input {
    ($($r:tt)*) => {
        let stdin = std::io::stdin();
        let mut bytes = std::io::Read::bytes(std::io::BufReader::new(stdin.lock()));
        let mut next = move || -> String{
            bytes.by_ref().map(|r|r.unwrap() as char)
            .skip_while(|c|c.is_whitespace())
            .take_while(|c|!c.is_whitespace())
            .collect()
        };
        input_inner!{next, $($r)*}
    };
}

macro_rules! input_inner {
    ($next:expr) => {};
    ($next:expr,) => {};
    ($next:expr, $var:ident : $t:tt $($r:tt)*) => {
        let $var = read_value!($next, $t);
        input_inner!{$next $($r)*}
    };
}

macro_rules! read_value {
    ($next:expr, ( $($t:tt),* )) => { ($(read_value!($next, $t)),*) };
    ($next:expr, [ $t:tt ; $len:expr ]) => {
        (0..$len).map(|_| read_value!($next, $t)).collect::<Vec<_>>()
    };
    ($next:expr, chars) => {
        read_value!($next, String).chars().collect::<Vec<char>>()
    };
    ($next:expr, usize1) => (read_value!($next, usize) - 1);
    ($next:expr, $t:ty) => ($next().parse::<$t>().expect("Parse error"));
}

// 사용법
input! {
    n: usize,
    a: [i32; n],
}
```

**⚠️ 실수 포인트**: `read_line()`은 개행문자(`\n`)도 포함하므로 반드시 `trim()`을 사용해야 합니다.

---

## 변수와 데이터 타입

### 기본 데이터 타입
```rust
// 정수 타입 - 크기별로 선택
let small: i32 = 42;        // -2^31 ~ 2^31-1
let big: i64 = 1_000_000_000_000; // -2^63 ~ 2^63-1
let unsigned: u32 = 42;     // 0 ~ 2^32-1
let byte: u8 = 255;         // 0 ~ 255

// 실수 타입
let pi: f64 = 3.14159;      // 64비트 부동소수점 (권장)
let small_pi: f32 = 3.14;   // 32비트 부동소수점

// 문자와 불린
let ch: char = 'A';         // Unicode 문자 (4바이트)
let flag: bool = true;

// 배열과 튜플
let arr: [i32; 5] = [1, 2, 3, 4, 5];
let tuple: (i32, String) = (42, "Hello".to_string());
```

### 변수 선언 패턴
```rust
// 가변/불변
let x = 5;          // 불변 (immutable)
let mut y = 10;     // 가변 (mutable)

// 타입 추론 vs 명시
let auto = 42;      // 컴파일러가 타입 추론
let explicit: i32 = 42; // 타입 명시

// 구조적 할당
let (a, b) = (1, 2);
let [first, second, ..] = [1, 2, 3, 4, 5];
```

**💡 팁**: 문제풀이에서는 대부분 `i32`, `i64`, `usize`만 사용합니다. 범위를 벗어날 가능성이 있으면 `i64`를 사용하세요.

---

## 소유권과 차용

### 소유권 기본 원칙
```rust
fn main() {
    let s1 = String::from("hello");
    let s2 = s1; // s1의 소유권이 s2로 이동 (move)
    // println!("{}", s1); // 컴파일 에러!
    
    let s3 = s2.clone(); // 명시적 복사
    println!("{} {}", s2, s3); // OK
}

// 차용 (Borrowing)
fn calculate_length(s: &String) -> usize { // 불변 참조
    s.len()
} // s는 참조이므로 소유권이 없어 drop되지 않음

fn change(s: &mut String) { // 가변 참조
    s.push_str(", world");
}

fn main() {
    let s1 = String::from("hello");
    let len = calculate_length(&s1); // 차용
    println!("Length of '{}' is {}.", s1, len); // s1 사용 가능
    
    let mut s2 = String::from("hello");
    change(&mut s2);
}
```

### 슬라이스
```rust
let s = String::from("hello world");
let hello = &s[0..5];   // "hello"
let world = &s[6..11];  // "world"
let whole = &s[..];     // "hello world"

// 배열 슬라이스
let a = [1, 2, 3, 4, 5];
let slice = &a[1..3];   // [2, 3]
```

**⚠️ 실수 포인트**: 가변 참조는 동시에 하나만 존재할 수 있고, 불변 참조와 가변 참조는 동시에 존재할 수 없습니다.

---

## 컬렉션

### Vector - 동적 배열
```rust
// 생성 방법들
let mut v1: Vec<i32> = Vec::new();
let v2 = vec![1, 2, 3, 4, 5];
let v3 = vec![0; 10]; // [0, 0, 0, ..., 0] (길이 10)

// 기본 연산
v1.push(1);
v1.push(2);
let last = v1.pop(); // Option<i32> 반환

// 접근 방법
let third = &v2[2];        // 패닉 가능성
let third = v2.get(2);     // Option<&i32> 반환 (안전)

// 반복
for i in &v2 {
    println!("{}", i);
}

for (index, value) in v2.iter().enumerate() {
    println!("{}: {}", index, value);
}

// 유용한 메서드들
v1.sort();                    // 정렬
v1.reverse();                 // 뒤집기
v1.dedup();                   // 연속된 중복 제거
let sum: i32 = v1.iter().sum(); // 합계
let max = v1.iter().max();    // 최대값 (Option<&i32>)
```

### HashMap - 해시맵
```rust
use std::collections::HashMap;

let mut scores = HashMap::new();
scores.insert(String::from("Blue"), 10);
scores.insert(String::from("Red"), 50);

// 값 접근
let score = scores.get("Blue"); // Option<&i32>
let score = scores.get("Blue").copied().unwrap_or(0); // i32, 없으면 0

// 존재 여부에 따른 삽입
scores.entry(String::from("Yellow")).or_insert(50);

// 값 업데이트
let count = scores.entry(String::from("Blue")).or_insert(0);
*count += 1;

// 반복
for (key, value) in &scores {
    println!("{}: {}", key, value);
}
```

### BTreeMap - 정렬된 맵
```rust
use std::collections::BTreeMap;

let mut map = BTreeMap::new();
map.insert(3, "three");
map.insert(1, "one");
map.insert(2, "two");

// 자동으로 키 순서대로 정렬됨
for (key, value) in &map {
    println!("{}: {}", key, value); // 1: one, 2: two, 3: three
}

// 범위 검색
for (key, value) in map.range(1..=2) {
    println!("{}: {}", key, value);
}
```

**💡 팁**: 
- 순서가 중요하지 않고 빠른 검색이 필요하면 `HashMap`
- 정렬된 순서가 필요하거나 범위 검색이 필요하면 `BTreeMap`
- 인덱스 기반 접근이 필요하면 `Vec`

---

## 문자열 처리

### String vs &str
```rust
// String: 소유된 문자열 (힙에 저장, 가변 크기)
let mut s = String::new();
let s2 = String::from("hello");
let s3 = "hello".to_string();

// &str: 문자열 슬라이스 (참조, 불변)
let s4: &str = "hello";
let s5: &str = &s2[..];
```

### 문자열 조작
```rust
let mut s = String::from("Hello");

// 추가
s.push(' ');                    // 문자 추가
s.push_str("World");           // 문자열 추가
s += "!";                      // 연결

// 분리
let words: Vec<&str> = s.split_whitespace().collect();
let parts: Vec<&str> = s.split(',').collect();

// 문자별 처리
let chars: Vec<char> = s.chars().collect();
for c in s.chars() {
    println!("{}", c);
}

// 유용한 메서드들
s.trim();           // 양쪽 공백 제거
s.to_lowercase();   // 소문자로
s.to_uppercase();   // 대문자로
s.len();            // 바이트 길이
s.chars().count();  // 문자 개수
s.contains("Hello"); // 포함 여부
s.starts_with("He"); // 시작 문자열 확인
s.replace("World", "Rust"); // 치환
```

### 문자와 숫자 변환
```rust
// 문자 ↔ 숫자
let c = '5';
let n = c.to_digit(10).unwrap(); // Some(5)
let c2 = std::char::from_digit(n, 10).unwrap(); // '5'

// 문자열 ↔ 숫자
let s = "123";
let n: i32 = s.parse().unwrap(); // 123
let s2 = n.to_string(); // "123"

// ASCII 코드
let c = 'A';
let ascii = c as u8; // 65
let c2 = ascii as char; // 'A'
```

**⚠️ 실수 포인트**: `len()`은 바이트 길이를 반환하므로 한글 등 멀티바이트 문자가 있으면 `chars().count()`를 사용하세요.

---

## 반복문과 제어문

### 반복문 패턴들
```rust
// 기본 for 루프
for i in 0..5 {        // 0, 1, 2, 3, 4
    println!("{}", i);
}

for i in 0..=5 {       // 0, 1, 2, 3, 4, 5
    println!("{}", i);
}

// 컬렉션 반복
let v = vec![1, 2, 3];
for item in &v {       // 불변 참조
    println!("{}", item);
}

for item in &mut v {   // 가변 참조
    *item *= 2;
}

for item in v {        // 소유권 이동
    println!("{}", item);
} // v는 더 이상 사용 불가

// enumerate로 인덱스와 함께
for (i, item) in v.iter().enumerate() {
    println!("{}: {}", i, item);
}

// while 루프
let mut n = 5;
while n > 0 {
    println!("{}", n);
    n -= 1;
}

// loop (무한 루프)
let mut count = 0;
let result = loop {
    count += 1;
    if count == 10 {
        break count * 2; // 값과 함께 break
    }
};
```

### 제어문
```rust
// if-else
let number = 6;
let result = if number % 2 == 0 {
    "even"
} else {
    "odd"
};

// match (패턴 매칭)
match number {
    1 => println!("one"),
    2 | 3 | 5 | 7 | 11 => println!("prime"),
    13..=19 => println!("teen"),
    _ => println!("something else"),
}

// if let (Option/Result 처리에 유용)
let some_number = Some(5);
if let Some(n) = some_number {
    println!("Number is {}", n);
}
```

**💡 팁**: `continue`와 `break`에 라벨을 붙여 중첩 루프에서 외부 루프를 제어할 수 있습니다.

```rust
'outer: for i in 0..5 {
    for j in 0..5 {
        if i + j > 5 {
            break 'outer;
        }
        println!("{}, {}", i, j);
    }
}
```

---

## 함수와 클로저

### 함수 정의
```rust
// 기본 함수
fn add(a: i32, b: i32) -> i32 {
    a + b // return 키워드 생략 가능
}

// 제네릭 함수
fn largest<T: PartialOrd + Copy>(list: &[T]) -> T {
    let mut largest = list[0];
    for &item in list {
        if item > largest {
            largest = item;
        }
    }
    largest
}

// 참조 반환
fn first_word(s: &String) -> &str {
    let bytes = s.as_bytes();
    for (i, &item) in bytes.iter().enumerate() {
        if item == b' ' {
            return &s[0..i];
        }
    }
    &s[..]
}
```

### 클로저 (익명 함수)
```rust
let add = |a, b| a + b;
let result = add(1, 2); // 3

// 환경 캡처
let x = 4;
let equal_to_x = |z| z == x; // x를 캡처
let y = 4;
assert!(equal_to_x(y));

// 반복자와 함께 사용
let v = vec![1, 2, 3];
let doubled: Vec<i32> = v.iter().map(|x| x * 2).collect();
let sum: i32 = v.iter().filter(|&x| x > 1).sum();

// 유용한 반복자 메서드들
let numbers = vec![1, 2, 3, 4, 5];

// 변환
let doubled: Vec<i32> = numbers.iter().map(|x| x * 2).collect();
let strings: Vec<String> = numbers.iter().map(|x| x.to_string()).collect();

// 필터링
let evens: Vec<&i32> = numbers.iter().filter(|&x| x % 2 == 0).collect();
let large: Vec<&i32> = numbers.iter().filter(|&&x| x > 2).collect();

// 집계
let sum: i32 = numbers.iter().sum();
let product: i32 = numbers.iter().product();
let max = numbers.iter().max(); // Option<&i32>
let min = numbers.iter().min(); // Option<&i32>

// 검색
let found = numbers.iter().find(|&&x| x > 3); // Option<&i32>
let exists = numbers.iter().any(|&x| x > 3);   // bool
let all_positive = numbers.iter().all(|&x| x > 0); // bool

// 위치 찾기
let pos = numbers.iter().position(|&x| x == 3); // Option<usize>
```

**💡 팁**: 반복자 체이닝을 활용하면 복잡한 데이터 처리를 간결하게 표현할 수 있습니다.

---

## 패턴 매칭과 Option/Result

### Option<T> 사용법
```rust
// None과 Some
let some_number = Some(5);
let absent_number: Option<i32> = None;

// 안전한 접근
match some_number {
    Some(n) => println!("Number is {}", n),
    None => println!("No number"),
}

// if let으로 간결하게
if let Some(n) = some_number {
    println!("Number is {}", n);
}

// unwrap과 expect (패닉 위험)
let n = some_number.unwrap(); // 패닉 가능
let n = some_number.expect("No number found"); // 에러 메시지와 함께 패닉

// 안전한 대안들
let n = some_number.unwrap_or(0); // None이면 0 반환
let n = some_number.unwrap_or_else(|| 0); // 클로저로 기본값 생성
let n = some_number.unwrap_or_default(); // 타입의 기본값 사용

// map과 and_then
let doubled = some_number.map(|n| n * 2); // Some(10)
let parsed = Some("123").and_then(|s| s.parse().ok()); // Some(123)
```

### Result<T, E> 사용법
```rust
use std::fs::File;
use std::io::ErrorKind;

// 파일 열기 (에러 가능)
let f = File::open("hello.txt");

match f {
    Ok(file) => println!("File opened successfully"),
    Err(error) => match error.kind() {
        ErrorKind::NotFound => println!("File not found"),
        other_error => println!("Problem opening file: {:?}", other_error),
    },
}

// ? 연산자 (에러 전파)
fn read_file() -> Result<String, std::io::Error> {
    let mut f = File::open("hello.txt")?; // 에러시 즉시 반환
    let mut s = String::new();
    f.read_to_string(&mut s)?;
    Ok(s) // 성공시 값 반환
}

// unwrap과 expect
let f = File::open("hello.txt").unwrap(); // 패닉 가능
let f = File::open("hello.txt").expect("Failed to open file");
```

### 고급 패턴 매칭
```rust
// 구조체 분해
struct Point {
    x: i32,
    y: i32,
}

let p = Point { x: 0, y: 7 };
match p {
    Point { x, y: 0 } => println!("On x axis at {}", x),
    Point { x: 0, y } => println!("On y axis at {}", y),
    Point { x, y } => println!("On neither axis: ({}, {})", x, y),
}

// 가드 조건
let num = Some(4);
match num {
    Some(x) if x < 5 => println!("less than five: {}", x),
    Some(x) => println!("{}", x),
    None => (),
}

// 여러 값 매칭
let x = 1;
match x {
    1 | 2 => println!("one or two"),
    3..=5 => println!("three through five"),
    _ => println!("something else"),
}
```

**⚠️ 실수 포인트**: 프로그래밍 문제에서 `unwrap()`를 남발하면 예상치 못한 패닉으로 틀릴 수 있습니다. 가능하면 `match`나 `if let`을 사용하세요.

---

## 알고리즘 구현 팁

### 정렬과 검색
```rust
let mut v = vec![3, 1, 4, 1, 5, 9];

// 정렬
v.sort();                    // 오름차순
v.sort_by(|a, b| b.cmp(a)); // 내림차순
v.sort_by_key(|x| x.abs()); // 절댓값 기준

// 이진 검색
let pos = v.binary_search(&4); // Result<usize, usize>
match pos {
    Ok(index) => println!("Found at index {}", index),
    Err(index) => println!("Not found, would insert at {}", index),
}

// 커스텀 정렬
#[derive(Debug)]
struct Person {
    name: String,
    age: u32,
}

let mut people = vec![
    Person { name: "Alice".to_string(), age: 30 },
    Person { name: "Bob".to_string(), age: 25 },
];

people.sort_by(|a, b| a.age.cmp(&b.age)); // 나이순 정렬
people.sort_by_key(|person| person.age);  // 더 간결한 방법
```

### 수학 연산
```rust
// 최대공약수 (유클리드 호제법)
fn gcd(a: i64, b: i64) -> i64 {
    if b == 0 {
        a
    } else {
        gcd(b, a % b)
    }
}

// 최소공배수
fn lcm(a: i64, b: i64) -> i64 {
    a / gcd(a, b) * b
}

// 거듭제곱 (빠른 지수)
fn power(base: i64, exp: u32) -> i64 {
    if exp == 0 {
        1
    } else if exp % 2 == 0 {
        let half = power(base, exp / 2);
        half * half
    } else {
        base * power(base, exp - 1)
    }
}

// 소수 판별
fn is_prime(n: i64) -> bool {
    if n < 2 {
        return false;
    }
    for i in 2..=((n as f64).sqrt() as i64) {
        if n % i == 0 {
            return false;
        }
    }
    true
}

// 에라토스테네스의 체
fn sieve(n: usize) -> Vec<bool> {
    let mut is_prime = vec![true; n + 1];
    is_prime[0] = false;
    if n > 0 {
        is_prime[1] = false;
    }
    
    for i in 2..=((n as f64).sqrt() as usize) {
        if is_prime[i] {
            for j in ((i * i)..=n).step_by(i) {
                is_prime[j] = false;
            }
        }
    }
    is_prime
}
```

### 그래프 표현
```rust
use std::collections::{HashMap, VecDeque};

// 인접 리스트
type Graph = HashMap<i32, Vec<i32>>;

// 그래프 생성
let mut graph = Graph::new();
graph.insert(1, vec![2, 3]);
graph.insert(2, vec![1, 4]);
graph.insert(3, vec![1, 4]);
graph.insert(4, vec![2, 3]);

// BFS
fn bfs(graph: &Graph, start: i32) -> Vec<i32> {
    let mut visited = HashMap::new();
    let mut queue = VecDeque::new();
    let mut result = Vec::new();
    
    queue.push_back(start);
    visited.insert(start, true);
    
    while let Some(node) = queue.pop_front() {
        result.push(node);
        
        if let Some(neighbors) = graph.get(&node) {
            for &neighbor in neighbors {
                if !visited.contains_key(&neighbor) {
                    visited.insert(neighbor, true);
                    queue.push_back(neighbor);
                }
            }
        }
    }
    
    result
}

// DFS
fn dfs(graph: &Graph, node: i32, visited: &mut HashMap<i32, bool>, result: &mut Vec<i32>) {
    visited.insert(node, true);
    result.push(node);
    
    if let Some(neighbors) = graph.get(&node) {
        for &neighbor in neighbors {
            if !visited.contains_key(&neighbor) {
                dfs(graph, neighbor, visited, result);
            }
        }
    }
}
```

### 동적 계획법 (DP)
```rust
// 피보나치 (메모이제이션)
use std::collections::HashMap;

fn fibonacci_memo(n: u32, memo: &mut HashMap<u32, u64>) -> u64 {
    if let Some(&result) = memo.get(&n) {
        return result;
    }
    
    let result = match n {
        0 => 0,
        1 => 1,
        _ => fibonacci_memo(n - 1, memo) + fibonacci_memo(n - 2, memo),
    };
    
    memo.insert(n, result);
    result
}

// 피보나치 (테뷸레이션)
fn fibonacci_dp(n: u32) -> u64 {
    if n <= 1 {
        return n as u64;
    }
    
    let mut dp = vec![0; (n + 1) as usize];
    dp[1] = 1;
    
    for i in 2..=n as usize {
        dp[i] = dp[i - 1] + dp[i - 2];
    }
    
    dp[n as usize]
}

// 배낭 문제
fn knapsack(weights: &[i32], values: &[i32], capacity: i32) -> i32 {
    let n = weights.len();
    let cap = capacity as usize;
    let mut dp = vec![vec![0; cap + 1]; n + 1];
    
    for i in 1..=n {
        for w in 0..=cap {
            if weights[i - 1] <= w as i32 {
                dp[i][w] = std::cmp::max(
                    dp[i - 1][w],
                    dp[i - 1][w - weights[i - 1] as usize] + values[i - 1]
                );
            } else {
                dp[i][w] = dp[i - 1][w];
            }
        }
    }
    
    dp[n][cap]
}
```

**💡 팁**: DP 문제에서는 점화식을 먼저 세우고, bottom-up 방식으로 구현하는 것이 일반적으로 더 효율적입니다.

---

## 자주 하는 실수와 해결법

### 1. 소유권 관련 실수

#### 실수: 이동 후 사용
```rust
// ❌ 잘못된 코드
let v = vec![1, 2, 3];
let v2 = v;  // v의 소유권이 v2로 이동
println!("{:?}", v); // 컴파일 에러!
```

```rust
// ✅ 올바른 해결법
let v = vec![1, 2, 3];
let v2 = v.clone();  // 복사 생성
println!("{:?}", v); // OK

// 또는 참조 사용
let v = vec![1, 2, 3];
let v2 = &v;  // 참조만 전달
println!("{:?}", v); // OK
```

#### 실수: 가변/불변 참조 혼용
```rust
// ❌ 잘못된 코드
let mut v = vec![1, 2, 3];
let r1 = &v;     // 불변 참조
let r2 = &mut v; // 가변 참조 - 컴파일 에러!
println!("{:?} {:?}", r1, r2);
```

```rust
// ✅ 올바른 해결법
let mut v = vec![1, 2, 3];
{
    let r1 = &v;
    println!("{:?}", r1);
} // r1의 생명주기 끝
let r2 = &mut v; // OK
r2.push(4);
```

### 2. 문자열 처리 실수

#### 실수: 문자열 길이 계산
```rust
// ❌ 한글 등에서 문제 발생
let s = "안녕하세요";
println!("{}", s.len()); // 15 (바이트 길이)
```

```rust
// ✅ 올바른 방법
let s = "안녕하세요";
println!("{}", s.chars().count()); // 5 (문자 개수)
```

#### 실수: 문자열 인덱스 접근
```rust
// ❌ 컴파일 에러
let s = "hello";
let h = s[0]; // String/&str은 인덱스 접근 불가
```

```rust
// ✅ 올바른 방법
let s = "hello";
let h = s.chars().nth(0).unwrap(); // 'h'
// 또는
let chars: Vec<char> = s.chars().collect();
let h = chars[0]; // 'h'
```

### 3. 정수 오버플로우

#### 실수: 범위 초과
```rust
// ❌ 오버플로우 위험
let a: i32 = 1_000_000;
let b: i32 = 1_000_000;
let result = a * b; // 오버플로우!
```

```rust
// ✅ 올바른 해결법
let a: i64 = 1_000_000;
let b: i64 = 1_000_000;
let result = a * b; // OK

// 또는 체크 연산 사용
let a: i32 = 1_000_000;
let b: i32 = 1_000_000;
match a.checked_mul(b) {
    Some(result) => println!("Result: {}", result),
    None => println!("Overflow occurred"),
}
```

### 4. 반복자 실수

#### 실수: 반복자 재사용
```rust
// ❌ 반복자는 한 번만 사용 가능
let v = vec![1, 2, 3];
let iter = v.iter();
let sum: i32 = iter.sum();
let count = iter.count(); // 컴파일 에러!
```

```rust
// ✅ 올바른 방법
let v = vec![1, 2, 3];
let sum: i32 = v.iter().sum();
let count = v.iter().count(); // 새로운 반복자 생성
```

#### 실수: collect() 없이 변환 시도
```rust
// ❌ 타입 불일치
let v = vec![1, 2, 3];
let doubled = v.iter().map(|x| x * 2); // Iterator<Item=i32>
```

```rust
// ✅ collect()로 수집
let v = vec![1, 2, 3];
let doubled: Vec<i32> = v.iter().map(|x| x * 2).collect();
```

### 5. Option/Result 처리 실수

#### 실수: unwrap() 남발
```rust
// ❌ 패닉 위험
let numbers = vec![1, 2, 3];
let sum: i32 = numbers.iter().sum();
let avg = sum / numbers.len().unwrap(); // len()은 usize 반환
```

```rust
// ✅ 안전한 처리
let numbers = vec![1, 2, 3];
if !numbers.is_empty() {
    let sum: i32 = numbers.iter().sum();
    let avg = sum / numbers.len() as i32;
    println!("Average: {}", avg);
}
```

### 6. 벡터 인덱스 실수

#### 실수: 범위 검사 없이 접근
```rust
// ❌ 패닉 위험
let v = vec![1, 2, 3];
println!("{}", v[10]); // 패닉!
```

```rust
// ✅ 안전한 접근
let v = vec![1, 2, 3];
match v.get(10) {
    Some(value) => println!("{}", value),
    None => println!("Index out of bounds"),
}
```

### 7. 부동소수점 비교

#### 실수: 직접 비교
```rust
// ❌ 부정확할 수 있음
let a = 0.1 + 0.2;
let b = 0.3;
if a == b {  // false일 가능성
    println!("Equal");
}
```

```rust
// ✅ 오차 범위 내에서 비교
let a = 0.1 + 0.2;
let b = 0.3;
let epsilon = 1e-10;
if (a - b).abs() < epsilon {
    println!("Equal within tolerance");
}
```

### 8. 재귀 스택 오버플로우

#### 실수: 깊은 재귀
```rust
// ❌ 스택 오버플로우 위험
fn factorial(n: u64) -> u64 {
    if n <= 1 {
        1
    } else {
        n * factorial(n - 1) // 매우 큰 n에서 스택 오버플로우
    }
}
```

```rust
// ✅ 반복문으로 변경
fn factorial(n: u64) -> u64 {
    let mut result = 1;
    for i in 2..=n {
        result *= i;
    }
    result
}

// 또는 꼬리 재귀 최적화
fn factorial_tail(n: u64) -> u64 {
    fn factorial_helper(n: u64, acc: u64) -> u64 {
        if n <= 1 {
            acc
        } else {
            factorial_helper(n - 1, n * acc)
        }
    }
    factorial_helper(n, 1)
}
```

---

## 고급 팁과 최적화

### 1. 메모리 효율적인 코드 작성

```rust
// Vec 미리 할당하기
let mut v = Vec::with_capacity(1000); // 재할당 방지

// String 미리 할당하기
let mut s = String::with_capacity(100);

// 불필요한 클론 피하기
fn process_data(data: &[i32]) -> i32 {  // 참조로 전달
    data.iter().sum()
}
```

### 2. 성능 최적화 패턴

```rust
// 반복자 체이닝으로 한 번의 순회로 처리
let numbers = vec![1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
let result: i32 = numbers
    .iter()
    .filter(|&&x| x % 2 == 0)  // 짝수만
    .map(|&x| x * x)           // 제곱
    .sum();                    // 합계

// HashMap 대신 배열 사용 (작은 범위의 키)
let mut counts = [0; 256]; // ASCII 문자 카운팅
for byte in text.bytes() {
    counts[byte as usize] += 1;
}
```

### 3. 디버깅 도구

```rust
// 조건부 컴파일로 디버그 출력
macro_rules! debug_println {
    ($($arg:tt)*) => {
        #[cfg(debug_assertions)]
        println!($($arg)*);
    };
}

// 사용법
debug_println!("Debug: x = {}", x); // Release 빌드에서는 출력되지 않음

// assert 매크로 활용
fn divide(a: i32, b: i32) -> i32 {
    assert_ne!(b, 0, "Division by zero!");
    a / b
}

// 타입 출력 (디버그용)
fn type_of<T>(_: &T) -> &'static str {
    std::any::type_name::<T>()
}

let x = 42;
println!("Type: {}", type_of(&x)); // "i32"
```

### 4. 효율적인 입출력

```rust
use std::io::{self, BufRead, BufReader, Write};

fn fast_io_template() {
    let stdin = io::stdin();
    let mut stdin = stdin.lock();
    let mut buffer = String::new();
    
    // 한 줄씩 읽기
    while stdin.read_line(&mut buffer).unwrap() > 0 {
        let trimmed = buffer.trim();
        if trimmed.is_empty() {
            break;
        }
        
        // 처리 로직
        let numbers: Vec<i32> = trimmed
            .split_whitespace()
            .map(|s| s.parse().unwrap())
            .collect();
        
        println!("{:?}", numbers);
        buffer.clear(); // 버퍼 재사용
    }
}

// 출력 버퍼링
fn buffered_output() {
    let stdout = io::stdout();
    let mut handle = stdout.lock();
    
    for i in 0..1000 {
        writeln!(handle, "{}", i).unwrap();
    }
} // 자동으로 flush됨
```

### 5. 일반적인 알고리즘 패턴

#### 투 포인터
```rust
fn two_sum_sorted(nums: &[i32], target: i32) -> Option<(usize, usize)> {
    let mut left = 0;
    let mut right = nums.len() - 1;
    
    while left < right {
        let sum = nums[left] + nums[right];
        match sum.cmp(&target) {
            std::cmp::Ordering::Equal => return Some((left, right)),
            std::cmp::Ordering::Less => left += 1,
            std::cmp::Ordering::Greater => right -= 1,
        }
    }
    None
}
```

#### 슬라이딩 윈도우
```rust
fn max_sum_subarray(nums: &[i32], k: usize) -> i32 {
    if nums.len() < k {
        return 0;
    }
    
    // 첫 윈도우의 합
    let mut window_sum: i32 = nums[0..k].iter().sum();
    let mut max_sum = window_sum;
    
    // 윈도우를 슬라이딩
    for i in k..nums.len() {
        window_sum = window_sum - nums[i - k] + nums[i];
        max_sum = max_sum.max(window_sum);
    }
    
    max_sum
}
```

#### 분할 정복
```rust
fn merge_sort(arr: &mut [i32]) {
    let len = arr.len();
    if len <= 1 {
        return;
    }
    
    let mid = len / 2;
    merge_sort(&mut arr[0..mid]);
    merge_sort(&mut arr[mid..len]);
    
    let mut temp = arr.to_vec();
    merge(&arr[0..mid], &arr[mid..len], &mut temp);
    arr.copy_from_slice(&temp);
}

fn merge(left: &[i32], right: &[i32], result: &mut [i32]) {
    let (mut i, mut j, mut k) = (0, 0, 0);
    
    while i < left.len() && j < right.len() {
        if left[i] <= right[j] {
            result[k] = left[i];
            i += 1;
        } else {
            result[k] = right[j];
            j += 1;
        }
        k += 1;
    }
    
    while i < left.len() {
        result[k] = left[i];
        i += 1;
        k += 1;
    }
    
    while j < right.len() {
        result[k] = right[j];
        j += 1;
        k += 1;
    }
}
```

---

## 프로그래밍 문제 해결 전략

### 1. 문제 분석 체크리스트
- [ ] 입력 범위와 제약 조건 확인
- [ ] 시간 복잡도 계산 (보통 O(n²)까지는 안전)
- [ ] 오버플로우 가능성 검토 (i64 사용 고려)
- [ ] 예외 상황과 엣지 케이스 고려
- [ ] 메모리 사용량 추정

### 2. 구현 단계
1. **입출력 형식 확인** - 정확한 파싱과 출력 형식
2. **알고리즘 설계** - 의사코드나 주석으로 로직 정리
3. **기본 케이스 구현** - 간단한 경우부터 시작
4. **테스트** - 주어진 예제로 검증
5. **최적화** - 필요시 성능 개선

### 3. 자주 사용하는 라이브러리 import
```rust
use std::collections::{HashMap, HashSet, BTreeMap, BTreeSet, VecDeque, BinaryHeap};
use std::cmp::{min, max, Reverse};
use std::io::{self, BufRead, Write};
use std::mem;
```
