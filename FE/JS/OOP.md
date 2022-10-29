## 캡슐화

\_email 프로퍼티에 직접 접근하는 방법 대신 getter/setter 메소드로 접근한다.

아래 class를 통해 완벽한 캡슐화가 된 상태가 아니다.
자바스크립트에는 캡슐화를 자체적으로 지원하는 문법이 없다.

```js
class User {
  constructor(email, birthdate) {
    this.email = email;
    this.birthdate = birthdate;
  }

  buy(item) {
    console.log(`${this.email} buys ${item.name}`);
  }

  // getter
  get email() {
    return this._email;
  }

  // setter
  set email(address) {
    if (address.includes("@")) {
      this._email = address;
    } else {
      throw new Error("invalid email address");
    }
  }
}

const user1 = new User("doordie@took.com", "1992-09-23");
user1.email = "newDoordie@took.com";
```

user 객체에 접근하면 email을 접근이 가능하므로 캡슐화가 완벽하게 이뤄지지 않음 이를 해결하기 위해 `클로저(Clouser)`라는 개념으로 우회해서 완벽한 캡슐화를 할 수 있다.

## 클로저를 활용한 캡슐화

```js
//클로저를 활용한 캡슐화
function createUser(email, birthdate) {
  let _email = email;

  const user = {
    birthdate,

    get email() {
      return _email;
    },

    set email(address) {
      if (address.includes("@")) {
        _email = address;
      } else {
        throw new Error("invalid email address");
      }
    },
  };

  return user;
}

const user1 = createUser("doordie@took.com", "1992-09-23");
console.log(user1); // {birthdate: '1992-09-23'}
console.log(user1.email); // undefined
```

클로저: 함수가 정의된 상시에 참조할 수 있었던 변수들을 계속해서 참조할수 있는 상태의 함수

## 상속

코드의 재사용성이 좋아진다.
필요의 경우 자식클래스에서 부모클래스와 동일한 이름의 메소드를 재정의(오버라이딩) 할수 있다.

```js
class User {
  constructor(email, birthdate) {
    this.email = email;
    this.birthdate = birthdate;
  }

  buy(item) {
    console.log(`${this.email} buys ${item.name}`);
  }
}

class PremiumUser extends User {
  constructor(email, birthdate, level) {
    super(email, birthdate);
    this.level = level;
  }

  streamMusicForFree() {
    console.log(`Free music streaming for ${this.email}`);
  }
}
```

## 다형성(Polymorphism)

하나의 변수가 다양한 종류의 클래스로 만든 여러 객체를 가리킬수 있다.

```js
class User {
  constructor(email, birthdate) {
    this.email = email;
    this.birthdate = birthdate;
  }

  buy(item) {
    console.log(`${this.email} buys ${item.name}`);
  }
}

class PremiumUser extends User {
  constructor(email, birthdate, level) {
    super(email, birthdate);
    this.level = level;
  }

  buy(item) {
    console.log(`${this.email} buys ${item.name} with a 5% discount`);
  }

  streamMusicForFree() {
    console.log(`Free music streaming for ${this.email}`);
  }
}

const item = {
  name: "맥북",
  price: 10000,
};

const user1 = new User("chris123@google.com", "19920321");
const user2 = new User("rachel@google.com", "19880516");
const user3 = new User("brian@google.com", "20051125");
const pUser1 = new PremiumUser("niceguy@google.com", "19891207", 3);
const pUser2 = new PremiumUser("helloMike@google.com", "19900915", 2);
const pUser3 = new PremiumUser("aliceKim@google.com", "20010722", 5);

const users = [user1, pUser1, user2, pUser2, user3, pUser3];

users.forEach((user) => {
  user.buy(item);
});
```

forEach문 안의 user는 User 클래스로 만든 객체를 가리킬 때도 있고, PremiumUser 클래스로 만든 객체를 가리킬 때도 있다.

매번 user 객체의 buy 메소드가 호출된다는 점은 같지만, 구체적으로 무슨 클래스로 만든 객체의 buy 메소드가 호출되느냐에 따라 결과가 달라진다 => 단순한 코드로 다양한 결과를 낼 수 있는 건 다형성 덕분.

super : 자식 클래스에서 부모 클래스의 생성자 함수를 호출할 때 / 부모 클래스의 일반 메소드를 호출할 때 사용.
