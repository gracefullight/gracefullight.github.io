---
title: windows에 spring boot cli 설치하기
authors: me
tags: [java, spring, windows]
date: 2018-02-08 01:03:20

---

# 설치

스프링 부트를 설치해보자.

[여기](https://repo.spring.io/milestone/org/springframework/boot/spring-boot-cli/)서 원하는 버전 스냅샷의 **bin.zip** 파일을 받아 압축을 풀어준다
예를 들면 `spring-boot-cli-2.1.0.M1-bin.zip` 를 **C:/spring**에 압축을 풀면 된다.

정식버전은 [여기](https://docs.spring.io/spring-boot/docs/current/reference/html/getting-started-installing-spring-boot.html#getting-started-manual-cli-installation)의 zip 파일을 받으면 된다.

## 설정

환경변수를 3 개 추가해줘야한다

- JAVA_HOME 변수에 JDK 설치 경로 (C:/Program Files/Java/jdk-10.0.2)
- SPRING_HOME 변수에 방금 압축푼 spring cli 의 경로 (C:/spring)
- path 변수에 `%SPRING_HOME%\bin` 경로

## 오류

`git bash`에서 **org.springframework.boot.loader.JarLauncher 을(를) 찾거나 로드할 수 없습니다**란 오류가 뜰 때는 **spring/bin/spring**파일을 열어 다음과 같이 수정하자

```bash spring
# 16번째 줄 if 문 주석처리
# For Cygwin, ensure paths are in UNIX format before anything is touched.
# if $cygwin ; then
  [ -n "$JAVA_HOME" ] && JAVA_HOME=`cygpath --unix "$JAVA_HOME"`
# fi

# 94번째 줄 if 문 주석처리
# if $cygwin; then
  PRING_HOME=`cygpath --path --mixed "$SPRING_HOME"`
  CLASSPATH=`cygpath --path --mixed "$CLASSPATH"`
# fi
```

[출처](https://stackoverflow.com/questions/45567869/spring-boot-cli-doesnt-work-on-git-bash-on-windows?rq=1)

그래도 같은 오류가 발생한다면 `spring` 쉘 스크립트를 아예 새로 짜버리자

```bash spring
[ -n "$JAVA_HOME" ] && JAVA_HOME=`cygpath --unix "$JAVA_HOME"`
# 아래에 다음 줄을 추가하자
# 이 구문은 스프링 홈 경로를 unix 스타일로 바꿔준다
[ -n "$SPRING_HOME" ] && SPRING_HOME=`cygpath --unix "$SPRING_HOME"`

# 94번째 줄을 다음과 같이 바꿔버리자
# if $cygwin; then
  # SPRING_HOME=`cygpath --path --mixed "$SPRING_HOME"`
  # CLASSPATH=`cygpath --path --mixed "$CLASSPATH"`
  CLASSPATH=`cygpath --unix "$CLASSPATH"`
# fi
```

세 변수를 `echo` 찍었을 때 아래와 비슷하게 나오면 된다.

```bash
# echo $JAVA_HOME;
/d/Program Files/Java/jdk-10.0.2

# echo $SPRING_HOME;
/d/spring

# echo $CLASS_PATH;
.:/d/spring/bin:/d/spring/lib/spring-boot-cli-2.1.0.BUILD-SNAPSHOT.jar
```

그리고 마지막 줄의 명령어를 `echo` 할 때는 다음과 같다.

```bash
# echo "${JAVA_HOME}/bin/java" ${JAVA_OPTS} -cp "$CLASSPATH" org.springframework.boot.loader.JarLauncher "$@"
/d/Program Files/Java/jdk-10.0.2/bin/java -cp .:/d/spring/bin:/d/spring/lib/spring-boot-cli-2.1.0.BUILD-SNAPSHOT.jar org.springframework.boot.loader.JarLauncher
```

# 확인

```bash
$ spring --version

Spring CLI v2.1.0.M1
```
