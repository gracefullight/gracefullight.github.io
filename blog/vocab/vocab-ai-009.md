---
title: Vocabulary for AI 009
date: 2025-09-27T14:31:42.774+10:00
description: Vocabulary for AI 009
authors: me
tags:
  - vocab
---

## Vocabulary & Expressions

| Term/Expression | Definition | Simpler Paraphrase | Meaning |
| --- | --- | --- | --- |
| canonical | conforming to a general rule or acceptable procedure | standard | 정통의, 표준의 |
| assert | state a fact or belief confidently and forcefully | declare | 단언하다, 주장하다 |
| lurking | remaining hidden so as to wait in ambush | hidden | 숨어있는, 잠복하는 |
| bleak | (of an area of land) lacking vegetation and exposed to the elements | desolate | 황량한, 적막한 |
| albeit | although | though | 비록 ~일지라도 |
| stench | a strong and very unpleasant smell | foul smell | 악취 |
| woeful | characterized by, expressive of, or causing sorrow or misery | sorrowful | 슬픈, 비참한 |
| As for | with regard to; concerning | regarding | ~에 관하여 |
| ignorance | lack of knowledge or information | unawareness | 무지, 무식 |
| utterly | completely and without qualification; absolutely | completely | 완전히, 전적으로 |
| prudent | acting with or showing care and thought for the future | wise | 신중한, 현명한 |
| arithmetic | the branch of mathematics dealing with the properties and manipulation of numbers | math | 산수, 계산 |
| entailment | a relationship between sentences in which one sentence logically follows from one or more others | implication | 함축, 수반 |
| syntactic | relating to the arrangement of words and phrases to create well-formed sentences in a language | grammatical | 구문의, 통사론의 |
| stands for | represents or signifies | represents | ~을 나타내다 |
| mnemonic | a device such as a pattern of letters, ideas, or associations that assists in remembering something | memory aid | 기억을 돕는 장치 |
| parentheses | a pair of round brackets () used to mark off a parenthetical word or expression | brackets | 괄호 |
| negation | the contradiction or denial of something | denial | 부정, 반대 |
| antecedent | a thing or event that existed before or logically precedes another | predecessor | 선행사, 앞서는 것 |
| precedence | the condition of being considered more important than someone or something else; priority in importance, order, or rank | priority | 우선, 우선권 |
| disjuncts | a word or phrase that is grammatically independent of the other parts of the sentence in which it occurs | separate part | 분리된 부분 |
| causation | the action of causing something | causing | 인과, 원인 제공 |
| decidedly | in a manner that is clear and definite | clearly | 단호하게, 명확히 |
| suffice | be enough or adequate | be sufficient | 충분하다 |
| tautology | a statement that is true by necessity or by virtue of its logical form | redundancy | 동어 반복, 자명한 진리 |
| conversely | introducing a statement or idea that reverses one that has just been made or referred to | in contrast | 반대로 |
| contrapositively | in a way that involves the contrapositive of a statement | by contrapositive | 대우적으로 |
| refutation | the action of proving a statement or theory to be wrong or false; disproof | disproving | 반박, 논박 |
| monotonicity | the property of a function to be either entirely non-increasing or non-decreasing | consistency | 단조성 |
| resolvent | a clause obtained by resolving two clauses containing complementary literals | derived clause | 해석절 |
| soundness | the quality of being based on valid reasoning or good judgment | validity | 타당성 |
| yield | produce or provide (a natural, agricultural, or industrial product) | produce | 산출하다, 양보하다 |
| ontological | relating to the branch of metaphysics dealing with the nature of being | existential | 존재론의 |
| commitment | the state or quality of being dedicated to a cause, activity, etc. | dedication | 헌신, 약속 |
| pedagogical | relating to teaching | educational | 교육의, 교수법의 |
| arity | the number of arguments or operands that a function or operation takes | number of arguments | (함수의) 인수 개수 |
| surrogate mothers | women who carry and give birth to a child for another person or couple | gestational carriers | 대리모 |
| predicate | a symbol or function that represents a property or relation | property | 술어, 속성 |
| kinship | blood relationship | family relationship | 친족 관계 |
| theorem | a general proposition not self-evident but proved by a chain of reasoning; a truth established by means of accepted truths | proven statement | 정리, 명제 |
| existentially | relating to existence | relating to existence | 존재에 관한 |

## Knowledge Base

- TELL, ASKS, TELL
  - TELLs the knowledge base what it preceives
  - ASKs the knowledge base what action it should perform
    - reasoning may be done about the current state of the world
    - about the outcomes of possible action sequences and so on
  - TELLs the knowledge base which action was chosen, and returns the action so that it can be executed
- `MAKE-PERCEPT-SENTENCE`
  - constructs a sentence asserting that the agent preceived the given percept at the given time.
- `MAKE-ACTION-QUERY`
  - constructs a sentence that asks what action should be done at the current time.
- `MAKE-ACTION-SENTENCE`
  - constructs a sentence asserting that the chosen action was executed.

## Logical connectives

> BNF (Backus–Naur Form) grammar of sentences
> Symbols from *Logic and Set Theory*

- $\neg$ : negation (NOT), $\neg W_{1,3}$
  - A literal is either an atomic sentence (a positive literal) or a negated atomic sentence (a negative literal).
- $\land$ : conjunction (AND), $W_{1,3} \land P_{3, 1}$
  - its parts are the conjuncts.
- $\lor$ : disjunction (OR), $(W_{1,3} \land P_{3,1}) \lor W_{2,2}$
  - its parts are the disjuncts.
- $\implies$ : implication (IMPLIES), $(W_{1,3} \land P_{3,1}) \implies \neg W_{2,2}$
  - its premise or antecedent, and its conclusion or consequent is the part that follows the $\implies$.
  - Implications are also called **rules** or **if-then** statements.
  - Sometimes written as $\rightarrow$ or $\supset$.
- $\iff$ : biconditional (IF AND ONLY IF), $W_{1,3} \iff \neg W_{2,2}$

### Truth tables

| $P$ | $Q$ | $\lnot P$ | $P \land Q$ | $P \lor Q$ | $P \implies Q$ | $P \iff Q$ |
| --- | --- | --- | --- | --- | --- | --- |
| **false** | **false** | true | false | **false** | true | **true** |
| **false** | **true** | true | false | true | true | false |
| **true** | **false** | false | false | true | **false** | false |
| **true** | **true** | false | **true** | true | true | **true** |

- Logical equivalence: $P \equiv Q$:
- Validity: a sentence is valid if it is true in all models.
  - Deduction Theorem: For any sentences $\alpha$ and $\beta$, $\alpha \models \beta$ if and only if $(\alpha \implies \beta)$ is valid.
- Satisfiability: a sentence is satisfiable if it is true in, or satisfied by, some model.
- Modus Ponens: $\frac{\alpha \implies \beta, \alpha}{\therefore \beta}$
  - whenever any sentences of the form $\alpha \implies \beta$ and $\alpha$ are given, then the sentence $\beta$ can be inferred.
- And-Elimination: $\frac{\alpha \land \beta}{\therefore \alpha}$
  - from a conjunction, one of the conjuncts can be inferred.
- monotonicity: the set of entailed sentences can only increase as information is added to the knowledge base.
  - inference rules can be applied whenever suitable premises are found in the knowledge base, regardless of what other sentences are present.
