---
title: 선형대수학 용어집
date: 2024-09-08T21:20:23.920+09:00
description: Linear Algebra Terminology in Korean and English
authors: me
tags:
  - math 
---

## Linear Algebra

| KO | EN |
| --- | --- |
| 가우스 소거법 | Gauss Elimination |
| 가역 행렬 | Invertible Matrix |
| 결합 확률 | Joint Probability |
| 경험적 확률 | Empirical Probability |
| 고유값 | Eigenvalue |
| 고유값 분해 | Eigen-decomposition |
| 고유 벡터 | Eigenvector |
| 과결정계 | Overdetermined System |
| 과소결정계 | Underdetermined System |
| 균일 분포 | Uniformed Distribution |
| 그람-슈미트 과정 | Gram-Schmidt process |
| 기대값 | Expected Value |
| 기하 분포 | Geometric Distribution |
| 내적 | Dot Product |
| 누적 분포 함수 | CDF, Cumulative Distribution Function |
| 누적 확률 | Cumulative Probability |
| 다항식 | Polynomial |
| 단위 벡터 | Unit Vector |
| 단위 행렬 | Unit Matrix |
| 단체법 | Simplex Method |
| 담금질 기법 | Simulated Annealing |
| 대각선 | Diagonal |
| 대각행렬 | Diagonal Matrix |
| 대각화 | Diagonalization |
| 대칭행렬 | Symmetric Matrix |
| 도함수 | Derivative |
| 독립항등분포 | IID, Independent and Identically Distributed |
| 둘레 | Perimeter |
| 매클로린 급수 | Maclaurin Series |
| 멱영 행렬 | Nilpotent Matrix |
| 무어-팬로즈 유사역행렬 | Moore-Penrose Pseudoinverse Matrix |
| 미분가능성 | Differentiability |
| 미적분 | Calculus |
| 볼록 최적화 | Convex Optimization |
| 비직교 | Non-orthogonal |
| 빗변 | Hypotenuse |
| 사다리꼴행렬 | Echelon Form |
| 삼각법 | Trigonometry |
| 삼각행렬 | Triangular Matrix |
| 선형 독립 | Linear Independence |
| 선형 종속 | Linear Dependence |
| 사영 | Projection |
| 선형계획법 | Linear Programming |
| 수신자 조작 특성 | ROC, Receiver Operating Characteristics |
| 실수 | Real |
| 아다마르 곱 | Hadamard product |
| 아인슈타인 표기법 | Eienstein Summation Convention |
| 아핀 변환 | Affine Transformation |
| 양의 정부호 행렬 | Positive Definite Matrix |
| 양의 준정부호 행렬 | Positive Semi-definite Matrix |
| 여사건 | Complement Event |
| 연속 확률 변수 | Continuous Random Variables |
| 열 | Column |
| 영 | Nought |
| 영 공간 | Null Space |
| 외적 | Outer Product |
| 유사 변환 | Similarity Transformation |
| 음의 정부호 | Negative Definite Matrix |
| 음의 준정부호 | Negative Semi-definite Matrix |
| 이계도함수 | Second-Order Partial Derivatives |
| 이산 확률 변수 | Discrete Random Variables |
| 이차계획법 | Quadratic Programming |
| 이항 분포 | Binomial Distribution |
| 임계점 | Critical Point |
| 자동 미분 | Automatic Differentiation |
| 전치 행렬 | Transposed Matrix |
| 접선 | Tangent |
| 정규 분포 | Normal Distribution |
| 정규 직교 기저 벡터 | Orthonormal Basis Vector |
| 정규 직교 행렬 | Orthonormal Matrix |
| 정규 확률 | Normal Probability |
| 조건부 확률 | Conditional Probability |
| 종 곡선 | Bell Curve |
| 좌표계 | Coordinate Frame |
| 주대각합 | Trace of Matrix |
| 주변 확률 | Marginal Probability |
| 직각삼각형 삼각비 | Sohcahtoa |
| 직각의 | Perpendicular |
| 직교 | Orthogonal |
| 직교 행렬 | Orthogonal Matrix |
| 켤레기울기법 | Conjugate Gradient Method |
| 특성 다항식 | Characteristic Polynomial |
| 특이값 분해 | SVD, Singular Value Decomposition |
| 평균 | Mean |
| 포아송 분포 | Poisson Distribution |
| 표준 편차 | Standard Deviation |
| 프로베니우스 놈 | Frobenius norm |
| 항등 행렬 | Identity Matrix |
| 행 | Row |
| 행렬 | Matrix |
| 행렬식 | Determinant |
| 확률 밀도 함수 | PDF, Probability Density Function |
| 회전행렬 | Rotation Matrix |

## Optimization

| 제약유무 | EN | KO |
|---|---|---|
| Constrained | Active Set Method | 활성 집합 방법 |
|             | Barrier Method | 베리어 방법 |
|             | Interior Point Method | 내부 점 방법 |
|             | Lagrange Multipliers | 라그랑주 승수법 |
|             | Penalty Function Method | 페널티 함수 방법 |
|             | Sequential Quadratic Programming | 순차적 이차 프로그래밍 |
|             | Simplex Method | 심플렉스법, 단체법 |
| Unconstrained | Conjugate Gradient Method | 켤레기울기법, 공역기울기법 |
|               | Genetic Algorithm | 유전자 알고리즘 |
|               | Gradient Descent | 경사 하강법 |
|               | Nelder-Mead Method | 넬더-미드 방법 |
|               | Newton's Method | 뉴턴 방법 |
|               | Quasi-Newton Methods | 준 뉴턴 방법 (BFGS) |
|               | Simulated Annealing | 시뮬레이티드 어닐링, 담금질법 |

## Calculus

### Product Rule

$$[f(x)g(x)]'=f(x)'g(x)+f(x)g(x)'$$

### Quotient Rule

$$[\frac{f(x)}{g(x)}]' = \frac{f(x)'g(x)-f(x)g(x)'}{g(x)^2}$$

### Chain Rule

> Composition

$$\frac{dy}{dx} = \frac{dy}{du}\frac{du}{dx}$$

### Derivatives of Trigonometric Functions

| f(x) | f'(x) |
| --- | --- |
| sin(x) | cos(x) |
| cos(x) | -sin(x) |
| sec(x) | sec(x) * tan(x) |
| tan(x) | sec(x) * sec(x) |
| csc(x) | -csc(x) * cot(x) |
| cot(x) | -csc(x) * csc(x) |

## CS

| KO | EN | Description |
| --- | --- | --- |
| 불 대수 | Boolean algebra | - |
| 완전 이진 트리 | Complete Binary Tree | - |
| 유향 비순환 그래프 | DAG, Directed Acyclic Graph | - |
| 전위 순회 | Pre-order Traversal | 루트 - 왼쪽 - 오른쪽 |
| 전위 표기법 | Prefix Expression | - |
| 중위 순회 | In-order Traversal | 왼쪽 - 루트 - 오른쪽 |
| 후위 순회 | Post-order traversal | 왼쪽 - 오른쪽 - 루트 |
| 후위 표기법 | Postfix Expression | - |

### Complexity

| Algorithm | Time complexity |
| --- | --- |
| Binary Search | $O(\log{n})$ |
| Balanced Binary Search | $O(\log{n})$ |
| Bellman-Ford | $O(V*E)$ |
| Bubble Sort | $O(n^2)$ |
| Dijkstra | $O(E\log{V})$ |
| DFS Graph | $O(V + E)$ |
| Floyd-Warshall | $O(V^3)$ |
| Hash Table | $O(1)$ |
| Heap Sort | $O(n \log{n})$ |
| Quick Select | $O(n)$ |

## 예시

### 대각행렬

$$
\mathbf{A} = \begin{pmatrix}
1 & 0 & 0 \\
0 & 2 & 0 \\
0 & 0 & 3
\end{pmatrix}
$$

### 대칭행렬

> $A = A^T$

$$
\mathbf{B} = \begin{pmatrix}
1 & 2 & 3 \\
2 & 4 & 5 \\
3 & 5 & 6
\end{pmatrix}
$$

### 삼각행렬

$$
\mathbf{C} = \begin{pmatrix}
1 & 2 & 3 \\
0 & 4 & 5 \\
0 & 0 & 6
\end{pmatrix}
$$

$$
\mathbf{D} = \begin{pmatrix}
1 & 0 & 0 \\
2 & 3 & 0 \\
4 & 5 & 6
\end{pmatrix}
$$

### 직교행렬

> $A^T \cdot A = I$

$$
\mathbf{E} = \begin{pmatrix}
1 & 0 & 0 \\
0 & 0 & -1 \\
0 & 1 & 0
\end{pmatrix}
$$

### 정규직교행렬

> $A^T \cdot A = I$
> $||\mathbf{v}_i|| = 1$
> $\mathbf{v}_i \cdot \mathbf{v}_j = 0 \quad (i \neq j)$

$$
\mathbf{F_1} = \begin{pmatrix}
1 & 0 & 0 \\
0 & 1 & 0 \\
0 & 0 & 1
\end{pmatrix}
$$

$$
\mathbf{F_2} = \begin{pmatrix}
\frac{1}{\sqrt{2}} & \frac{1}{\sqrt{2}} & 0 \\
-\frac{1}{\sqrt{2}} & \frac{1}{\sqrt{2}} & 0 \\
0 & 0 & 1
\end{pmatrix}
$$

$$
||\mathbf{v}_1|| = \sqrt{\left( \frac{1}{\sqrt{2}} \right)^2 + \left( -\frac{1}{\sqrt{2}} \right)^2 + 0^2} = \sqrt{\frac{1}{2} + \frac{1}{2}} = \sqrt{1} = 1
$$

$$
||\mathbf{v}_2|| = \sqrt{\left( \frac{1}{\sqrt{2}} \right)^2 + \left( \frac{1}{\sqrt{2}} \right)^2 + 0^2} = \sqrt{\frac{1}{2} + \frac{1}{2}} = \sqrt{1} = 1
$$

$$
||\mathbf{v}_3|| = \sqrt{0^2 + 0^2 + 1^2} = \sqrt{1} = 1
$$

$$
\mathbf{v}_1 \cdot \mathbf{v}_2 = \left( \frac{1}{\sqrt{2}} \right) \left( \frac{1}{\sqrt{2}} \right) + \left( -\frac{1}{\sqrt{2}} \right) \left( \frac{1}{\sqrt{2}} \right) + 0 \cdot 0 = \frac{1}{2} - \frac{1}{2} + 0 = 0
$$

$$
\mathbf{v}_1 \cdot \mathbf{v}_3 = \left( \frac{1}{\sqrt{2}} \right) \cdot 0 + \left( -\frac{1}{\sqrt{2}} \right) \cdot 0 + 0 \cdot 1 = 0
$$

$$
\mathbf{v}_2 \cdot \mathbf{v}_3 = \left( \frac{1}{\sqrt{2}} \right) \cdot 0 + \left( \frac{1}{\sqrt{2}} \cdot 0 \right) + 0 \cdot 1 = 0
$$

### 멱영행렬

> $A^k = 0 \quad (K > 0)$

$$
\mathbf{G} = \begin{pmatrix}
0 & 1 & 0 \\
0 & 0 & 1 \\
0 & 0 & 0
\end{pmatrix}
$$

### 기대값

> 이산 확률

$$
E(X) = \sum_{i=1}^{n} x_i P(X = x_i)
$$

> 연속 확률

$$
E(X) = \int_{-\infty}^{\infty} x f(x) \, dx
$$

f(x)는 확률밀도함수 PDF

### 분산

$$
\text{Var}(X) = E\left[(X - E(X))^2\right] = E(X^2) - (E(X))^2
$$

### 표준편차

$$
\sigma = \sqrt{\text{Var}(X)}
$$

### 테일러 급수

$$
f(x) = f(a) + f'(a)(x - a) + \frac{f''(a)}{2!}(x - a)^2 + \frac{f'''(a)}{3!}(x - a)^3 + \ldots = \sum_{n=0}^{\infty} \frac{f^{(n)}(a)}{n!}(x - a)^n
$$

### 맥클로린 급수

> 테일러급수 + $a = 0$

$$
f(x) = f(0) + f'(0)x + \frac{f''(0)}{2!}x^2 + \frac{f'''(0)}{3!}x^3 + \ldots = \sum_{n=0}^{\infty} \frac{f^{(n)}(0)}{n!}x^n
$$

$$
e^x = 1 + x + \frac{x^2}{2!} + \frac{x^3}{3!} + \ldots = \sum_{n=0}^{\infty} \frac{x^n}{n!}
$$

$$
\sin x = x - \frac{x^3}{3!} + \frac{x^5}{5!} - \frac{x^7}{7!} + \ldots = \sum_{n=0}^{\infty} \frac{(-1)^n}{(2n + 1)!} x^{2n + 1}
$$

$$
\cos x = 1 - \frac{x^2}{2!} + \frac{x^4}{4!} - \frac{x^6}{6!} + \ldots = \sum_{n=0}^{\infty} \frac{(-1)^n}{(2n)!} x^{2n}
$$

### 이항 분포

$$
E(X) = n \cdot p
$$

$$
\text{Var}(X) = n \cdot p \cdot (1 - p)
$$

$$
\sigma = \sqrt{n \cdot p \cdot (1 - p)}
$$

### 정규 분포

$$
E(X) = \mu
$$

$$
\text{Var}(X) = \sigma^2
$$

$$
\sigma = \sqrt{\text{Var}(X)} = \sigma
$$

### 균등 분포

$$
E(X) = \frac{a + b}{2}
$$

$$
\text{Var}(X) = \frac{(b - a)^2}{12}
$$

$$
\sigma = \sqrt{\text{Var}(X)} = \frac{b - a}{\sqrt{12}}
$$

### 포아송 분포

$$
E(X) = \lambda
$$

$$
\text{Var}(X) = \lambda
$$

$$
\sigma = \sqrt{\lambda}
$$

### 기하 분포

$$
E(X) = \frac{1}{p}
$$

$$
\text{Var}(X) = \frac{1 - p}{p^2}
$$

$$
\sigma = \sqrt{\text{Var}(X)} = \frac{\sqrt{1 - p}}{p}
$$

## 참조

- [Wikipedia: Mnemonics in trigonometry](https://en.wikipedia.org/wiki/Mnemonics_in_trigonometry)
