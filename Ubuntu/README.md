# 1. 시스템 정보 및 상태 확인
| 명령어            | 설명                                    |
| -------------- | ------------------------------------- |
| `top` / `htop` | 실시간 CPU, 메모리 사용률 확인 (`htop`은 더 보기 편함) |
| `free -h`      | 메모리 사용 현황 확인                          |
| `df -h`        | 디스크 사용량 확인                            |
| `uptime`       | 시스템 가동 시간 및 부하 평균 확인                  |
| `uname -a`     | 커널 및 시스템 정보 확인                        |

# 2. 서비스 관리 (systemd)
| 명령어                       | 설명                    |
| ------------------------- | --------------------- |
| `systemctl status nginx`  | 서비스 상태 확인 (ex: Nginx) |
| `systemctl start nginx`   | 서비스 시작                |
| `systemctl stop nginx`    | 서비스 중지                |
| `systemctl restart nginx` | 서비스 재시작               |
| `systemctl enable nginx`  | 부팅 시 자동 시작 설정         |
| `systemctl disable nginx` | 자동 시작 해제              |

# 3. 네트워크 관련
| 명령어                        | 설명                          |
| -------------------------- | --------------------------- |
| `ip a`                     | IP 주소 확인                    |
| `ping google.com`          | 네트워크 연결 확인                  |
| `curl -I http://localhost` | 웹 서버 응답 헤더 확인               |
| `ss -tulpn`                | 열려 있는 포트 및 프로세스 확인          |
| `netstat -tulpn`           | (`ss` 대안) 포트 확인 (패키지 설치 필요) |

# 4. 로그 확인
| 명령어                                                | 설명            |
| -------------------------------------------------- | ------------- |
| `journalctl -u nginx`                              | 특정 서비스의 로그 보기 |
| `tail -f /var/log/nginx/access.log`                | 실시간 로그 모니터링   |
| `tail -f /var/log/nginx/error.log`                 | 에러 로그 실시간 확인  |
| `less /var/log/syslog` 또는 `less /var/log/messages` | 시스템 로그 확인     |

# 5. 파일/디렉토리 관련
| 명령어                  | 설명            |
| -------------------- | ------------- |
| `ls -l`              | 파일 목록 및 권한 확인 |
| `cd /경로`             | 디렉토리 이동       |
| `cp`, `mv`, `rm`     | 복사, 이동, 삭제    |
| `chmod`, `chown`     | 권한 변경, 소유자 변경 |
| `nano`, `vim`, `cat` | 파일 내용 보기/수정   |

# 6. 패키지 관리
| 명령어                 | 설명         |
| ------------------- | ---------- |
| `apt update`        | 패키지 목록 최신화 |
| `apt upgrade`       | 패키지 업그레이드  |
| `apt install nginx` | 패키지 설치     |
| `apt remove nginx`  | 패키지 제거     |

# 7. 보안 및 방화벽
| 명령어            | 설명                 |
| -------------- | ------------------ |
| `ufw status`   | 방화벽 상태 확인 (Ubuntu) |
| `ufw allow 80` | 80번 포트 열기          |
| `ufw enable`   | 방화벽 활성화            |
| `ufw disable`  | 비활성화               |

# 8. 기타 유용한 명령어
| 명령어                  | 설명                 |
| -------------------- | ------------------ |
| `ps aux`             | 실행 중인 프로세스 목록 확인   |
| `kill -9 PID`        | 특정 프로세스 강제 종료      |
| `grep`, `awk`, `sed` | 로그/텍스트에서 원하는 정보 추출 |
| `scp`, `rsync`       | 원격 서버와 파일 전송       |

