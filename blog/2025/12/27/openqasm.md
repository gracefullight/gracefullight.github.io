---
title: OpenQASM
date: 2025-12-27T17:46:08.652+11:00
description: openqasm programming language
authors: me
tags:
  - quantum
---

## OpenQASM 2.0

```openqasm
OPENQASM 2.0; // 언어 버전 선언

qreg q[1]; // 큐비트 레지스터 q를 선언 (큐비트 1개, 초기 상태 |0⟩)
creg c[1]; // 고전 비트 레지스터 c를 선언 (측정 결과 저장용)

h q[0]; // Hadamard 게이트 적용: |0⟩ → (|0⟩ + |1⟩) / √2

measure q[0] -> c[0]; // q[0]을 측정하고 결과(0 또는 1)를 c[0]에 저장
```
