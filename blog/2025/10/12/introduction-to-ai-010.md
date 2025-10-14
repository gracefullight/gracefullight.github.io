---
title: IAI +010
date: 2025-10-12T23:34:42.267+11:00
description: Introduction to AI +010
authors: me
tags:
  - iai
---

## Knnowledge representation

- Intelligent agents need knowledge about the world in order to reach good decisions.
- Declarative knowledge is represented in a form of sentences in a knowledge representation language and stored in a knowledge base.
- Knowledge base is used by an inference engine to infer a new sentence which will be used for the agent to decide what action to take next.
- Formal languages are defined by its grammar and semantic rules
  - **grammar**: defines the syntax of legal sentences
  - **semantic rules**: defines the meaning.
- Common knowledge representation formalisms:
  - **Propositional logic**
  - **First-order logic**
  - Fuzzy logic
  - Semantic networks
  - Ontologies

### Propositional logic

- a declarative language in which can handle propositions that are known true, known false, or completely (unknown true or false)
- a BNK (Backus-Naur Form) grammer of sentences in propositional logic.
  - $\neg$ = NOT
  - $\land$ = AND
  - $\lor$ = OR
  - $\implies$ = IMPLIES
  - $\iff$ = IF AND ONLY IF
- Negation: a sentence using $\neg$ is called negation
- Literal: either an atomic sentence or a negated atomic sentence
- Conjunction: two sentences connected by $\land$. Eac hof them is called **conjunct**
- Disjunction: two sentences connected by $\lor$. Each of them is called **disjunct**
- Implication: two sentences connected by $\implies$. $P \implies Q$. P is called premise or antecedent and Q is the conclusion or consequent.
  - An implication is `if-then` statement.

Truth tables

|   P   |   Q   | $\neg$P | P $\land$ Q | P $\lor$ Q | P $\implies$ Q | P $\iff$ Q |
|-------|-------|---------|-------------|------------|----------------|------------|
| **T** | **T** |    F    |      T      |     T      |       T        |     T      |
| **T** | **F** |    F    |      F      |     T      |       F        |     F      |
| **F** | **T** |    T    |      F      |     T      |       T        |     F      |
| **F** | **F** |    T    |      F      |     F      |       T        |     T      |

### FOL, First-order logic

- a declarative language
- Syntax of FOL builds on that of propositional logic
- terms to represent objects, universal quantifier, and existential quantifier
- a model in FOL must provide the information required to determine the truth value of every atomic sentence in the language.
- $\forall x P(x)$ means for all x, P(x) is true
- $\exists x P(x)$ means there exists an x such that P(x) is true

### Logical equivalence

| logical equivalence | meaning                          |
|---------------------|----------------------------------|
| $(\alpha \land \beta) \equiv (\beta \land \alpha)$ | Commutativity of $\land$          |
| $(\alpha \lor \beta) \equiv (\beta \lor \alpha)$  | Commutativity of $\lor$           |
| $(\alpha \land (\beta \land \gamma)) \equiv ((\alpha \land \beta) \land \gamma)$ | Associativity of $\land$          |
| $(\alpha \lor (\beta \lor \gamma)) \equiv ((\alpha \lor \beta) \lor \gamma)$  | Associativity of $\lor$           |
| $\neg(\neg \alpha) \equiv \alpha$                     | Double negation elimination |
| $(\alpha \implies \beta) \equiv (\neg \alpha \lor \beta)$ | Implication elimination          |
| $(\alpha \implies \beta) \equiv (\neg \beta \implies \neg \alpha)$ | Contraposition                   |
| ($\alpha \iff \beta) \equiv ((\alpha \implies \beta) \land (\beta \implies \alpha))$ | Biconditional elimination        |
| $\neg(\alpha \land \beta) \equiv (\neg \alpha \lor \neg \beta)$ | De Morgan's law for $\land$      |
| $\neg(\alpha \lor \beta) \equiv (\neg \alpha \land \neg \beta)$ | De Morgan's law for $\lor$       |
| $(\alpha \land (\beta \lor \gamma)) \equiv ((\alpha \land \beta) \lor (\alpha \land \gamma))$ | Distributivity of $\land$ over $\lor$ |
| $(\alpha \lor (\beta \land \gamma)) \equiv ((\alpha \lor \beta) \land (\alpha \lor \gamma))$ | Distributivity of $\lor$ over $\land$ |

$$\forall x \neg P(x) \equiv \neg \exists x P(x)$$

- For all x, not P(x) is logically equivalent to "it is not the case that there exists an x such that P(x) is true."

## Reasoning

### Deductive reasoning

- a process of reasoning from one or more statements (premises) to reach a logical conclusion.
- first premise, second premise, therefore conclusion.

### Inductive reasoning

- the process of resoning from specific observations to borader generalizations and theories.
- also described as a method where one's experiences and observations are synthesized to cmoe up with a general truth.
- premises and then conclusion

## Inference

- steps in reasoning
- moves from premises to logical consequences
- In AI Context, inference is to derive new logical sentences (as the conclusion) from existing logical sentences (as premises).
- researchers develop automated inference systems to emulate human inference.

### Inference Problem

$$KB \models \gamma$$

- KB, Knowledge Base, is a set of propositions that represent what is known about the world.
- $\gamma$, Query sentence, is the target conclusion which needs to be confirmed based on the given KB.
- where $\models$ denotes the relation of logical entailment between KB and the sentence $\gamma$, reading as "KB entails $\gamma$" or "if KB is true, then $\gamma$ must also be true".
- $\alpha \models \beta \iff M(\alpha) \subseteq M(\beta)$
  - $M(\alpha)$ is the set of all models that satisfy $\alpha$.
  - $M(\beta)$ is the set of all models that satisfy $\beta$.
  - The statement $\alpha \models \beta$ means that in every model where $\alpha$ is true, $\beta$ is also true. In other words, if $\alpha$ holds, then $\beta$ must also hold.
- Model Checking: enumerates all possible models and checks if the entailment holds in each model.
  - Knowledge base will be used to draw inferences.
  - Query sentence, $\gamma$, is needed to be checked whether it is entailed by the KB.
  - Symbols, a list of all symbols (or atomic propositions) used in the problem context.
  - Models, assignments of truth and false values to those identified symbols.
- Model Checking Procedure
  1. Identify the propositional symbols involved in the KB sentences and query sentence
  2. Enumerate all possible models by assigning truth values to the identified symbols.
  3. Evaluate the KB sentence in each model and fined the models in which KB is true.
  4. Evaluate the query sentence in the models from step 3 and check if query sentence is true in these models.
  5. Conclude that the KB entails the query sentence $\gamma$ if and only if the query sentence is true in all models where the KB is true.
