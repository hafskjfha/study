# git명령어들 공부해놓은것 정리
## 목차

## Conventional Commits
|타입|의미|
|----|----|
|feat|새로운 기능 추가 (feature)|
|fix|버그 수정|
|test|테스트 코드 추가 또는 수정|
|docs|문서 수정 (README, 주석 등)|
|style|코드 의미에 영향을 주지 않는 변경 (코드 포맷팅, 세미콜론 누락 등)|
|refactor|코드 리팩토링 (기능 추가나 버그 수정이 아닌 코드 구조 개선)|
|chore|빌드 업무 수정, 패키지 매니저 설정 등 코드 외적인 작업|
|perf|성능 개선 (performance)|
|ci|CI 설정 파일 및 스크립트 수정|

## 최근 1커밋 커밋메시지 수정
```
git commit --amend
```
명렁어로 커밋메시지 수정창 열어서 수정후 저장. -> 창닫으면 뭐가 나옴.<br>
다음 명령어 입력
```
git push --force
```
강제로 푸시해서 바꾸기

## 커밋+푸시 취소
로컬코드는 바뀐거 그대로 두고 원격저장소만 푸시 취소
```
git reset --soft HEAD~1
```
후 강제로 푸시
```
git push --force
```
## 실수로 다른브랜치에 커밋했을때
### 커밋한 브랜치에서
```
git reset --soft HEAD~1
```
```
git stash
```
### 이동
```
git checkout <target-branch>
```
```
git stash pop
```
```
git commit -m "옮긴 커밋 메시지"
```
### 커밋흔적 삭제
```
git push origin <original-branch> --force
```
