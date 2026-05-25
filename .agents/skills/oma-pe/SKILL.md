---
name: oma-pe
description: >
  Research and synthesize Information Processing Professional Engineer (정보처리기술사) study topics for the blog in the exact high-scoring Korean PE answer format (1교시형/2교시형) and empirical Docusaurus blog layout. Triggered when the user asks to write, research, generate, or refine PE study topics.
---

# PE Topic Researcher - 정보처리기술사 토픽 리서치 및 작성 전문가

## Scheduling

### Goal
Research, analyze, and synthesize Professional Engineer (PE) study topics under `blog/pe/` in the exact Korean exam scoring format and empirical Docusaurus blog layout, ensuring 100% technical grounding and zero build crashes.

### Intent signature
- User asks to research, write, generate, draft, or refine a Professional Engineer study topic (기술사 토픽, 공부 노트).
- User mentions 정보처리기술사, 정보관리기술사, 컴퓨터시스템응용기술사.
- User specifies exam types like 1교시형 (Short-Answer / 용어형) or 2교시형 (Long-Answer / 서술형).

### When to use
- Researching and generating a new topic file under `blog/pe/{category}/{kebab-case}.md`
- Converting or refining an existing markdown topic file to align with the high-scoring evaluator standards.
- Ensuring a draft note is completely safe for Docusaurus builds (Mermaid syntax, timezone date formatting, relative image links).

### When NOT to use
- Writing general blog essays or personal reviews unrelated to the PE exam -> use general blog creator.
- Editing React components under `src/` or site-wide configurations in `docusaurus.config.ts` -> out of scope.

### Expected inputs
- `topic_name`: The main subject (e.g., "Vector Database", "Wi-Fi 7", "DDD").
- `folder_category`: One of `algo`, `ca`, `conv`, `db`, `mng`, `nw`, `pm`, `sec`, `sw`.
- `topic_genre`: One of `Technical`, `Algorithm`, `Management`, `Law`, `Security`, `Risk`, `SW`.
- `exam_type`: Either `1교시형` or `2교시형`.

### Expected outputs
- A completed Docusaurus-compatible Markdown file written to `blog/pe/{folder_category}/{kebab-case-topic-name}.md` matching the target blueprint.

```yaml
outputs:
  - name: topic_post
    description: High-scoring PE topic markdown file
    artifact: "blog/pe/**/*.md"
    required: true
```

### Dependencies
- High-Scoring blueprints and grounding rules: `resources/pe-topic-template.md`
- Local filesystem search and write tools (`grep_search`, `write_to_file`, `view_file`)
- Professional Engineer essay strategy guide: `blog/2024/03/02/professional-engineer-essay.md`

### Control-flow features
- Branching based on `exam_type` (1교시형 vs 2교시형) to generate distinct heading outlines.
- Branching based on `topic_genre` to apply specific modifiers (LaTeX math for Algorithm, standards for Management, legal articles for Law).
- Proactive grounding validation (verifies specifications on authoritative sites before compiling).

---

## Structural Flow

### Entry
1. Identify the target topic name, category, genre, and exam type from the user prompt.
2. Confirm the exact target file path: `blog/pe/{category}/{kebab-case-topic-name}.md`.

### Scenes
1. **PREPARE**: Collect inputs and check if an existing file already exists at the target path.
2. **ACQUIRE**: Aggressively research authoritative and PRIMARY sources (IETF RFCs, IEEE/ISO standards, NIST/KISA guides, the National Law database, official org announcements, arXiv papers) via web search — cross-check multiple sources and follow through to the primary source rather than stopping at the first sign of uncertainty. The objective is to FIND and cite the real fact by any legitimate means; a placeholder is only a documented last resort after an exhaustive search genuinely fails.
3. **REASON**: Select the matching blueprint outline (1교시형 vs 2교시형) and apply genre modifiers defined in `resources/pe-topic-template.md`.
4. **ACT**: Generate or update the markdown file, ensuring quoted dates with a `+09:00` offset, the required `tags` block (`pe` + `pe/<category>`), and double-quoted Mermaid node labels.
5. **AUDIT**: Execute the rigorous 8-point self-audit checklist below, then a strict **Markdown Syntax Integrity Check** (table pipes balanced, Mermaid delimiters matched, `==highlight==` closed in pairs):
   1. **Grounding** — every standard number, RFC/arXiv ID, law article, statistic, and named spec is resolved by actively researching authoritative/primary sources and is backed by a real citation. The `[수동 확인 필요 - 검증 필요]` placeholder is a last resort ONLY after an exhaustive multi-source search genuinely fails — never a shortcut to skip research.
   2. **Citation/Reference** — a `## 참조` section listing those sources is present whenever any such external fact is stated; no cited fact is left without its source link.
   3. **Symbol Consistency** — every symbol in a formula is defined exactly once and never reused with a different meaning in the same document (e.g. `P` must not mean both "연결요소 수" and "판단노드 수").
   4. **Volatile-Claim Safety** — for changing facts (governance/ownership such as "X is under the Linux Foundation", "latest version", release dates), actively verify the CURRENT state against primary sources (official announcements, the org's own site) and cite it. Never assert unsourced, and never default to a placeholder when the fact is findable.
   5. **Headings** — starts with `## [Topic] 개념`, descriptive H3 only (no `가./나./다.`, no Roman numerals).
   6. **Tables & Volume** — row caps, word count, and Mermaid node count match the `exam_type`; 3-column header pattern intact.
   7. **Build Safety** — quoted `date` with `+09:00`, `tags` block (`pe` + `pe/<category>`), all Mermaid node labels double-quoted.
   8. **Style** — no emojis, no `"끝"` marker, no body `---` horizontal rules.
6. **VERIFY**: Run final syntax structure, layout, and word count validation checks. If any check fails, enter recovery logic.
7. **FINALIZE**: Report the generated/updated file path, summary of the topic, and the audit validation evidence.

### Transitions
- If the topic belongs to the `Algorithm` genre, transition to applying LaTeX formatting (`$ ... $`) for all mathematical formulas.
- If the topic belongs to the `Law` genre, transition to referencing exact legislative article numbers (e.g. 개인정보보호법 제O조).
- If the exam type is `1교시형`, compile the 3-section layout; if `2교시형`, compile the 4-section layout.
- Apply volume limit: if `1교시형`, verify text is 250-350 words, Mermaid has 4-5 nodes, and tables have max 4 rows. If `2교시형`, verify text is 450-650 words, Mermaid has 6-7 nodes, and tables have max 5 rows.
- If the generated markdown fails any self-audit step or contains broken syntax, transition back to the **ACT** scene for correction.

### Failure and recovery
| Failure | Recovery |
|---------|----------|
| Ambiguity in folder category | Map the topic name to the roadmap in `resources/pe-topic-template.md` to infer the correct category. |
| Uncertain standard number, formula, or volatile fact | Do not guess, and do not immediately placeholder. Search additional authoritative/primary sources (official specs, org announcements, arXiv, law DB) until the real fact is found and cited. Use `[수동 확인 필요 - 검증 필요]` only if it is genuinely unobtainable after an exhaustive search. |
| Mermaid diagram fails Docusaurus parse | Wrap all node text labels in double quotes (e.g., `Node["Text"]`) to bypass parsing crashes. |
| Broken Mermaid or Table markdown syntax | Parse and re-align column pipes, fix unclosed quotes, and close unmatched brackets/markers. |
| Overly wordy draft (breaks handwritten limits) | Run extreme text compression, removing generic auxiliary words and converting full sentences into concise, bulleted technical noun lists. |
| Audit checklist validation fails | Re-route to the **ACT** scene and perform automated text replacement to correct the formatting. |

### Exit
- Success: A Docusaurus-compatible MD file is written to the correct folder, passing all 8 self-audit checks and syntax integrity validations, adhering to the corpus-aligned volume constraints, carrying the required `tags` block and a `## 참조` for any cited facts, and matching the empirical blog blueprints (no `"끝"` marker, no `가./나./다.` enumeration).
- Failure: No file is written due to a missing topic definition or severe lack of source material.

---

## Logical Operations

### Actions
| Action | SSL primitive | Evidence |
|--------|---------------|----------|
| Check category roadmap | `READ` | `resources/pe-topic-template.md` |
| Research topic specifications | `CALL_TOOL` | `search_web` query for official standards (IETF, KISA, etc.) |
| Select blueprint outline | `SELECT` | `exam_type` classification (1교시형 vs 2교시형) |
| Draft markdown content | `WRITE` | `blog/pe/{category}/{kebab-case-topic-name}.md` |
| Perform 8-point self-audit & syntax check | `VALIDATE` | Grounding, Citation/참조, Symbol Consistency, Volatile-Claim Safety, Headings, Tables/Volume, Build Safety, Style + Markdown parsing integrity |
| Verify Docusaurus compatibility | `VALIDATE` | Heading check, Mermaid node quotes, and `tags` block (`pe` + `pe/<category>`) presence |
| Report completion | `NOTIFY` | Printed filepath, topic summary, and successful audit evidence |

### Tools and instruments
- `search_web` for grounding information
- `write_to_file` and `replace_file_content` for creating and editing topic notes
- `resources/pe-topic-template.md` for blueprint skeletons

### Canonical workflow path
1. Identify the topic, category, genre, and exam type.
2. Run `search_web` to retrieve the latest, verified technical specs, IEEE standard numbers, or KISA guidelines.
3. Construct the Docusaurus-compliant YAML frontmatter: `title`, double-quoted `date` with a `+09:00` offset (any hour), `description`, `authors: me`, and `tags: [pe, pe/<category>]`.
4. Compose the topic body utilizing standard H2 plain headings (no Roman numerals), starting with `## [Topic] 개념` (the corpus default; `개요` only when a multi-part overview is warranted), and using descriptive H3 titles (never `가./나./다.` enumeration).
5. Generate the logical Mermaid diagrams (wrapping node labels in double quotes).
6. Create the 3-column table grids utilizing the `| 구분 | 핵심요소 (or 내용) | 비고 (or 설명) |` header pattern.
7. Verify that LaTeX mathematical formulas are formatted in `$ ... $`.
8. Enforce the corpus-aligned volume limitations. Both exam types share the SAME blog markdown conventions and differ only in depth/length:
   - For `1교시형`: ~250-350 words, max 4-5 Mermaid nodes, tables limited to max 4 rows (핵심요소) and 3 rows (적용방안).
   - For `2교시형`: ~450-650 words, max 6-7 Mermaid nodes, tables limited to max 5 rows (핵심요소) and 3 rows (적용방안), plus one extra depth section (적용전략/활용사례).
9. Execute the 8-point self-audit (including **Symbol Consistency** and **Citation / Volatile-Claim** grounding) plus the markdown syntax integrity check; re-route to ACT and correct on any failure.
10. Add a `## 참조` references section listing every external source cited in the body. REQUIRED whenever a standard, spec, paper, law article, or statistic is referenced; optional only for purely conceptual topics. Do NOT append a `"끝"` marker (the blog corpus never uses it).
11. Save the file to `blog/pe/{category}/{kebab-case}.md`. Default to English kebab-case; Korean kebab-case filenames are acceptable for Korea-specific law/audit/guideline topics (e.g., `소프트웨어-진흥법.md`).

### Resource scope
| Scope | Resource target |
|-------|-----------------|
| `CODEBASE` | `blog/pe/**/*.md`, `resources/pe-topic-template.md` |
| `LOCAL_FS` | Target file path `blog/pe/{category}/{kebab-case}.md` |

### Preconditions
- The topic name, genre, and category are identified.
- The target folder directory exists or can be created automatically by `write_to_file`.

### Effects and side effects
- Creates or overwrites a single Markdown file under `blog/pe/`.
- Does not edit Docusaurus configurations or custom React code.

### Guardrails
1. Never use Roman numerals in markdown headers (e.g. `## I.` is prohibited; use plain `##` headings).
2. Never fabricate or assert-unsourced any standard number, RFC/arXiv ID, legal clause, version, date, or governance/ownership claim. Actively research it and cite a real source in `## 참조`. The placeholder `[수동 확인 필요 - 검증 필요]` is a last resort ONLY after an exhaustive multi-source search fails — never a shortcut to avoid researching.
3. Always wrap Mermaid node labels in double quotes to prevent Docusaurus MDX parser failures.
4. Always execute the rigorous 8-point self-audit checklist prior to finalizing any draft.
5. Always verify Markdown syntax integrity: ensure tables have balanced pipe dividers, Mermaid blocks have matched delimiters, and highlighting markers are closed in pairs.
6. Emojis and informal icons are strictly prohibited from headings and markdown content.
7. **Enforce corpus-aligned volume constraints (학습 가독성 조화)**: 
   - **1교시형 (용어형):** ~250-350 Korean words, 4-5 Mermaid nodes, 4 rows max.
   - **2교시형 (논술형):** ~450-650 Korean words, 6-7 Mermaid nodes, 5 rows max. Same markdown conventions as 1교시형 — only deeper (more sections/rows), never a prose-essay or `가./나./다.` format.
8. Frontmatter `tags` MUST contain both `pe` and `pe/<category>`. Never append a `"끝"` marker, never use `가./나./다.` enumerated subheadings, and never use Roman-numeral headings — none of these appear in the blog corpus.
9. **Symbol consistency (audit point 3):** within one document, every formula symbol is defined exactly once and never reused with a conflicting meaning. Re-check each `$...$` block before finalizing.
10. **Citation grounding (audit points 2 & 4):** every externally-verifiable fact must be researched until a real source is found and linked in `## 참조`. Placeholders are a last resort after exhaustive search, never the default. Unsourced definitive claims about volatile facts (org governance, latest version, dates) are prohibited.

---

## References
- PE Topic Template: `resources/pe-topic-template.md`
- Professional Engineer Essay: `blog/2024/03/02/professional-engineer-essay.md`
