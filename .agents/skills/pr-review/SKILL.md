---
name: rigorous-pr-review
description: Strict correctness, regression, and structural review bar for pull requests. Report only evidenced findings grouped by severity.
---

# Rigorous PR review

Understand the change's purpose and surrounding architecture before judging the diff. Report only problems attributable to the PR, with relevant file and line references.

## What to review

- Functional bugs, regressions, edge cases, missing error handling, security and performance risks where relevant.
- Missing or inadequate tests, unsafe type boundaries (`any`, `unknown`, unnecessary casts or optionality, non-null assertions, ignored type errors), and violations of established project conventions.
- Maintainability: long methods, deep nesting, duplicated logic, magic values, poor naming, dead code, unnecessary abstractions, and architectural drift.
- Structural quality: look for a **code-judo** move that preserves behavior but deletes concepts, branches, layers, modes, helpers, or incidental complexity rather than merely rearranging it. Be ambitious when there is a concrete, simpler design; do not demand speculative rewrites.

## Strict maintainability checks

1. **File-size growth.** If the PR takes a file from below 1,000 lines to above 1,000, flag it as a strong smell unless there is a compelling structural reason. Suggest focused decomposition where it actually improves cohesion; do not treat the number alone as proof of a defect.
2. **Spaghetti growth.** Flag ad-hoc conditionals, scattered feature checks, one-off flags, nullable modes, and special cases added to unrelated or already busy flows. Consider a clearer model, dedicated helper, policy, state machine, or module when it removes complexity instead of spreading it.
3. **Abstraction quality.** Flag generic magic that hides simple assumptions, thin wrappers and pass-through helpers that add indirection, refactors that move complexity without reducing it, and duplicate helpers where a canonical utility already exists. Prefer direct, boring code and removal of needless layers.
4. **Types and boundaries.** Identify unclear invariants hidden by casts, fallback values, ad-hoc object shapes, unnecessary optional params, or loosely typed contracts. Look for feature logic in shared paths or the wrong package, service, or layer; suggest explicit models and the canonical ownership boundary.
5. **Orchestration and state.** Flag avoidable serialization of independent work when parallel execution would also simplify the flow, and non-atomic related updates that risk partial state. Focus on concrete design consequences, not micro-optimization.
6. **Local architecture.** Ask whether the diff makes cohesive modules more coupled or stateful, introduces repeated conditionals that imply a missing model, or enlarges a component beyond a healthy boundary. A working implementation can still be a meaningful code-quality regression.

Do not comment on formatting, linting, or personal style unless it affects readability or correctness. Do not flood the response with low-value nits; favor a small number of high-conviction, evidenced findings. Be direct and demanding, not rude. A strict bar does not justify invented issues.

## Output

Return findings only, grouped by severity (**Critical**, **Major**, **Minor**). For each finding give the file and line, what is wrong, why it matters, and a concrete suggested improvement. Within each severity, prioritize correctness and production risks, then structural regressions, missed dramatic simplifications, branching growth, boundaries and type contracts, file-size/decomposition, and legibility. Treat clear structural regressions, unjustified 1,000-line crossings, avoidable spaghetti branching, boundary leaks, and gratuitous wrappers or casts as presumptive major concerns when supported by evidence.

If there are no meaningful findings, state that the implementation looks production-ready rather than inventing feedback.
