---
title: 'SSHD 보안 - fail2ban, port 변경'
authors: me
tags: [fail2ban, linux]
date: 2017-09-22 07:50:15
---

# 실패한 로그인 IP 확인

```bash
$ cat /var/log/secure | grep 'sshd.*Failed' | grep -Po "[0-9]+\.[0-9]+\.[0-9]+\.[0-9]+" | sort | uniq -c

# 실패 카운트와 IP
6 100.34.214.24
6 101.109.152.219
6 101.164.141.36
```

기본 포트를 사용 중이라면 어마어마한 IP 목록이 나올 것이다.

# SSH 포트 변경

## SSH 설정 변경

/etc/ssh/sshd_config 에 포트 설정을 변경한다.

```bash title="/etc/ssh/sshd_config"
Port 2020
```

## SElinux 포트 추가

```bash
$ semanage port -a -t ssh_port_t -p tcp 2020
```

## 방화벽 포트 추가

```bash
$ firewall-cmd --permanent --zone=public --add-port=2020/tcp
$ firewall-cmd --reload
```

## SSH 재시작

```bash
$ systemctl restart sshd
```

# Fail2ban

일정 시도 이상을 실패하면 해당 IP 를 차단시키는 Fail2ban 을 설치하자

## 설치

```bash
# repo가 없다면
# $ yum install -y epel-release

$ yum install -y fail2ban
```

## SSH 설정 추가

/etc/fail2ban/jail.local 또는 jail.conf 를 열어 [sshd] 의 enabled 속성을 true 로 변경한다.

## 서비스 시작

```bash
$ systemctl enable fail2ban
$ systemctl start fail2ban
```

# 더 쉬운 방법

쉘스크립트로 포트변경, 방화벽 룰 추가, Fail2ban 까지 한 방에 끝내버리자.

```bash
$ wget https://raw.githubusercontent.com/FunctionClub/Fail2ban/master/fail2ban.sh && bash fail2ban.sh 2>&1 | tee fail2ban.log
```

명령문에 따라 입력만 해주면 된다. 자세한 설명은 [FunctionClub/Fail2ban](https://github.com/FunctionClub/Fail2ban) 참고하자.
