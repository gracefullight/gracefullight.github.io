---
title: Gemini Cli 트러블슈팅
date: 2025-07-10T01:31:18.537+09:00
description: Troubleshooting a Gemini Cli authentication issue and a brief review of its performance.
authors: me
tags:
  - me
---

## 인증 무한 대기

> [#1437 Login with Google - Doesn't support](https://github.com/google-gemini/gemini-cli/issues/1437)

- `~/.gemini/settings.json`에 mcp 서버를 두면 `gemini` cli 실행 시 인증 무한 대기 현상이 있다.
- `mcpServers` 지워주면 정상 동작한다.

## 후기

- 태스크를 분할하여 처리하는 건 좋은데 생각보다 gemini pro 질의가 많이 느리다.
- 2507 기준 아직은 Cursor Pro가 생산성이 더 좋은 느낌
- 무료여서 쓸만하다.
