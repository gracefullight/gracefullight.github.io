---
title: pm2 앱에서 git hook시에 nginx 502 gateway timeout 오류
authors: me
tags: [nodejs, javascript, pm2, nginx]
date: 2018-01-04 10:19:13
---

# 원인

git pull을 hook으로 실행하는데 계속 nginx 502 gateway timeout 오류가 발생해 `pm2 logs 앱` 또는 `nginx log`를 계속 추적해도 별다른 에러 로그가 없었다. (`exec: Interal Server error` 라고만 적혀있었다.)

삽질 끝에 watch 속성을 사용하고 있는게 문제였다.

# 해결

```js title="ecosystem.config.js"
module.exports = {
  apps: [
    {
      name: "server",
      script: "server.js",
      env_production: {
        NODE_ENV: "production",
      },
      watch: true,
      ignore_watch: ["node_modules", ".git", "yarn.lock", "package-lock.json"],
      exec_mode: "cluster",
      instances: "max",
    },
  ],
};
```

**ignore_watch** 속성에 **.git** 폴더와 다른 폴더들이 제대로 예외처리 되었는지 확인해보자.
