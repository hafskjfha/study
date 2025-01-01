# javascript/typescript ![JavaScript Badge](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=JavaScript&logoColor=black) ![TypeScript Badge](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white) 

## JSDoc 주석
함수, 객체 등을 설명할때 사용할수 있다.
```js
/**
* 함수 설명
*
* @param {type} name - description
* @returns {type} description
* @throws {type} description
* @example
*/
```
이렇게 사용가능 하다. 아래는 예시
```js
/**
 * 두 숫자의 합을 반환하는 함수
 * 
 * @param {number} a - 첫 번째 숫자
 * @param {number} b - 두 번째 숫자
 * @returns {number} 두 숫자의 합
 * @example
 * // 두 숫자 3과 5의 합을 구할 때
 * add(3, 5); // 8
 */
function add(a: number, b: number): number {
    return a + b;
}
```

## union type 선언
ts를 쓰다보면 이런상황에 타입을 어떻게 처리해야할지 몰랐다.<br>
예시) 로그인을 구현할때 로그인을 한후 결과를 받은것의 타입을 딱 선언하고 싶을때.<br>
성공하면 success가 true이고 jwt,username을 주지만 success가 false가 되면 jwt,username가 주어지지 않을때<br>
처음생각)
```ts
type LoginResponse = {
    success: boolean;
    username?: string;
    jwt?: string;
}
```

```ts
const response = await axios.post('/api/login', { code }, {
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                
const data = response.data as LoginResponse;
if (data.success) {
    setUsername(data.username!);
    setIsLoggedIn(true);
    localStorage.setItem("jwt", data.jwt!);

    if (autoLogin) {
        localStorage.setItem("username", data.username!);
    }
} else {
    setError("로그인 코드가 잘못되었습니다.");
}

```
이렇게 하면 !를 붙이지 않으면 ts컴파일러가 jwt,username가 null또는 undefinde가 될수있다고 띄우기 때문에 !룰 붙여야하는 번거로움이 있다.
해결방안) **union type** 사용
```ts
type LoginResponse =
    | {
        success: true;
        jwt: string;
        refresh_token: string;
        username: string;
}
    | {
        success: false;
};
```
```ts
const response = await axios.post('/api/login', { code }, {
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                
const data = response.data as LoginResponse;

if (data.success) {
    setUsername(data.username);
    setIsLoggedIn(true);
    localStorage.setItem("jwt", data.jwt);

    if (autoLogin) {
        localStorage.setItem("username", data.username);
    }
} else {
    setError("로그인 코드가 잘못되었습니다.");
    }
```
이렇게 하면 안전하게 타입을 선언가능하다!
