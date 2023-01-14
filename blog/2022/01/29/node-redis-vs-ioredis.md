---
title: node-redis vs ioredis
authors: me
tags: [nodejs, redis]
date: 2022-01-29 22:16:22
---

# node-redis vs ioredis

- 보통 IOredis 가 퍼포먼스면에서 더 빠르다고 알고 있는데, node-redis가 4버전으로 올라오면서 바뀌었는지 궁금했다.
- 먼저 IOredis 의 [벤치마크 문서](https://github.com/luin/ioredis#benchmarks) 에는 node-redis 와의 비교는 없고 `enableAutoPipelining` 옵션을 켜라는 말만 나온다.
- 다른 참고할만한 자료는 [Ably: Migrating from Node Redis to Ioredis: a slightly bumpy but faster road](https://ably.com/blog/migrating-from-node-redis-to-ioredis) 인데 몇 버전의 라이브러리로 비교를 했는지는 나오지 않는다.
- 최신 node-redis 라이브러리와 비교를 해야했다.

## node-redis

- 버전 4에서 호환되지 않는 메소드가 많은데 Breaking Changes 나 [v3 to v4 마이그레이션 가이드](https://github.com/redis/node-redis/blob/master/docs/v3-to-v4.md)에 추가가 되어있지 않다. 😡
- 열려있는 이슈는 다음과 같다.
  - [#1765](https://github.com/redis/node-redis/issues/1765): `hgetall, hget, hset, hmset, setex`
  - [#1796](https://github.com/redis/node-redis/issues/1796): `batch`
- 레디스 사의 레파지토리가 맞는지 의문이 든다.

## 벤치마크

- [redis/node-redis/benchmark](https://github.com/redis/node-redis/tree/master/benchmark) 벤치마크 폴더가 있는데 결과가 정리된 문서를 못 찾았다.
- [poppinlp/node_redis-vs-ioredis](https://github.com/poppinlp/node_redis-vs-ioredis) 레파지토리가 있었지만 node-redis 버전이 아쉽게 [3.0.2](https://github.com/poppinlp/node_redis-vs-ioredis/blob/master/package.json#L26)였다.
- 직접 수정해서 돌려봐야했다.

### 테스트

```yml title="docker-compose.yml"
version: "3.9"
services:
  redis:
    image: "redis:6.2-alpine"
    ports:
      - "6379:6379"
```

띄워놓고 진행했다. IOredis 의 `options.dropBufferSupport` 옵션을 켜면 [퍼포먼스가 향상된다라고 나와있어서](https://github.com/luin/ioredis/blob/master/API.md#new-redisport-host-options) 두 경우를 모두 테스트했다.

#### dropBufferSuppport: true

> ioredis

- node-redis (avg): 9586.215
- ioredis (avg): 9488.689

| Operation | node-redis(ms) | node-redis with multi(ms) | node-redis with pipeline(ms) |
| --------- | -------------- | ------------------------- | ---------------------------- |
| set       | 26525.039      | 170.461                   | 112.881                      |
| get       | 26334.277      | 252.904                   | 183.610                      |
| hset      | 26461.201      | 224.977                   | 133.728                      |
| hgetall   | 31394.670      | 389.773                   | 306.851                      |
| incr      | 28580.127      | 206.482                   | 116.846                      |
| keys      | 29647.691      | 772.989                   | 737.362                      |

| Operation | ioredis(ms) | ioredis with multi(ms) | ioredis with pipeline(ms) |
| --------- | ----------- | ---------------------- | ------------------------- |
| set       | 25684.449   | 260.598                | 173.958                   |
| get       | 25720.408   | 290.935                | 226.623                   |
| hmset     | 25857.690   | 338.286                | 200.380                   |
| hgetall   | 31666.897   | 480.690                | 380.761                   |
| incr      | 28392.304   | 257.203                | 150.187                   |
| keys      | 29061.574   | 915.112                | 738.331                   |

#### dropBufferSuppport: false

> node-redis

- node-redis (avg): 9764.244
- ioredis (avg): 9993.67

| Operation | node-redis(ms) | node-redis with multi(ms) | node-redis with pipeline(ms) |
| --------- | -------------- | ------------------------- | ---------------------------- |
| set       | 29100.469      | 176.660                   | 126.425                      |
| get       | 28317.308      | 321.528                   | 189.664                      |
| hset      | 28963.134      | 194.640                   | 139.163                      |
| hgetall   | 29219.324      | 406.834                   | 357.909                      |
| incr      | 29009.774      | 211.714                   | 133.763                      |
| keys      | 27309.474      | 847.218                   | 731.385                      |

| Operation | ioredis(ms) | ioredis with multi(ms) | ioredis with pipeline(ms) |
| --------- | ----------- | ---------------------- | ------------------------- |
| set       | 27995.198   | 265.654                | 160.538                   |
| get       | 30821.817   | 335.706                | 245.901                   |
| hmset     | 28127.822   | 288.023                | 216.563                   |
| hgetall   | 28732.957   | 406.565                | 372.790                   |
| incr      | 30576.902   | 277.081                | 133.760                   |
| keys      | 29278.756   | 863.351                | 786.658                   |

## 결론

- IOredis 를 쓰려면 `dropBufferSupport: true` 를 권장
- 두 라이브러리의 퍼포먼스 차이는 미미하다.
- node-redis 는 공식 라이브러리이지만 아직 문서가 완벽하지 않다.
- redis 에서 제공하는 RedisJson, RediSearch 의 확장성을 위해 node-redis 를 선택할 것 같다.
- 영속성을 위한 aof, rdb 설정은 둘 다 사용하라 [문서](https://redis.io/topics/persistence#ok-so-what-should-i-use)에 나와있다.
- [Redis/redis-om-node](https://github.com/redis/redis-om-node) 와 [RedisJson](https://oss.redis.com/redisjson/), [RediSearch](https://oss.redis.com/redisearch/) 를 다 사용한다면 BFF 모델을 쉽게 만들 수 있을 것 같다. 레퍼런스는 아직 없는듯...
- [RedisJSON/RedisJson/Dockerfile](https://github.com/RedisJSON/RedisJSON/blob/master/Dockerfile) 에 두 모듈이 모두 설치되어있다.
