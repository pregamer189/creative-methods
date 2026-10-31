# Method map: how the pieces fit

The mental model behind every file here, in one page. Elias's core method
(I18, 2026-10-26): for anything meant to be very good, don't settle for the
first idea that seems best. Find out what really makes this kind of work good,
build a hardened system for it, and check the work against that system.

## The chain

```
idea ─► score ─► research ─► plan ─► build with skills ─► gate ─► show ─► marks ─► back into the methods
        (blind)  (papers,     (5-10   (one owner per rule)  (checks a   (one      (what Elias loved,
                 references)  lines)                        human can   thing at   tweaked, cut)
                                                            trust)      a time)
```

| Step | Method | Skill |
|---|---|---|
| Score an idea on its merits | `methods/research/idea-rail.md` | `idea-scorecard` |
| Find evidence | `methods/research/paper-search.md` | (tool: `tools/papers-mcp`) |
| Learn from great work | `methods/research/reference-analysis.md` | |
| Plan a film | `methods/video/storytelling.md`, `storyboard.md` | `video-storyboard` |
| Shoot it yourself | `methods/video/solo-shoot.md` | |
| Build a coded film | `methods/video/coded-films-workflow.md`, `methods/motion-graphics/film-motion.md` | |
| Cut it | `methods/video/editing-rules.md` | |
| Check a film | `methods/video/film-quality-gate.md` | `film-quality-gate` |
| Interface motion, press feedback, sound | `methods/motion-graphics/ui-motion.md` | `motion-and-feedback` |
| Make it feel alive and rewarding | `methods/emotion-graphics/README.md` | |
| Visual rules | `methods/design/` | |
| Show a change for review | `methods/design/show-changes.md` | |
| Brand knowledge base | `methods/branding/brand-kb.md` | |
| Keep skills from contradicting each other | `methods/skills/skill-audit.md` | `skill-audit` |

Every idea and source behind these methods, with where it went: `SOURCES.md`.

## Who wins when rules clash

1. What the person says now.
2. The product's own rules (its `CLAUDE.md`, quality bar, founder picks, tokens).
3. These methods.
4. Our own skills.
5. Imported skills (from the web, vendored): craft advice that never overrides
   1 to 4.

Every product repo writes its settled clashes in `.claude/skills/RULE-OWNERS.md`
and proves them with `tools/skill-combos.mjs`.

## Five beliefs the methods share

1. **One idea per piece, connected well.** Many ideas loosely joined is slop
   (I34). A film is a trust arc, not a pile of likeable things (I11).
2. **Learn why great work is great, then do what you see** in it, not what you
   think would fit (I33, I59). Copying a look can't surpass it (I13).
3. **Fix the levers we control:** music, sound, buttons, element motion,
   transitions and inserts. That is where quality is won when models hit a
   ceiling (I17).
4. **Same-model checks share blind spots** (I14). A gate is checkable facts and
   an outside eye, never "looks good to me".
5. **Cheap first:** plans, sketches and prototypes before builds; high effort for
   research and planning, low effort only for lookups (tested 2026-10-31).
