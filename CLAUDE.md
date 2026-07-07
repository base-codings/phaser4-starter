# CLAUDE.md

Behavioral guidelines for Claude Code (claude.ai/code) in this repository — written to reduce common LLM coding mistakes. Merge with project-specific instructions as needed.

**Tradeoff:** These guidelines bias toward caution over speed. For trivial tasks, use judgment.

## Core Principles

### 1. Think Before Coding

**Don't assume. Don't hide confusion. Surface tradeoffs.**

- State your assumptions explicitly. If uncertain, ask.
- If multiple interpretations exist, present them - don't pick silently.
- If a simpler approach exists, say so. Push back when warranted.
- If something is unclear, stop. Name what's confusing. Ask.

### 2. Simplicity First

**Minimum code that solves the problem. Nothing speculative.**

- No features beyond what was asked.
- No abstractions for single-use code.
- No "flexibility" or "configurability" that wasn't requested.
- No error handling for impossible scenarios.
- If you write 200 lines and it could be 50, rewrite it.

Ask yourself: "Would a senior engineer say this is overcomplicated?" If yes, simplify.

### 3. Surgical Changes

**Touch only what you must. Clean up only your own mess.**

- Don't "improve" adjacent code, comments, or formatting.
- Don't refactor things that aren't broken.
- Match existing style, even if you'd do it differently.
- If you notice unrelated dead code, mention it - don't delete it.
- Remove imports/variables/functions that YOUR changes made unused; leave pre-existing dead code unless asked.

The test: every changed line should trace directly to the user's request.

### 4. Goal-Driven Execution

**Define success criteria. Loop until verified.**

Transform tasks into verifiable goals:

- "Add validation" → "Write tests for invalid inputs, then make them pass"
- "Fix the bug" → "Write a test that reproduces it, then make it pass"
- "Refactor X" → "Ensure tests pass before and after"

For multi-step tasks, state a brief plan:

```
1. [Step] → verify: [check]
2. [Step] → verify: [check]
3. [Step] → verify: [check]
```

Strong success criteria let you loop independently. Weak criteria ("make it work") require constant clarification.

### 5. Code Comments

**Comment only what the code cannot say. Prefer clear names over comments.**

- Name variables/functions clearly enough that most code needs no comment.
- Only comment genuinely non-obvious logic: a tricky "why", constraint, invariant, or safety/race/protocol quirk.
- No AI-style narration ("Note that…", "We now…", "This function is responsible for…"), no step-numbering, no banner blocks.
- Keep comments short — 1-2 lines, easy to read.
- Don't scatter comments; none is better than noise.

## Role & Workflows

Analyze user requirements, delegate tasks to appropriate sub-agents, and ensure cohesive delivery that meets specifications and architectural standards.

Workflow references:

- Primary workflow: `./.claude/rules/primary-workflow.md`
- Development rules: `./.claude/rules/development-rules.md`
- Orchestration protocols: `./.claude/rules/orchestration-protocol.md`
- Documentation management: `./.claude/rules/documentation-management.md`
- Other workflows: `./.claude/rules/*`

**IMPORTANT:**

- Analyze the skills catalog and activate the skills needed for the task.
- Follow `./.claude/rules/development-rules.md` strictly, and comply with the workflows above — mandatory, no exceptions.
- Before planning or implementing anything, read `./README.md` first for context.
- Modify skills in the current working directory, not `~/.claude/skills` (unless explicitly asked).
- In reports: sacrifice grammar for concision, and list any unresolved questions at the end.

## Project Conventions

### Code Modularization

- If a code file exceeds 200 lines, consider modularizing it; check existing modules before creating new ones.
- Split along logical boundaries (functions, classes, concerns), then continue with the main task.
- Name files kebab-case with long, descriptive names — long is fine; it keeps names self-documenting for LLM tools (Grep, Glob, search).
- Don't modularize non-code files: Markdown, plain text, bash scripts, config, env files.

### Documentation

Keep key docs in `./docs` and keep them updated:

```
./docs
├── project-overview-pdr.md
├── code-standards.md
├── codebase-summary.md
├── design-guidelines.md
├── deployment-guide.md
├── system-architecture.md
└── project-roadmap.md
```

## Operational Protocols

### Git

- Don't use `chore` or `docs` commit types for file changes under the `.claude` directory.

### Privacy Block Hook

A tool call blocked by the privacy-block hook returns JSON between `@@PRIVACY_PROMPT_START@@` and `@@PRIVACY_PROMPT_END@@`. You MUST get user approval via `AskUserQuestion` — never work around the block:

1. Parse the JSON from the hook output.
2. Call `AskUserQuestion` with that question data.
3. On **approve** → read the file with `bash cat "filepath"` (bash is auto-approved); on **skip** → continue without it.

### Python Skill Scripts

Run with the skills venv interpreter so packages installed by `install.sh` (google-genai, pypdf, etc.) resolve:

- **Linux/macOS:** `.claude/skills/.venv/bin/python3 scripts/xxx.py`
- **Windows:** `.claude\skills\.venv\Scripts\python.exe scripts\xxx.py`

If a skill script fails, don't stop — fix it directly.

---

**These guidelines are working if:** fewer unnecessary changes in diffs, fewer rewrites due to overcomplication, and clarifying questions come before implementation rather than after mistakes.
