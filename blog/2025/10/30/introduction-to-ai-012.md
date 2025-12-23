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

- Inclusiveness
- Species/differentia
- Inheritance
- Transitivity
- Systematic and predictable rules for association and distinction
- Mutual exclusivity
- Necessary and sfficient criteria

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
