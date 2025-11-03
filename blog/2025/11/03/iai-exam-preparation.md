---
title: IAI Exam Preparation
date: 2025-11-03T10:47:59.135+11:00
description: IAI Exam Preparation
authors: me
draft: true
tags:
  - iai
---

## 규칙

### 기본 등가 규칙 (Equivalence Rules)

- 이 규칙들은 문장의 형태를 의미는 동일하게 유지하면서 변환할 때 사용됩니다.
- 특히 CNF(Conjunctive Normal Form, 논리곱 표준형)로 변환하는 데 필수적입니다.

#### Implication Elimination (함의 제거)

$$A \implies B \equiv \neg A \lor B$$

- "A이면 B이다"라는 말은 "A가 아니거나, (A가 맞다면) B이다"라는 말과 논리적으로 동일합니다.
- 이는 Resolution(분해)의 기본이 되는 CNF 변환의 핵심 규칙입니다.

#### Biconditional Elimination (쌍방 조건 제거)

$$A \iff B \equiv (A \implies B) \land (B \implies A)$$

- "A와 B는 논리적으로 동치이다"라는 말은 "A이면 B이고, B이면 A이다"라는 말과 같습니다.
- 위의 `Implication Elimination`과 결합하면 $A \iff B \equiv (\neg A \lor B) \land (\neg B \lor A)$ 로 변환할 수 있습니다.

#### Double Negation Elimination (이중 부정 제거)

$$\neg \neg A \equiv A$$

- "A가 아닌 것이 아니다"는 "A이다"와 같습니다.

#### De Morgan's Law (드 모르간의 법칙)

$$\neg (A \land B) \equiv (\neg A \lor \neg B) \quad \neg (A \lor B) \equiv (\neg A \land \neg B)$$

- 부정 기호($\neg$)를 괄호 안으로 분배할 때, $\land$ 는 $\lor$ 로, $\lor$ 는 $\land$ 로 바뀝니다.

#### Commutativity (교환 법칙)

$$(A \land B) \equiv (B \land A) \quad (A \lor B) \equiv (B \lor A)$$

- $\land$ (And)와 $\lor$ (Or) 연산은 순서가 바뀌어도 결과가 같습니다.

### 추론 규칙 (Inference Rules)

- 이 규칙들은 기존의 참인 문장들로부터 새로운 참인 문장을 유도할 때 사용됩니다.

#### Modus Ponens (긍정 논법)

$$\frac{A \implies B, \quad A}{B}$$

- "A이면 B이다" ($A \implies B$)라는 규칙이 참이고, "A이다" ($A$)라는 사실이 참이라면, "B이다" ($B$)라는 새로운 사실을 추론할 수 있습니다.

#### And-Elimination (논리곱 제거)

$$\frac{A \land B}{A} \quad \frac{A \land B}{B}$$

- "A 그리고 B이다" ($A \land B$)가 참이라면, "A이다"와 "B이다"는 각각 참입니다.

### 분해 규칙 (Resolution Rules)

- Resolution(분해)은 CNF로 변환된 문장들을 사용하여 모순을 찾아내는 강력한 단일 추론 규칙입니다.

#### Unit Resolution (단위 분해)

$$\frac{A \lor B, \quad \neg B}{A}$$

- "A 또는 B이다" ($A \lor B$)가 참인데, "B가 아니다" ($\neg B$)가 참이라면, 반드시 "A이다" ($A$)가 참이어야 합니다.
- (참고: 이는 Modus Ponens와 $\neg B \implies A$ 형태에서 사실상 동일합니다.)

#### Full Resolution (완전 분해)

$$\frac{A \lor B, \quad \neg B \lor C}{A \lor C}$$

- "A 또는 B이다"가 참이고, "B가 아니거나 C이다"가 참이라고 가정해 봅시다.
- 만약 B가 참(True)이라면, 두 번째 절($\neg B \lor C$)에서 $\neg B$는 거짓(False)이 되므로, $C$가 반드시 참이어야 합니다.
- 만약 B가 거짓(False)이라면, 첫 번째 절($A \lor B$)에서 $B$는 거짓(False)이므로, $A$가 반드시 참이어야 합니다.
- 따라서 어떤 경우든 "A 또는 C이다" ($A \lor C$)가 항상 참이 됩니다.
- $B$와 $\neg B$라는 상보적인 리터럴(literal)이 '분해'되어 사라집니다.

## Wumpus World 기본 정의

- Wumpus World는 $4 \times 4$ 격자 환경에서 진행되며, 다음과 같은 요소들로 구성됩니다.
- Agent (A): $1,1$ 에서 시작합니다.
- Wumpus (W): Wumpus가 있는 방 또는 그와 인접한(상하좌우) 방에는 **Stench (S, 악취)**가 납니다.
- Pit (P): Pit이 있는 방과 인접한 방에는 **Breeze (B, 바람)**가 찹니다.
- Gold (G): Gold가 있는 방에는 **Glitter (Gl, 반짝임)**가 있습니다.

### 논리 기호 정의 (Propositional Symbols)

각 방 $[x, y]$ ($x, y$는 1에서 4까지)의 상태를 나타내기 위해 다음과 같은 명제 기호를 사용합니다.

- $P_{x,y}$: 방 $[x,y]$ 에 Pit이 있다.
- $W_{x,y}$: 방 $[x,y]$ 에 Wumpus가 있다.
- $G_{x,y}$: 방 $[x,y]$ 에 Gold가 있다.
- $S_{x,y}$: 방 $[x,y]$ 에서 Stench(악취)가 난다. (Percept)
- $B_{x,y}$: 방 $[x,y]$ 에서 Breeze(바람)가 분다. (Percept)
- $Gl_{x,y}$: 방 $[x,y]$ 에서 Glitter(반짝임)가 있다. (Percept)
- $OK_{x,y}$: 방 $[x,y]$ 는 안전하다. ($OK_{x,y} \equiv \neg P_{x,y} \land \neg W_{x,y}$)

### Wumpus World의 논리 규칙 (Rules)

- 이 세계를 지배하는 '물리 법칙'입니다. 이 규칙들은 에이전트의 **Knowledge Base (KB)**에 기본적으로 포함됩니다.
- Pit과 Breeze의 관계: (Biconditional, $\iff$)
- "방 $x,y$에 바람이 분다 (iff) 그 방과 인접한(상하좌우) 방들 중 적어도 하나에 구덩이가 있다."
  - 예: $B_{1,1} \iff (P_{1,2} \lor P_{2,1})$
  - 예: $B_{2,1} \iff (P_{1,1} \lor P_{2,2} \lor P_{3,1})$

### Wumpus와 Stench의 관계: (Biconditional, $\iff$)

- "방 $x,y$에 악취가 난다 (iff) 그 방과 인접한 방들 중 적어도 하나에 Wumpus가 있다."
  - 예: $S_{1,1} \iff (W_{1,2} \lor W_{2,1})$
  - 예: $S_{2,1} \iff (W_{1,1} \lor W_{2,2} \lor W_{3,1})$

### Gold와 Glitter의 관계: (Biconditional, $\iff$)

- "방 $[x,y]$ 가 반짝인다 (iff) 그 방에 Gold가 있다."
  - 예: $Gl_{x,y} \iff G_{x,y}$
- 시작 지점:
  - 에이전트는 $1,1$에서 시작하며, 이 방은 안전함이 보장됩니다.
  - $OK_{1,1} \equiv \neg P_{1,1} \land \neg W_{1,1}$

## Task 1: Wumpus World 이해하기

- Wumpus World를 PEAS 프레임워크로 분석하고, 방 주소와 Percept를 이해해 보겠습니다.

### PEAS 분석

- P (Performance Measure): 성능 측정
  - 금 획득: $+1000$ 점
  - 죽음 (Pit 또는 Wumpus): $-1000$ 점
  - 행동 소모: $-1$ 점 (이동), $-10$ 점 (화살)
- E (Environment): 환경
  - $4 \times 4$ 격자
  - 정적 (Static): Wumpus, Pit, Gold는 움직이지 않습니다.
  - 부분 관찰 가능 (Partially Observable): 에이전트는 현재 방의 percept만 알 수 있으며, 인접 방의 상태는 추론해야 합니다.
- A (Actuators): 행동
  - `Forward, TurnLeft, TurnRight, Grab, Shoot`
- S (Sensors): 감각
  - `[Stench, Breeze, Glitter, Bump, Scream]` 5-요소 벡터

### 방 주소 (Location)

- $[x, y]$ 좌표로 표현합니다. $[1,1]$ 은 좌측 하단입니다.

### Percept (감각)

`[Stench, Breeze, Glitter, Bump, Scream]`

- Stench (악취), Breeze (바람), Glitter (반짝임)는 해당 방에서의 감각입니다.
- Bump (부딪힘), Scream (비명)은 행동의 결과로 발생합니다.

### Percept의 논리 문장 표현

- 제시된 Percept: [Stench, Breeze, Glitter, None, None]
- 이는 에이전트가 특정 방 $x,y$에 있을 때 다음을 감지했다는 의미입니다.
- Stench = True
- Breeze = True
- Glitter = True
- Bump = False
- Scream = False
- 이를 논리 문장으로 표현하면, 에이전트가 현재 방 $x,y$에 대해 다음과 같은 사실을 알게 되었다는 뜻입니다.

$$S_{x,y} \land B_{x,y} \land Gl_{x,y} \land \neg \text{Bump}_{x,y} \land \neg \text{Scream}_{x,y}$$

- $S_{x,y}$ (악취)가 나므로, 인접한 방 어딘가에 Wumpus가 있습니다.
- $B_{x,y}$ (바람)이 불므로, 인접한 방 어딘가에 Pit이 있습니다.
- $Gl_{x,y}$ (반짝임)이 있으므로, 바로 이 방 $x,y$에 Gold가 있습니다. (즉, $G_{x,y}$가 True입니다.)

### KB 구축 및 추론 문제 공식화

- 상황 (a): 에이전트가 $1,1$에 있습니다.
  - Percept: [None, None, None, None, None]
  - 즉, $\neg S_{1,1}$ (악취 없음) 그리고 $\neg B_{1,1}$ (바람 없음)을 알게 되었습니다.
- 추론 (a): 이 percept을 기반으로 추론합니다.
  - $\neg S_{1,1}$ 와 규칙 $S_{1,1} \iff (W_{1,2} \lor W_{2,1})$ 로부터, $\neg (W_{1,2} \lor W_{2,1})$ 을 추론합니다.
  - De Morgan의 법칙에 의해, $\neg W_{1,2} \land \neg W_{2,1}$ (방 $1,2$와 $2,1$에 Wumpus가 없음)을 압니다.
  - $\neg B_{1,1}$ 와 규칙 $B_{1,1} \iff (P_{1,2} \lor P_{2,1})$ 로부터, $\neg (P_{1,2} \lor P_{2,1})$ 을 추론합니다.
  - De Morgan의 법칙에 의해, $\neg P_{1,2} \land \neg P_{2,1}$ (방 $1,2$와 $2,1$에 Pit이 없음)을 압니다.
- 안전함 확인:
  - $OK_{1,2} \equiv \neg P_{1,2} \land \neg W_{1,2}$ (True)
  - $OK_{2,1} \equiv \neg P_{2,1} \land \neg W_{2,1}$ (True)
  - 따라서 $1,2$와 $2,1$은 모두 안전함을 100% 확신할 수 있습니다.
- 상황 (b): 에이전트가 안전한 $2,1$로 이동했습니다.
  - $2,1$에서 'B' (Breeze)를 감지했음을 보여줍니다.
  - Percept: $\neg S_{2,1} \land B_{2,1}$

### $2,1$에서의 Knowledge Base (KB) 구축

- KB는 에이전트가 "지금까지" 알고 있는 모든 사실(Facts/Observations)과 규칙(Rules)의 집합입니다.
- Rules (관련 규칙만):
  - $R_1: B_{1,1} \iff (P_{1,2} \lor P_{2,1})$
  - $R_2: S_{1,1} \iff (W_{1,2} \lor W_{2,1})$
  - $R_3: B_{2,1} \iff (P_{1,1} \lor P_{2,2} \lor P_{3,1})$
  - $R_4: S_{2,1} \iff (W_{1,1} \lor W_{2,2} \lor W_{3,1})$
- Facts (관찰 및 시작 조건):
  - $O_1: \neg P_{1,1}$ (시작 지점은 안전)
  - $O_2: \neg W_{1,1}$ (시작 지점은 안전)
  - $O_3: \neg S_{1,1}$ ($1,1$에서의 percept)
  - $O_4: \neg B_{1,1}$ ($1,1$에서의 percept)
  - $O_5: \neg S_{2,1}$ ($2,1$에서의 percept)
  - $O_6: B_{2,1}$ ($2,1$에서의 percept)
  - $O_6: B_{2,1}$ ($2,1$에서의 percept)
- 따라서 $KB = \{ R_1, R_2, R_3, R_4, O_1, O_2, O_3, O_4, O_5, O_6 \}$ 입니다.

### $\neg P_{1,2}$ 가 참임을 추론하는 문제 공식화

- 논리적 추론(Inference) 문제는 "KB가 $\alpha$를 수반(entail)하는가?"를 묻는 것입니다.
- Knowledge Base: $KB$ (Task 3.1에서 구축한 것)
- Query (질의): $\alpha$ (증명하고자 하는 문장)
- 여기서 우리가 증명하고자 하는 문장 $\alpha$는 "방 $1,2$에는 Pit이 없다" 즉, $\neg P_{1,2}$ 입니다.
- 추론 문제는 다음과 같이 공식화할 수 있습니다: $KB \models \neg P_{1,2}$ ?
- (읽는 법: "KB가 $\neg P_{1,2}$ 를 수반(entail)하는가?" 또는 "KB가 참인 모든 세상(model)에서 $\neg P_{1,2}$ 도 항상 참인가?")

### 추론 문제 해결 ($KB \models \neg P_{1,2}$ 증명)

- 우리는 $KB \models \neg P_{1,2}$ 임을 증명해야 합니다.
- 이 증명에는 $1,1$에서의 관찰만으로 충분합니다.
- 증명에 필요한 최소한의 $KB$ 부분($KB'$)은 다음과 같습니다.
- $O_4: \neg B_{1,1}$ ($1,1$에서 바람이 불지 않았다)
- $R_1: B_{1,1} \iff (P_{1,2} \lor P_{2,1})$ (규칙)

### Model Checking 방법

- Model Checking은 가능한 모든 '모델(세상)'을 나열하고, $KB$가 참인 모델들에서 $\alpha$($\neg P_{1,2}$)도 참인지 확인하는 방법입니다.
- 관련 변수 식별: $B_{1,1}, P_{1,2}, P_{2,1}$ (총 $2^3 = 8$개의 모델이 가능)
- 모델 분석:
  - 우리의 $KB'$ 는 $( \neg B_{1,1} ) \land ( B_{1,1} \iff (P_{1,2} \lor P_{2,1}) )$ 입니다.
  - $\neg B_{1,1}$ 이 참(True)이어야 하므로, $B_{1,1}$ 은 반드시 거짓(False)이어야 합니다.
  - $B_{1,1}$ 이 거짓(False)이므로, $B_{1,1} \iff (P_{1,2} \lor P_{2,1})$ 가 참이 되려면, $(P_{1,2} \lor P_{2,1})$ 역시 반드시 거짓(False)이어야 합니다.
  - $(P_{1,2} \lor P_{2,1})$ 가 거짓(False)이라는 것은, $P_{1,2}$ 가 거짓(False) 그리고 $P_{2,1}$ 도 거짓(False)이어야 함을 의미합니다.
- KB가 참인 모델 확인:
  - $KB'$ 를 만족시키는 모델은 유일합니다.
  - 유일한 모델: ($B_{1,1} = \text{False}, P_{1,2} = \text{False}, P_{2,1} = \text{False}$)
- 모델에서 $\alpha$ 확인:
  - KB가 참인 이 유일한 모델에서, 우리의 Query($\alpha$) $\neg P_{1,2}$ 가 참인지 확인합니다.
  - 모델에서 $P_{1,2}$ 는 False입니다. 따라서 $\neg P_{1,2}$ 는 True입니다.
- 결론:
  - $KB$를 만족하는 모든 모델(여기서는 단 1개)에서 $\neg P_{1,2}$ 가 참이므로, $KB \models \neg P_{1,2}$ (수반)합니다.

### Theorem Proving (추론 규칙) 방법

- 앞서 정의한 추론 규칙들을 사용하여 $KB$로부터 $\neg P_{1,2}$ 를 직접 유도(derive)합니다. ($KB \vdash \neg P_{1,2}$)
- $KB$에서 다음 두 문장을 가져옵니다.
  - $S_1: \neg B_{1,1}$ (관찰 $O_4$)
  - $S_2: B_{1,1} \iff (P_{1,2} \lor P_{2,1})$ (규칙 $R_1$)
- 추론 과정 (Derivation):
  - 1: $(B_{1,1} \implies (P_{1,2} \lor P_{2,1})) \land ((P_{1,2} \lor P_{2,1}) \implies B_{1,1})$
    - ( $S_2$ 에 Biconditional Elimination 적용)
  - 2: $(P_{1,2} \lor P_{2,1}) \implies B_{1,1}$
    - ( 1 에 And-Elimination 적용)
  - 3: $\neg B_{1,1}$
    - ( $S_1$ Premise)
  - 4: $\neg (P_{1,2} \lor P_{2,1})$
    - ( 2 와 3 에 Modus Tollens 적용)
  - 5: $\neg P_{1,2} \land \neg P_{2,1}$
    - ( 4 에 De Morgan's Law 적용)
  - 6: $\neg P_{1,2}$
    - ( 5 에 And-Elimination 적용)
- 결론:
  - 추론 규칙을 통해 $KB$로부터 $\neg P_{1,2}$ 를 성공적으로 유도했습니다. 따라서 $KB \vdash \neg P_{1,2}$ (유도 가능)합니다.

### Proof by Contradiction (Resolution) 방법

- Resolution(분해)을 이용한 귀류법(모순에 의한 증명)입니다.
- 전략: $KB \models \alpha$ 를 증명하는 대신, $(KB \land \neg \alpha)$ 가 모순(unsatisfiable)임을 보입니다.
- 우리의 문제:
  - $KB \models \neg P_{1,2}$
  - Query($\alpha$): $\neg P_{1,2}$
  - Negated Query($\neg \alpha$): $\neg (\neg P_{1,2}) \equiv P_{1,2}$ (Double Negation Elimination)
- 목표: $(KB \land P_{1,2})$ 가 모순(Empty Clause, $\text{[]}$)을 일으킴을 보이기.
- 관련 문장을 CNF(Conjunctive Normal Form)로 변환:
- $KB$에서 필요한 문장:
  - $S_1: \neg B_{1,1}$ (이미 CNF Clause)
  - $S_2: B_{1,1} \iff (P_{1,2} \lor P_{2,1})$
    - $\equiv (B_{1,1} \implies (P_{1,2} \lor P_{2,1})) \land ((P_{1,2} \lor P_{2,1}) \implies B_{1,1})$ (Biconditional Elim)
    - $\equiv (\neg B_{1,1} \lor P_{1,2} \lor P_{2,1}) \land (\neg (P_{1,2} \lor P_{2,1}) \lor B_{1,1})$ (Implication Elim)
    - $\equiv (\neg B_{1,1} \lor P_{1,2} \lor P_{2,1}) \land ((\neg P_{1,2} \land \neg P_{2,1}) \lor B_{1,1})$ (De Morgan's)
    - $\equiv (\neg B_{1,1} \lor P_{1,2} \lor P_{2,1}) \land (\neg P_{1,2} \lor B_{1,1}) \land (\neg P_{2,1} \lor B_{1,1})$ (Distribution)
- 부정된 Query:
  - $S_3: P_{1,2}$ (이미 CNF Clause)
- CNF Clauses 목록 (Set of Clauses):
  - $C_1: \neg B_{1,1}$ (from $KB$)
  - $C_2: \neg B_{1,1} \lor P_{1,2} \lor P_{2,1}$ (from $KB$)
  - $C_3: \neg P_{1,2} \lor B_{1,1}$ (from $KB$)
  - $C_4: \neg P_{2,1} \lor B_{1,1}$ (from $KB$)
  - $C_5: P_{1,2}$ (from $\neg \alpha$)
- Resolution 과정:
  - $C_5 (P_{1,2})$ 와 $C_3 (\neg P_{1,2} \lor B_{1,1})$ 를 분해합니다.
    - ($P_{1,2}$ 와 $\neg P_{1,2}$ 가 상쇄됩니다.)
  - $C_6: B_{1,1}$ (새로운 Clause 생성)
  - $C_6 (B_{1,1})$ 와 $C_1 (\neg B_{1,1})$ 를 분해합니다.
    - ($B_{1,1}$ 와 $\neg B_{1,1}$ 가 상쇄됩니다.)
  - $C_7: \text{[]}$ (Empty Clause 생성!)
- 결론:
  - Empty Clause $[]$ 가 유도되었습니다.
  - 이는 $(KB \land P_{1,2})$ 가 모순(unsatisfiable)임을 의미합니다.
  - 따라서 귀류법에 의해, 원래의 명제인 $KB \models \neg P_{1,2}$ 가 참입니다.
