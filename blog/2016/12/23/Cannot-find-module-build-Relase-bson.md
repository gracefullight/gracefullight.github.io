---
title: Cannot find module '../build/Release/bson'
authors: me
tags: [javascript, nodejs, mongoose]
date: 2016-12-23 15:19:05
---

mongoose-post-find 모듈 사용시 bson 라이브러리를 찾지 못해 설치가 안되는 경우가 있다.

## 오류

```log
{ Error: Cannot find module '../build/Release/bson'
    at Function.Module._resolveFilename (module.js:440:15)
    at Function.Module._load (module.js:388:25)
    at Module.require (module.js:468:17)
    at require (internal/module.js:20:19)
    // 여기서 오류가 발생한다
    at Object.<anonymous> (your project\mongoose-post-find\node_modules\bson\ext\index.js:15:10)
    at Module._compile (module.js:541:32)
    at Object.Module._extensions..js (module.js:550:10)
    at Module.load (module.js:458:32)
    at tryModuleLoad (module.js:417:12)
    at Function.Module._load (module.js:409:3)
    at Module.require (module.js:468:17)
    at require (internal/module.js:20:19)
    at Object.<anonymous> (your project\mongoose-post-find\node_modules\bson\lib\bson\index.js:3:24)
    at Module._compile (module.js:541:32)
    at Object.Module._extensions..js (module.js:550:10)
    at Module.load (module.js:458:32) code: 'MODULE_NOT_FOUND' }
js-bson: Failed to load c++ bson extension, using pure JS version
```

## 해결

해당 패키지 경로의 15번째 줄을 따라가보면 bson 패키지의 경로를 지정해주는 부분이 있는데,
이 부분을 같은 패키지 내의 bson 경로로 일치시켜주면 된다.

```javascript title="bson/index.js"
let bson = null;

try {
  // Load the precompiled win32 binary
  if (process.platform == "win32" && process.arch == "x64") {
    bson = require("./win32/x64/bson");
  } else if (process.platform == "win32" && process.arch == "ia32") {
    bson = require("./win32/ia32/bson");
  } else {
    bson = require("../build/Release/bson");
  }
} catch (err) {
  // Attempt to load the release bson version
  try {
    // 여기의 상대경로를 같은 패키지의 bson의 경로로 일치시켜주면 된다.
    bson = require("../browser_build/bson");
  } catch (err) {
    console.dir(err);
    console.error(
      "js-bson: Failed to load c++ bson extension, using pure JS version",
    );
    bson = require("../lib/bson/bson");
  }
}
```
