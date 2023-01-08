---
title: 쉘 스크립트 if 조건변수
authors: me
tags: [bash, linux]
date: 2017-07-30 21:48:42
---

쉘 스크립트의 비교 변수 몇 가지를 알아보자.

# 파일 상태 비교

| 연산자 | 기능                                      | 예시                    |
| ------ | ----------------------------------------- | ----------------------- |
| -a     | file_exists                               | [ -a /etc/passwd ]      |
| -d     | file_exists && is_dir                     | [ -d /etc ]             |
| -f     | file_exists && is_file                    | [ -f /etc/passwd ]      |
| -s     | file_exists && not empty                  | [ -s /etc/passwd ]      |
| -w     | 해당 유저로 쓰기 가능                     | [ -w test.txt ]         |
| -x     | 해당 유저로 실행 가능                     | [ -x test.sh ]          |
| -N     | 마지막 파일 읽은 시점부터 변경점이 있는지 | [ -N test.txt ]         |
| -O     | 해당 유저의 파일인지                      | [ -O test.txt ]         |
| -G     | 해당 그룹의 파일인지                      | [ -G test.txt ]         |
| -nt    | B파일보다 A파일이 새로운지                | [ A\_file -nt B\_file ] |
| -ot    | B파일보다 A파일이 오래됬는지              | [ A\_file -ot B\_file ] |

# 숫자 비교

| 연산자 | 기능                  | 예시        |
| ------ | --------------------- | ----------- |
| -lt    | Less than             | [ 0 -lt 1 ] |
| -le    | Less than or Equal    | [ 1 -le 1 ] |
| -eq    | Equal                 | [ 1 -eq 1 ] |
| -gt    | Greater than          | [ 1 -gt 0 ] |
| -ge    | Greater than or Equal | [ 1 -ge 1 ] |
| -ne    | Not Equal to          | [ 1 -ne 0 ] |
