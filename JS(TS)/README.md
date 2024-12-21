# javascript/typescript

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
