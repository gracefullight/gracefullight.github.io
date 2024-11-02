---
title: CLA Assistant 적용
date: 2024-11-02T16:29:49.694+09:00
description: CLA Assistant
authors: me
tags:
  - me
---

## CLA

- PR을 받기 전에 약관 동의를 강제시킬 수 있다.

## CLA Assistant

- [cla-assistant.io](https://cla-assistant.io/) 을 연동해두면 **공개** 레파지토리에 대해 자동으로 CLA를 체크하고 받아주는데, private 레파지토리에 대해서는 동작하지 않는다.

## CLA Assistant Lite Action

- `.github/workflows/cla-assistant.yml` 로 아래처럼 생성하면 비공개 레파지토리에서도 파이프라인과 파일을 통해 CLA를 체크할 수 있다.
- [CLA Assistant Lite](https://github.com/contributor-assistant/github-action)

```yaml
name: "CLA Assistant"
on:
  issue_comment:
    types: [created]
  pull_request_target:
    types: [opened, closed, synchronize]

permissions:
  actions: write
  contents: write
  pull-requests: write
  statuses: write

jobs:
  CLAAssistant:
    runs-on: ubuntu-latest
    steps:
      - name: "CLA Assistant"
        id: cla_assistant
        if: (github.event.comment.body == 'recheck' || github.event.comment.body == '저는 CLA 문서를 읽었으며, CLA에 서명합니다.') || github.event_name == 'pull_request_target'
        uses: contributor-assistant/github-action@v2.6.1
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}

        with:
          custom-notsigned-prcomment: "PR 감사합니다. 이 PR을 수락하기 전에 Contributor License Agreement에 동의하셔야합니다. CLA는 아래 문장과 동일한 코멘트를 추가해주시면 서명할 수 있습니다."
          custom-pr-sign-comment: "저는 CLA 문서를 읽었으며, CLA에 서명합니다."
          custom-allsigned-prcomment: "**CLA Assistant Lite bot** 모든 Contributor가 CLA에 서명했습니다."
          path-to-signatures: ".github/signatures/cla.json"
          path-to-document: "" # e.g. a CLA or a DCO document
          branch: "chore/cla"
          allowlist: bot*
```

- path-to-signatures 는 서명한 사람들의 정보가 저장되는 파일이다.
- 파일은 protected 브랜치에 푸쉬가 되지 않아 branch에 정의한 브랜치를 주기적으로 main으로 부어줘야한다.
- issue_comment 이벤트를 통해서 custom-pr-sign-comment 를 체크하기 때문에 이벤트를 빼면 안 된다.
