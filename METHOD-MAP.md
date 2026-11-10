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

The philosophy under the chain, and how a raw idea becomes a scene, a video, a
landing page or a screen: `methods/principles/` (start with `idea-to-finished.md`).

| Step | Method | Skill |
|---|---|---|
| Sort the questions; decide from evidence | `methods/principles/evidence-first.md` | |
| Give a product one idea and a job per page | `methods/principles/product-philosophy.md` | |
| Plan, critic pass, decide and log, hard rules | `methods/principles/running-the-work.md` | |
| Score an idea on its merits | `methods/research/idea-rail.md` | `idea-scorecard` |
| Find evidence | `methods/research/paper-search.md` | (tool: `tools/papers-mcp`) |
| Bring taste in as an input | `methods/research/taste.md` | |
| Learn from great work | `methods/research/reference-analysis.md`, `references/watch-list.md` | (tools: `tools/video-refs/`) |
| How every part of a film gets made | `methods/video/production-foundation.md` | |
| What great films do, frame by frame | `methods/video/visual-grammar.md` | (tools: `tools/video-refs/shots.py`) |
| Plan a film | `methods/video/storytelling.md`, `storyboard.md` | `video-storyboard` |
| Shoot it yourself | `methods/video/solo-shoot.md` | |
| Build a coded film | `methods/video/coded-films-workflow.md`, `methods/motion-graphics/film-motion.md` | |
| Sound and music | `methods/video/sound.md` | |
| Voice | `methods/video/voice.md` | |
| Finish a frame | `methods/design/texture-and-finish.md` | |
| Cut it | `methods/video/editing-rules.md` | |
| Check a film | `methods/video/film-quality-gate.md` | `film-quality-gate` |
| Interface motion, press feedback, sound | `methods/motion-graphics/ui-motion.md` | `motion-and-feedback` |
| Measure a reference's motion frame by frame | `methods/motion-graphics/measured-teardown.md` | |
| Try micro-interactions and sounds before building | `methods/motion-graphics/motion-and-sound-lab.md` | `review-picker` |
| Scenes and environments for the product and its films | `methods/design/scene-kit.md` | |
| Short videos for a teaching account | `methods/video/teaching-account.md` | `film-quality-gate` |
| Film a scroll page for short-video feeds | `methods/video/scroll-page-films.md` | `film-quality-gate` |
| Landing and waitlist pages | `methods/web/landing-pages.md` | `review-picker` |
| Make it feel alive and rewarding | `methods/emotion-graphics/README.md` | |
| Visual rules | `methods/design/` | |
| Show a change for review, or a page of picks | `methods/design/show-changes.md` | `review-picker` |
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

## Seven beliefs the methods share

1. **One idea per piece, connected well.** Many ideas loosely joined is slop
   (I34). A film is a trust arc, not a pile of likeable things (I11).
2. **Learn why great work is great, then do what you see** in it, not what you
   think would fit (I33, I59). Copying a look can't surpass it (I13).
3. **Fix the levers we control:** music, sound, buttons, element motion,
   transitions and inserts. That is where quality is won when models hit a
   ceiling (I17).
4. **Same-model checks share blind spots** (I14). A gate is checkable facts and
   an outside eye, never "looks good to me".
5. **Plan much more before acting, and read the feedback first** (Elias,
   2026-10-31). Before planning anything, read every earlier mark and comment on
   that area; the plan says which feedback it answers.
6. **Quality is raised in tiers.** For each piece, write what the next two tiers
   up would look like (with a reference for each) and aim for the highest one
   that's feasible. "Good enough" is not a tier; the current bar is "close to
   real".
7. **Cheap first:** plans, sketches and prototypes before builds; high effort for
   research and planning, low effort only for lookups (tested 2026-10-31).
