---
title: rollup-plugin-postcss 의 path alias 문제
authors: me
tags: [javascript, rollup]
date: 2021-09-11 22:31:22
---

# rollup-plugin-postcss

- [현재(210911) 메인테이너를 구하는 프로젝트](https://github.com/egoist/rollup-plugin-postcss/issues/217)이므로 이슈가 수정되지 않는다.

## scss alias

```scss
// ~는 노드 모듈 처리된다.
@import "~@material";

// @styles 로 사용하고 싶을 경우가 있다.
@import "@styles/mystyle";
```

- 두 번째의 경우는 scss 시트를 처리해주면서 `(plugin postcss) Error: Can't find stylesheet to import.` 와 같은 에러를 뱉는다.
- 웹팩의 경우 `resolve.alias` 가 알아서 처리를 해주지만, rollup-plugin-postcss 의 sass-loader 에서 importer 를 추가해줘야할 것 같았다.

## sass-loader

- 이 플러그인의 sass-loader 는 [dart-sass 의 importer 를 확장](https://github.com/egoist/rollup-plugin-postcss/blob/master/src/sass-loader.js#L79)해서 쉽게 추가가 가능해보였다.
- 그러나 아무리 확장처리를 해도 importer 에서 해당 경로가 리졸브 되지 않았고 [관련 이슈](https://github.com/egoist/rollup-plugin-postcss/issues?q=importer)가 3개, PR이 2개 등록된 것을 확인할 수 있다.
- 이 걸 해결하려면 postcss.use.sass 사용시에 importer 를 override 해주는 custom sass-loader 를 직접 만들어야한다.

## custom-sass-loader

- https://github.com/egoist/rollup-plugin-postcss/blob/master/src/sass-loader.js
- `pity` 는 promisify 로 대체 가능하여 지웠고 `import-cwd` 도 node 코어를 사용하게 변경했다.
- `p-queue` 도 child_process 로 대체 가능해보인다.

```ts
import { createRequire } from "module";
import path from "path";
import { promisify } from "util";

import resolve from "resolve";
import PQueue from "p-queue";

function loadModule(moduleId) {
  try {
    return require(moduleId);
  } catch {
    // Ignore error
  }

  try {
    return createRequire(path.resolve(process.cwd(), "noop.js"))(moduleId);
  } catch {
    // Ignore error
  }
}

// This queue makes sure node-sass leaves one thread available for executing fs tasks
// See: https://github.com/sass/node-sass/issues/857
const threadPoolSize = process.env.UV_THREADPOOL_SIZE || 4;
const workQueue = new PQueue({ concurrency: threadPoolSize - 1 });

const moduleRe = /^~([a-z\d]|@).+/i;

const getUrlOfPartial = (url) => {
  const parsedUrl = path.parse(url);
  return `${parsedUrl.dir}${path.sep}_${parsedUrl.base}`;
};

const resolvePromise = promisify(resolve);

// List of supported SASS modules in the order of preference
const sassModuleIds = ["node-sass", "sass"];

export default {
  name: "sass",
  test: /\.(sass|scss)$/,
  process({ code }) {
    return new Promise((resolve, reject) => {
      const sass = loadSassOrThrow();
      const render = promisify(sass.render.bind(sass));
      const data = this.options.data || "";
      workQueue.add(() =>
        render({
          ...this.options,
          file: this.id,
          data: data + code,
          indentedSyntax: /\.sass$/.test(this.id),
          sourceMap: this.sourceMap,
          importer: [
            (url, importer, done) => {
              if (!moduleRe.test(url)) {
                // 이부분에 alias importer 가 추가되어야한다.
                if (/^@styles/.test(url)) {
                  return done({
                    file: url.replace(
                      /^@styles/,
                      path.resolve(__dirname, "./src/styles")
                    ),
                  });
                }
                return done({ file: url });
              }
              const moduleUrl = url.slice(1);
              const partialUrl = getUrlOfPartial(moduleUrl);

              const options = {
                basedir: path.dirname(importer),
                extensions: [".scss", ".sass", ".css"],
              };
              const finishImport = (id) => {
                done({
                  // Do not add `.css` extension in order to inline the file
                  file: id.endsWith(".css") ? id.replace(/\.css$/, "") : id,
                });
              };

              const next = () => {
                // Catch all resolving errors, return the original file and pass responsibility back to other custom importers
                done({ file: url });
              };

              // Give precedence to importing a partial
              resolvePromise(partialUrl, options)
                .then(finishImport)
                .catch((error) => {
                  if (
                    error.code === "MODULE_NOT_FOUND" ||
                    error.code === "ENOENT"
                  ) {
                    resolvePromise(moduleUrl, options)
                      .then(finishImport)
                      .catch(next);
                  } else {
                    next();
                  }
                });
            },
          ].concat(this.options.importer || []),
        })
          .then((result) => {
            for (const file of result.stats.includedFiles) {
              this.dependencies.add(file);
            }

            resolve({
              code: result.css.toString(),
              map: result.map && result.map.toString(),
            });
          })
          .catch(reject)
      );
    });
  },
};

// 이하 생략...
```

## rollup.config.js

위의 커스터마이징된 sass-loader 를 `use: ['sass']` 대신 등록해준다.

```js
postcss({
  // 추가
  loaders: [customSassLoader],
  // 제거
  // use: ['sass']
});
```

# 결론

- `rollup-plugin-postcss` 는 이슈가 있어 확장을 직접해야하고 이는 유지보수 포인트로 다가올 수 있다.
- `postcss-import` 는 alias 기능이 없어 사용이 불가능하다.
- `postcss-import-alias` 등등의 alias 를 추가한 라이브러리도 불가능한데, 이는 [postcssLoader 가 먼저 등록](https://github.com/egoist/rollup-plugin-postcss/blob/master/src/loaders.js#L36) 되는데 의외의 결과이다. `rollup-plugin-postcss` 를 직접 로컬에서 빌드해서 해당 지점을 확인해볼 수 있겠지만 PR 을 받지 않으므로 의미도 없다.
- [rollup-plugin-scss](https://github.com/thgh/rollup-plugin-scss)를 사용하고 postcss 를 processor 로 줘서 반대로 처리할 수 있어보이는데, 빌드 파이프라인을 다 리팩토링을 해야하므로 나중에 도전해보는걸로 하자.
