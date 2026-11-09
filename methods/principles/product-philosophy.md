# Product philosophy: one idea, then a job for every page

Why this exists: screens kept failing review because there was no shared idea of
what each page is for and how it should feel. Variants without a philosophy read
as random (Elias, 2026-11-01: "the look is just not there yet, and we don't have
the philosophy for all of the different pages yet. So maybe that's where we
should start"). Write the philosophy before the next screen.

## 1. The one idea

One sentence that every page serves. It names what the person gets, in their
terms, not the feature list. Test: a stranger who reads only that sentence can
guess what the first screen looks like.

## 2. Two layers, both with character

Most good products have a **material layer** (the depth: the world, objects,
scenes, the one thing with soul) and a **voice layer** (everything you read and
press: type, keys, marks). Both need character.

- **The material layer is real.** Real material, real light, real layered shadow
  (photographed, filmed or rendered from a physically lit model). Never code-drawn
  imitation of a material: it reads as cheap every time.
- **The voice layer is flat, sharp and loud enough.** Solid fills, hard edges,
  tone steps, a real jump in type size (not three similar sizes). It overlaps the
  material layer instead of sitting in a separate box.
- **Test:** hide the material layer. Does the screen still look like this product?
  If not, the voice layer is too plain.

## 3. Minimal with soul

Elias, 2026-11-01: plain pages had "no character or soul". Minimal yes, but the
Figma approach: advanced features bundled into a clean surface, real depth, and
small details people wouldn't consciously notice. Never answer "too busy" by
stripping a screen to bare type. Every screen needs:

1. **One signature element** with character (one hero per page, never two
   competing).
2. **Depth reachable by touch**, not printed: tap, hold or swipe on the object it
   belongs to. Every gesture is a shortcut with a visible way to do the same thing
   (hidden gestures are found late or never; Norman & Nielsen 2010). Standard
   gestures only; never block system edge swipes (Apple HIG).
3. **Purposeful motion and sound** on state changes: every touch answers with
   travel, a sound and a small haptic.
4. **Navigation that is a designed object**, built from the feature map, not three
   default icons.

## 4. Rules every page follows (template)

Write about twelve, each checkable. The set we use:

1. One job, answered at first glance; everything else smaller or hidden.
2. One hero per page.
3. Real material only; no gradients (shading comes from light on layers).
4. The voice layer passes the hidden-material test.
5. Colour comes from the palette tokens and the world; dark mode is a relit
   scene, never an inverted image.
6. Depth by touch, never printed ("hold to ..." text is banned; a gesture is
   taught once, by doing).
7. Every touch answers: press travel, sound, haptic. One sound family per kind of
   action.
8. Motion follows one physics for the whole product (ours: things slide and
   settle, damped, and leave the way they came). At most one moving thing on
   open. Reduced motion keeps every change and drops the travel.
9. Grown-up and calm: real proportions, muted colour, no faces on objects, no
   confetti, no begging mascots. Round bodies, big heads and bright colour read as
   childish (baby schema; Miesler, Leder & Herrmann 2011).
10. Say each thing once: no label repeating a heading, a mark or a sound. Verdicts
    are icons, colour, sound and haptic, never words like "Correct" or "Wrong".
11. Every long string fits; the layout is tested at the longest case.
12. Everyone can use it: spoken labels on every hero, larger text respected,
    contrast measured on the real render.

## 5. A row per page

| Page | Job (one question) | Hero | Hidden depth | The one moment | Sound family | Never |
|---|---|---|---|---|---|---|

Fill it for every page before designing any of them. "Never" is as important as
"Job": it is the list of things reviewers will reject.

## 6. States every page covers

Empty (seeded with one example, never blank), waiting (a real moment, not a
spinner), offline, error, the "bad day" state (calm, no warning words), long
text, and an asset budget (layered stills moved with transforms
beat video).

## 7. Tiers

Each part climbs in order; a part can't be worked at a tier until the one below
holds.

| Tier | Name | It means | Checked by |
|---|---|---|---|
| 1 | Right | Works, every state, accessible | QA run on the real build |
| 2 | Clean | Layout, type, spacing and words as good as the best app at the same job | Same crop beside the reference; an outside critic can't say which is weaker |
| 3 | Felt | Motion, sound, haptics, the in-between moments, specced per moment | Screen recording with sound beside the reference |
| 4 | Alive | The world reacts to you, remembers, has voices | Only once 1-3 hold; never adds a tap or a wait to the core task |
| 5 | Ours | The moments nobody else has | A stranger can describe it after one use |

Polishing motion on a weak layout wastes the work; a living world on a broken
core is decoration.

## 8. The core path

When people come back every day, give them **one path**: one key, the next thing
comes up. Freedom lives beside it (a place to do more, chosen from 3-5 options;
choice raises motivation at that size, Patall et al. 2008), never in front of it.
