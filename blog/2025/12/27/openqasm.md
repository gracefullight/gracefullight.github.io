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

```openqasm
OPENQASM 2.0;

qreg q[10]; // ∣0000000000⟩
creg c[10];

// x 게이트를 사용하여 처음 세 큐비트를 ∣1⟩ 상태로 변경
x q[0]; ∣1000000000⟩
x q[1]; ∣1100000000⟩
x q[2]; ∣1110000000⟩

measure q[0] -> c[0]; // 1
measure q[1] -> c[1]; // 1
measure q[2] -> c[2]; // 1
```

## Linear Algebra

### Vectors

- In quantum computing, **vectors** represent quantum states.
- A 2-dimensional vactor can be written as:
- $|\psi\rangle = \begin{pmatrix} \psi_0 \\ \psi_1 \end{pmatrix}$

### Computational Basis

$$ |0\rangle = \begin{pmatrix} 1 \\ 0 \end{pmatrix}, \quad |1\rangle = \begin{pmatrix} 0 \\ 1 \end{pmatrix} $$

- $|\psi\rangle$ is a linear combination of basis states as follows:
- $ |\psi\rangle = \psi_0|0\rangle + \psi_1|1\rangle = \begin{pmatrix} \psi_0 \\ \psi_1 \end{pmatrix} $

## Latex

- `\texttip{}`: Displays a tooltip when hovering over the equation.
- `\toggle{}`: Toggles between two expressions.
- `\begin{align}`: Aligns equations, where the ampersand (`&`) marks the alignment points.
- `\bbox[color, padding]{}`: Puts a bounding box with the specified color and padding around an expression.
- `\boldsymbol{}`: Renders a bold version of symbols like variables.
- `\cancel{}`: Strikes through an expression.
- `\cancelto{value}{}`: Strikes through and labels with the specified value.
- `\begin{cases}`: Creates a piecewise function with conditions.
- `\color{}`: Applies a color to text or math expressions. You can use predefined colors or hex values.
- `\enclose{}`: Encloses an expression with various effects like circles or strikes.
- `[mathcolor="color", mathbackground="color"]`: Adds custom colors to the enclosing effect.
- `\xmapsto{}`: Creates an arrow with a label for mapping.
- `\xlongequal{}`: Creates a long equals sign with a label.
- `\ce{}`: Renders chemical equations or formulas.
- `\newcommand{\ket}[1]{\left|#1\right\rangle}`: defines a custom command for ket notation. `\ket{\psi}`
- `\tag{}`: Assigns a custom tag to an equation.
- `\unicode{}`: Inserts a Unicode character using its code.
