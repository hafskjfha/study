# Git 명령어 정리

## 목차

1. Conventional Commits
2. 커밋 메시지 수정
3. 커밋/푸시 취소 및 되돌리기
4. 브랜치 실수 대응
5. 브랜치 관리
6. 변경사항 임시 저장 (stash)
7. 로그 및 변경 이력 확인
8. 원격 저장소 관련 명령어
9. 자주 쓰는 기타 명령어

---

## 1. Conventional Commits

| 타입       | 의미                               |
| -------- | -------------------------------- |
| feat     | 새로운 기능 추가 (feature)              |
| fix      | 버그 수정                            |
| test     | 테스트 코드 추가 또는 수정                  |
| docs     | 문서 수정 (README, 주석 등)             |
| style    | 코드 의미에 영향을 주지 않는 변경 (포맷, 세미콜론 등) |
| refactor | 기능 변화 없는 구조 개선                   |
| chore    | 빌드, 패키지 설정 등 기타 작업               |
| perf     | 성능 개선                            |
| ci       | CI 설정 파일 및 스크립트 수정               |

예시:

```
feat: 사용자 로그인 기능 추가
fix: 토큰 만료 시 오류 수정
```

---

## 2. 최근 커밋 메시지 수정

```
git commit --amend
```

* 직전 커밋 메시지 및 내용 수정 가능
* 원격에 이미 push한 경우 강제 푸시 필요

```
git push --force
```

주의: 협업 브랜치에서는 사용 자제

---

## 3. 커밋 + 푸시 취소 (로컬 변경 유지)

```
git reset --soft HEAD~1
```

* 커밋만 취소하고 변경사항은 스테이징 상태 유지

이후 원격 반영:

```
git push --force
```

---

## 4. 실수로 다른 브랜치에 커밋했을 때

### 4-1. 잘못 커밋한 브랜치에서

```
git reset --soft HEAD~1
git stash
```

### 4-2. 올바른 브랜치로 이동

```
git checkout <target-branch>
git stash pop
git commit -m "옮긴 커밋 메시지"
```

### 4-3. 원래 브랜치 커밋 흔적 제거

```
git push origin <original-branch> --force
```

---

## 5. 브랜치 관리

### 브랜치 목록 확인

```
git branch
git branch -r
git branch -a
```

### 브랜치 생성 및 이동

```
git checkout -b new-branch
```

### 브랜치 삭제

```
git branch -d branch-name
git branch -D branch-name  # 강제 삭제
```

---

## 6. 변경사항 임시 저장 (stash)

### 임시 저장

```
git stash
```

### 목록 확인

```
git stash list
```

### 복원

```
git stash pop
git stash apply stash@{0}
```

### stash 삭제

```
git stash drop stash@{0}
git stash clear
```

---

## 7. 로그 및 변경 이력 확인

### 커밋 로그

```
git log
git log --oneline --graph --all
```

### 파일별 변경 내역

```
git diff
git diff --staged
```

---

## 8. 원격 저장소 관련 명령어

### 원격 저장소 확인

```
git remote -v
```

### 원격 브랜치 가져오기

```
git fetch
```

### 병합

```
git merge origin/main
```

### rebase (히스토리 정리용)

```
git rebase main
```

---

## 9. 자주 쓰는 기타 명령어

### 상태 확인

```
git status
```

### 파일 추가

```
git add .
git add 파일명
```

### 특정 파일 되돌리기

```
git checkout -- 파일명
```

### HEAD 기준으로 완전 되돌리기 (주의)

```
git reset --hard HEAD
```

---

> 정리 팁:
>
> * `reset --soft / --mixed / --hard` 차이 명확히 구분하기
> * `force push`는 혼자 쓰는 브랜치에서만 사용
> * 협업 시에는 `rebase`보다 `merge` 선호 여부를 팀 규칙에 맞출 것
