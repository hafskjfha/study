# git명령어들 공부해놓은것 정리
## 목차

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
