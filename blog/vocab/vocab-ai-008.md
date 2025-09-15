---
title: Vocabulary for AI 008
date: 2025-09-14T15:25:11.760+10:00
description: Vocabulary for AI 008
authors: me
tags:
  - vocab
---

## Vocabulary & Expressions

| Term/Expression | Definition | Simpler Paraphrase | Meaning |
| --- | --- | --- | --- |
| invariance | the quality of remaining unchanged when something else changes | unchangingness | 불변성 |
| disjunction | a logical operation that outputs true whenever at least one of its inputs is true | or operation | 논리합, OR |
| convergence | the process of coming together to a common point | coming together | 수렴 |
| impractically | not in a practical or realistic manner | not practical | 비현실적으로 |
| receptor | a cell or group of cells that receives stimuli and transmits them to sensory nerves | sensor | 수용체, 감각기 |
| sensation | the process of sensing our environment through touch, taste, sight, sound, and smell | feeling | 감각 |
| diffuse | spread out over a large area; not concentrated | spread out | 확산되다 |
| albedo | the proportion of the incident light or radiation that is reflected by a surface | reflectivity | 반사율 |
| color constancy | the feature of the human color perception system which ensures that the perceived color of objects remains relatively constant under varying illumination conditions | consistent color perception | 색채 항등성 |
| occlusion | the blocking of light or other radiation by an object | blockage | 폐색, 차폐 |
| deformation | the action or process of changing in shape or distorting, especially through the application of pressure | distortion | 변형 |
| foreshortening | the visual effect or optical illusion that causes an object or distance to appear shorter than it actually is because it is angled toward the viewer | perspective shortening | 단축, 단축법 |
| courtesy | provided at no cost | free of charge | 무료 제공 |
| apprenticeship learning | a type of learning where an agent learns to perform tasks by observing and imitating a more experienced agent | learning by imitation | 도제 학습 |
| consolidate | make (something) physically stronger or more solid | strengthen | 강화하다 |
| aquamarine | a light bluish-green color | light blue-green | 아쿠아마린 |
| fulvous | a dull yellowish-brown color | dull yellow-brown | 황갈색의 |
| verbatim | in exactly the same words as were used originally | word for word | 말 그대로, 축어적으로 |
| lexicon | the vocabulary of a person, language, or branch of knowledge | vocabulary | 어휘집 |
| adherent | someone who supports a particular party, person, or set of ideas | supporter | 지지자 |
| syntactic consitituent | a word or a group of words that function as a single unit within a hierarchical structure | sentence unit | 구문 성분 |
| pragmatics | the branch of linguistics dealing with language in use and the contexts in which it is used | language use | 화용론 |
| case | a grammatical category that marks the relationship between a noun and other words in a sentence | grammatical role | 격 |
| person | a grammatical category that distinguishes between different participants in a conversation (e.g., first person, second person, third person) | participant distinction | 인칭 |
| number | a grammatical category that expresses count distinctions (e.g., singular, plural) | count distinction | 수 |
| head | the main word in a phrase that determines its syntactic type | main word | 중심어 |

| 기법 | 아이디어 | 비유 |
| --- | --- | --- |
| **Laplace (Add-One)** | 모든 경우의 수에 **+1을 더해줌**. 안 본 것도 최소한의 기회를 줌. | 시험 점수를 0점 맞아도 최소 1점은 줘 |
| **Backoff** | n-gram이 없으면 **더 짧은 n-gram**으로 내려가서 확률을 씀. | 3단어 조합 못 봤네? → 그럼 2단어 조합으로 보자 → 그것도 없으면 1단어라도 보자. |
| **Linear Interpolation** | 여러 레벨(n=1,2,3)을 동시에 섞어서 확률 계산. | 국어, 영어, 수학 점수를 일정 비율(λ)로 합쳐서 성적 보는 것. |
| **Witten-Bell / Kneser-Ney** | 더 정교하게 확률 질량을 재분배. (현업에서 성능 좋음) | 선생님이 본 적 없는 문제지만 유사 문제를 잘 풀었으니 점수 좀 더 주자 하는 것. |
| **Stupid Backoff** | 대충 큰 코퍼스를 모아서, 그냥 단순 backoff만 사용. (빅데이터 시대 구글에서 씀) | 데이터가 워낙 많으니까, 그냥 단순한 방법도 잘 먹힌다. |
