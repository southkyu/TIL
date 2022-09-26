# 8 제어문

# 9 타입변환과 단축평가

## 9.1 타입변환이란?

---

> **명시적 타입 변환 or 타입 캐스팅**
> 개발자가 의도적으로 값의 타입을 변환하는 것

> **암묵적 타입 변환 or 타입 강제 변환**
> 표현식을 평가하는 도중 자바스크립트 엔진에 의해 암묵적으로 타입이 자동변환되는 것

```js
//명시적 타입 변환
// 숫자를 문자열로 타입 캐스팅한다
var x = 10;
var str = x.toString();
console.log(typeof str, str); //string 10
```

## 9.2 암묵적 타입 변환

---

```js
"10" + 2; // -> '102'
```

```js
//단축 평가를 사용한 매개변수의 기본값 설정
function getStringLength(str = "") {
  // ES6 생략
  // str = str || ''
  return str.length;
}
getStringLength(); // 0
getStringLength("hi"); // 2
```

```js
!!0; // false
!!1; // true
!!NaN; // false
!!Infinity; // true
!!null; // false
!!undefined; // false
!!{}; // true
!![]; // true
```

### 9.4.2 옵셔널 체이닝 연산자

ES11에서 도입된 옵셔널 체이닝 연산자는 좌항의 연산자가 null 또는 undefined인 경우 undefined를 반환하고 그렇지 않으면 우항의 프로퍼티 참조한다..

### 9.4.3 null병합 연산자

ES11에서 도입된 null병합 연산자 ??는 좌항의 피연산자가 null 또는 undefine인 경우 우항의 피연산자를 반환
그렇지 않느면 좌항의 피연산자를 반환한다.

변수에 기본값을 설정할때 유용하다.

```js
var foo = null ?? "default string";
console.log(foo); // 'default string'
```
