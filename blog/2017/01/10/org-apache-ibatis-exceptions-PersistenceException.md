---
title: org.apache.ibatis.exceptions.PersistenceException
authors: me
tags:
  - java
  - mybatis
date: 2017-01-10 22:21:04
---

## 원인

서버 Mysql이 예전 커넥션을 그대로 가지고 있어서 발생한다.

## 해결

Mybatis Config에 아래처럼 커넥션과 관련된 옵션을 추가한다.

```xml
<!-- @author http://linuxism.tistory.com/580 -->
<environments default="default">
    <environment id="default">
        <transactionManager type="JDBC"/>
        <dataSource type="POOLED">
            <property name="driver" value="${jdbc.driverClassName}"/>
            <property name="url" value="${jdbc.url}"/>
            <property name="username" value="${jdbc.username}"/>
            <property name="password" value="${jdbc.password}"/>

            <!-- 동시 커넥션 수 -->
            <property name="poolMaximumActiveConnections" value="20"/>
            <!-- 유휴상태의 커넥션 수 -->
            <property name="poolMaximumIdleConnections" value="20"/>
            <!-- 커넥션 요청 후 획득까지 기다리는 시간 -->
            <property name="poolMaximumCheckoutTime" value="20000"/>
            <!-- 커넥션 ping 테스트 -->
            <property name="poolPingEnabled" value="true"/>
            <!-- 커넥션 확인 쿼리 -->
            <property name="poolPingQuery" value="select 1"/>
            <!-- 커넥션이 얼마동안 사용하지 않으면 닫히는지 시간 설정 -->
            <property name="poolPingConnectionsNotUsedFor" value="43200"/>
            <!-- 사용불가능한 커넥션을 기다리는 시간 설정 -->
            <property name="poolTimeToWait" value="30000"/>
            <!-- 인코딩 -->
            <property name="driver.encoding" value="UTF-8"/>
        </dataSource>
    </environment>
</environments>
```
