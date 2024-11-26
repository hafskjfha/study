# Dockers
도커를 공부하고 저장하는 곳

## 폴더 목록
- redis -> redis를 docker-compose를 통해 실행시키는 코드 (포트를 열어서 다른 컴퓨터(같은 인터넷망)에서는 접속이 가능하도록 함) <물론 포트를 열어놔야함>
- pgsql -> pgsql를 docker-compose를 통해 실행시키는 코드(+pgAdmin 포함)

## 도커 명령어 모음
### 컨테이너들 상태 확인
```
docker ps
```
### 컨테이너들 사용중인 리소스 확인
```
docker stats
```
### 도커컴포즈 컨테이너 시작
```
docker-compose up
```
### 도커컴포즈 컨테이너 시작 + 빌드
```
docker-compose up --build
```
### 도커컴포즈 컨테이너 멈추기
```
docker-compose stop
```
### 도커컴포즈 컨테이너 중지 + 네트워크 삭제
```
docker-compose down
```
### 도커컴포즈 컨테이너 중지 + 네트워크,볼륨 삭제
```
docker-compose down -v
```
