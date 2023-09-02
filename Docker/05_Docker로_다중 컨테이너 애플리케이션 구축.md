# 5.Docker로 다중 컨테이너 애플리케이션 구축하기

> Three Building Blocks
>
> > Database - mongoDB  
> > Backend - NodeJS REST API  
> > Frontend - React SPA

```
----------------------
Run MongoDB Container
----------------------
docker run --name mongodb \
    -v data:/data/db \
    --rm \
    -d \
    --network goals-net \
    -e MONGO_INITDB_ROOT_USERNAME=max \
    -e MONGO_INITDB_ROOT_PASSWORD=secret \
    mongo
```

```
----------------------
Build Node API Image
----------------------
docker build -t goals-node .

----------------------
Run Node API Container
----------------------

docker run --name goals-backend \
    -v /Users/southkyu/Documents/study/docker-udemy/multi-01-starting-setup/backend:/app \
    -v logs:/app/logs \
    -v /app/node_modules \
    -e MONGODB_USERNAME=max \
    -d \
    --rm \
    --network goals-net \
    -p 80:80 \
    goals-node

```

```
---------------------------
Build React SPA Container
---------------------------
docker build -t goals-react .

-------------------------
Run React SPA Container
-------------------------
react -it 인터렉티브 모드로 실행 시켜준다.

docker run --name goals-frontend \
    --rm \
    -p 3000:3000 \
    -it \
    goals-react
```

# Docker Compose 다중 컨테이너 관리

다중 컨테이너 설정을 더 쉽게 관리하기 위해 도커 컴포즈라 불리는 도구가 제공된 이유이다.
설정 프로세스를 자동화하는데 도움이 되며, 단 하나의 명령으로 각각의 모든 컨테이너와 그들의 개별 구성을 지닌 전체 설정을 가져올 수 있다.

### Docker-Compose: 무엇이며 왜 사용하는가?

> Docker compose 는 `docker build`와 `docker run` 명령을 대체할수 있는 도구이다. 단 하나의 구성 파일로 가진다. 모든 서비스 모든 컨테이너를 즉시 시작하고 필요하다면 모든 필요한 이미지를 빌드하는 명령 셋이다.

- 도커컴포즈는 하나의 동일한 호스트에서 다중 컨테이너를 관리하는데 좋다.
- 도커 컴포즈 자체는 `-d` (detached모드) `-rm` 디폴트로 실행된다.

### 도커 컴포즈 작성법

```
version: "3.8"          # 도커 컴포즈 버전 명시
services:
  mongodb:              # 컨테이너명 작성
    image: "mongo"      # 사용할 도커 이미지 명시
    volumes:            # 도커볼륨 사용시 명시 `-` 사용시 여러개 가능
      - data:/data/db
    environment:        # 환경변수 주입
      MONGO_INITDB_ROOT_USERNAME: max       # 하나씩 명세 가능
      MONGO_INITDB_ROOT_PASSWORD: secret
      # - MONGO_INITDB_ROOT_USERNAME=max    # 여러개 명시 가능
    env_file:
        - ./env/mongo.env           # env_file로 .env 환경변수들을 팔일로 가져올수있다.
  backend:

  frontend:

```

환경 변수 사용시
`-` 가 필요한 이유가 명확하지 않을수 있다.

- 콜론(:) 가지고 있다면 '-'가 필요없다.
- 콜론과 공백이 없는 단일 값의 경우 '-'가 필요

`networks`키워드를 통해 네트워크를 추가할수 있다.

- 도커 컴포즈를 사용하면 도커가 컴포즈 파일에 특정된 모든 서비스에 대해 새 환경을 자동으로 생성하고 모든 서비스를 즉시 그 네트워크에 추가하기 때문'
- 따라서 도커 컴포즈를 사용하면 모든 서비스가 이미 도커에 의해 동일한네트워크 일부가 된다.

서비스 수준과 동일하게 volumes 키를 추가하는 이유
-> 도커가 서비스를 위해 생성해야 하는 명명된 볼륨을 인식하기 위해 필요한 구문이다.
참고사항으로 다른 서비스에서 동일한 볼륨 이름을 사용하면 그 볼륨이 공유된다.
따라서 다른 컨테이너가 호스팅 머신 상의 동일한 볼륨, 동일한 폴더를 사용할 수도 있다.

### backend configuration

이전 섹션에서 goals-node이미지를 구축했다.
`image:'goals-node` 라고 지정할수 있지 않냐?
하지만 모든 이미지는 제거했으므로 더 이상 존재하지 않다. 물론 리빌드하여 사용할수 있지만 도커 컴포즈는 이 빌드 단계도 대체된다.

완성된 이미지를 지정하는 대신 도커 컴포즈에 이미지를 빌드하는데 필요한 모든 정보를 제공할 수 있다. 이미지가 속한 컨테이너 아래에 `build` 옵션으로 빌드해야 하는 Dockerfile을 찾을 수 있는 곳을 알 수 있다.

yaml파일과 동일한 폴더에 있고 그안의 backend폴더에 있다고 알려줄수 있다. 그러면 도커 컴포즈는 그 폴더를 살펴 도커파일이라는 파일을 찾는다.
그리고 이 백엔드서비스에 대한 이미지를 빌드한다. 그리고 이것이 빌드되면 이 컨테이너에 이미지를 사용한다.

만약 중첩된 키가 존재한다면 build키워드 아래 contenxt를 추가할수 있따.

예를 들어 Dockerfile-dev이라면 도커 컴포즈에 사용할 도커파일을 이런식으로 사용할수 있따.

프론트엔드 인터렉티브모드로 실행하기위해 stdin_open tty 키워드를 추가시켜준다.

> docker-compose build 빌드 명령어를 추가하면 이미지를 재빌드 할수 있다. 만약 소스코드가 변경이 되어 이미지 재빌드가 필요하다면 이미지를 재빌드하도록 강제할수 있는 기능이다.

```
version: "3.8"
services:
  mongodb:
    image: "mongo"
    container_name: mongodb
    volumes:
      - data:/data/db
    # environment:
    # MONGO_INITDB_ROOT_USERNAME: max
    # MONGO_INITDB_ROOT_PASSWORD: secret
    # - MONGO_INITDB_ROOT_USERNAME=max
    env_file:
      - ./env/mongo.env
  backend:
    image: goals-node
    build: ./backend
    container_name: goals-backend
    # build:
    #   context: ./backend
    #   dockerfile: dockerfile
    #   arg:
    #     some-arg: 1
    ports:
      - "80:80"
    volumes:
      - logs:/app/logs
      - ./backend:/app
      - /app/node_modules
    env_file:
      - ./env/backend.env
    depends_on:
      - mongodb
  frontend:
    image: goals-react
    build: ./frontend
    ports:
      - "3000:3000"
    container_name: goals-frontend
    volumes:
      - ./frontend/src:/app/src
    stdin_open: true
    tty: true
    depends_on:
      - backend
volumes:
  data:
  logs:

```
