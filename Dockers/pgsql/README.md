# 명령어 몇개
## db백업
```
docker exec -t <컨테이너이름> pg_dump -U <db유저명> -d <db이름> -F c -f /tmp/backup.custom
```
으로 백업하고
```
docker cp <컨테이너이름>:/tmp/backup.custom <로컬에 저장할 경로>
```
이것으로 로컬에 복사하고
쓸때는 pgadmin이나 명령줄로 restore하면됨.
