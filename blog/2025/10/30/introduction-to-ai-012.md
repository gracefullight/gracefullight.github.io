---
title: IAI +012
date: 2025-10-30T17:43:08.973+11:00
description: IAI +012
authors: me
tags:
  - iai
---

## Structural Knowledge

- Structural knowledge: the relationship between concepts and objects in the world.
- Hierarchical approach: built on classification and uses hierarchies as the structures for knowledge representation, presented in a graphical format.
  - Semantic networks: nodes represent concepts, and edges represent relationships between concepts.
  - Ontologies
    - A formal specification of concepts, relationships, and constraints within a domain that enables machines to reason automatically.
    - It defines classes (concepts), subclasses (hierarchical relations), and properties (attributes or relations) that describe how entities interact.
    - Unlike simple taxonomies, ontologies also include logical axioms and constraints that specify allowable relationships and permit inference and consistency checking through automated reasoning.
    - Classes: Main concepts or categories (e.g. Person, Animal).
    - Subclasses: Subcategories (e.g. Dog ⊂ Animal).
    - Properties: Attributes (e.g. hasPart, hasColor).
    - Relations: Connection rules (e.g. MemberOf, SubsetOf).
    - Constraints: Logical constraints (e.g. disjointness, transitivity) that enable inference.

### Requirement of hierarchices

- Inclusiveness: `Dog ⊆ Mammal ⊆ Animal`
- Species/differentia: `Dog = Mammal + (barks, canine traits, etc.)`
- Inheritance: `Mammal: has_fur, gives_live_birth` → `Dog: inherits all Mammal properties`
- Transitivity: If `Dog ⊆ Mammal` and `Mammal ⊆ Animal`, then `Dog ⊆ Animal`
- Systematic and predictable rules for association and distinction
- Mutual exclusivity: `Reptile ∩ Mammal = ∅`
- Necessary and sfficient criteria:
  - Necessary: $\forall x,\ \text{Mammal}(x) \Rightarrow \text{Vertebrate}(x) \land \text{ProducesMilk}(x)$
  - Sufficient: $\forall x,\ \text{Vertebrate}(x) \land \text{ProducesMilk}(x) \Rightarrow \text{Mammal}(x)$

### Advantage of hierarchical approach

- Inferring from incomplete evidence (if the shared criteria are not obvious or easily observable).
  - `Animal → Mammal → Dog`: If an entity is classified as a *Mammal*, we can infer properties such as *having fur* and *giving live birth*, even if the entity is not explicitly identified as a *Dog*.
- Excellent representations in mature domains
  - Domains where entities and relationships are well understood and stable
  - e.g. medical diagnosis, biological taxonomy, type systems in programming languages.
- Useful for entities that are well defined and have clear class boudnaries.
  - Good fit: HTTP status codes, chemical elements, and biological species
  - Poor fit: emotions, social roles, and cultural practices
- Some theory or model is necessary to guide the identification
  - Provides criteria for defining entities and relationships
  - e.g. Evolutionary theory in biological taxonomy, Type theory in programming languages

### Partition

> A partition of a category is a set of subcategories that form a disjoint, exhaustive composition of that category.

- Disjoint: Two or more categories are disjoint if they don't share common members.
- Exhaustive composition: The subcategories together cover all members of the parent category, leaving no member unclassified.
- Examples:
  - ❌ Category: Animal (Not a partition)
    - Mammal, Bird (Reptiles, fish, insects are missing, not exhaustive)
  - ✅ Category: Integer (Partition)
    - Even, Odd (Disjoint and exhaustive)

### Physical composition

- **PartOf** Relation: `Partof(a, b)` is a relation representing that one thing, 'a', is a part of another thing, 'b'.
- **BunchOf** Relation: `BunchOf(a)` is a relation, taking a set of objects 'a', to represent a composite object made up of those parts.
- Examples:
  - `Partof(Wheel, Car)`: A wheel is part of a car (**one-to-one** relation).
  - `BunchOf({Wheel1, Wheel2, Wheel3, Wheel4})`: A car is a bunch of four wheels (**many-to-one** relation).
- Link between `PartOf` and `BunchOf`:
  - $\forall x (x \in s \implies PartOf(x, BunchOf(s)))$
  - $\forall y \Big[\big(\forall x (x \in s \implies PartOf(x, y)\big) \implies PartOf(BunchOf(s), y)\Big]$
- Why useful?
  - Reasoning from individual `parts -> group -> larger object`.
  - Avoiding ambiguity between: "this thing is part of", "these things together form"
  - Without `BunchOf`, ontologies cannot represent: piles, colleciton, aggregates, composite physical structures.
