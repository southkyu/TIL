
## nextjs14에서 `run dev` 했는데 왜 `layout.tsx` 를 자동으로 생성할까?

> react-router의 작동방식은 url을 지정하고 home이라는 컴포넌트 render를 요청하는 것이다.

1. navigation
2. navigation bar
3. client/server component
4. layout


## CSR / SSR 차이점을 알아보자!

> CSR  : 모든 렌더링이 클라이언트 측에서 발생 , 클라이언트는 자바스크립트를 로드하고, 자바스크립트가 UI를 빌드함(화면이 깜빡이는 이유)

리액트에서 사용자 브라우저인 clien단에서 모든 렌더링 작업을 수행한다.
모든 렌더링이 브라우저 즉, 클라이언트 측에서 UI를 구축(페이팅) 해야 한다.

단점)
- 페이지의 실제 소스코드를 보면 비어있는것을 볼수있다.
	- inspect를 켜서 html 태그를 볼수 있지만 원래 있었던 것은 아니다. 자바스크립트에 의해 페이지에 추가된 것이다. (즉, 유저가 페이지에 도착한 시점에 페이지는 빈페이지다.)
	- 브라우저가 이 모든 자바스크립트 파일을 다운로드하고 실행한 후에야 화면이 보여진다.
	![[Pasted image 20240415234502.png]]
- SEO 검색 엔진 최적화
	- 웹사이트가 구글에 노출되기를 바란다면 빈페이지를 보여주지 않는것이 좋다.
	- 가끔 구글 자바스크립트를 실행하긴 하지만 위험을 감수할 필요가 있을까?


 > SSR : NextJS로 웹 사이트를 빌드할 때, 기본적으로 SSR을 사용함
 
 nextjs는 페이지의 내용들이 모두 실제 브라우저 코드에 있는것을 볼 수 있다.
 => 브라우저가 자바스크립트가 로드 될 때까지 기다릴 필요가 없다는 것을 의미한다. 즉, next.js가 우선 server에서  render한다는 것을 의미

client/server component든 모든 component에서 서버사이드렌더링이 발생한다.

**모든 컴포넌트와 페이지들은 먼저 backend에서 render 된다**

>렌더링이란?  
>NextJS가 리액트 컴포넌트를 브라우저가 이해할 수 있는 html로 변환하는 작업


use clinet
hydration 과정이 모든 component에 대해 발생하지 않는다는 것이다.
모든 컴포넌트는 서버사이드에서 먼저 렌더된다. client에서 hydrate되는 컴포넌트는 client에서 interactive하게 만들어질 컴포넌트는 `use client` 지시어를 갖고 있는 컴포넌트들 뿐이다.

use client가 사용되지 않았다는 것은?
framework가 initialize된 후든 hydration이 완료 된 후 든 `title`은 hydrate되지 않는다는 것이다. why? 그럴 필요가 없으므로.

## Recap
nextjs는 backend에서 우리 application을 pre render 한 후 모든 컴포넌트를 가져가서 non interactive한 HTML로 바꿔 사용자에게 준다. 
=> 리액트 컴포넌트가 HTML로 바뀐것을 볼수 있는 이유

사용자가 웹사이트에 도착하자마자 HTML을 전달하고, 프레임워크와 react.js를 initailize하고, use client 명령어를 가진 component가 hydrate된다.(hydrate = interactive된다)

위는 nextjs 이전 버전들과 다르다. 어떤 컴포넌트를 hydrate 할 건지 선택한다는 점에서 새로운방식이다. 이전에는 모든 component가 hydrate 되었다.

> hydration은 우리가 받은 HTML의 위에서 React application을 실행한다는 뜻이다.

hydrate의 장점 
- 사용자들이 다운받아야 하는 자바스크립트 코드의 양이 줄어든다.

