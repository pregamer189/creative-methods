# Scene kit: environments that serve the product and its films

How we make places (rooms, streets, landscapes) that a product shows behind its
content and that its short films reuse, so a clip looks like the product. The
look itself (material, palette, light) is the product's; this is the method.

## The idea

**A scene is a fixed stage, not the content.** The place stays still and calm; the
thing being shown comes into it, one at a time, and leaves the way it would (a
boat sails off, a bird flies off). The place is never built out of the things it
shows (Elias, 2026-11-01: "generic different scenarios for scenes that we can just
put any random ... idea ... in").

## Rules

1. **Real material, really lit.** Every layer is rendered or photographed from a
   physically lit model (we use Blender with a real scanned material and sun-like
   light). Never code-drawn imitation with fake grain: it read as cheap.
2. **Grown-up and calm.** Muted colour, adult proportions, thin straight edges, no
   rounded toy shapes. **No faces on things**: anything that reads as eyes (two dials
   side by side) is removed.
3. **No text in the art.** Signs use pictograms and lines, so the art never needs
   redrawing when copy changes.
4. **A place holds no subject things.** The environment never shows an object that
   could be mistaken for the thing a moment is about. A thing appears only in the
   moment that is about it.
5. **Two or three moving things at most**, slow and damped (lamps, steam, clouds, a
   passing train, a flag). The background is still.
6. **A quiet zone** in the lower middle for the card or caption, never covered, and
   text kept at least 10% from the edges in the video crop.
7. **Objects never crowd each other.** Each landing spot has a safe box.
8. **Night is a relight, not a filter.** Same layers, new key light, fill, colour
   swaps and glowing lamps and windows. Night-only extras (moon, stars) live in a
   flag in the scene file. Something that only exists by day is marked day-only.
9. **Reduced motion freezes everything** in a sensible pose (a train shows parked).

## One shared source

Per scene:

| Part | What it holds |
|---|---|
| Scene definition (code) | Shapes, light, motion, landing spots, night setup |
| `scene.json` | Canvas size, crops (product band, video frame, a 4:3 crop), the card spot, the quiet zone, landing spots with safe boxes, layers with their motion, objects |
| Layers (PNG) | Each layer with its own real shadow, stacked in order |
| Player (one script) | Mounts a scene in any element, crops it, plays motion **from a time value** (`at(t)`), shows or hides an object, rings it, swaps day and night |
| Recorder | Drives the player on virtual time and writes frame-exact video plates |

- **Crops come from one render.** The canvas is taller than any one use, so the
  product crop and the vertical video crop come from the same frames.
- **Objects are their own layers**, named and listed with what they mean, where they
  land and how they enter. One object library is shared across places.
- **Stacking:** a sheet on top of another starts above that sheet's top, and repeated
  items (fence boards, lanterns, stalls) all start at the same height, or they float
  and cast long shadows. A small helper that stacks bottom to top avoids both.

## How a new place gets made

1. Pick it from the real situations the product's users are in, not from what
   looks nice.
2. Plan in 8 lines with a critic pass (`../principles/running-the-work.md`); name
   the kid-like, busy and cheap risks.
3. Build the definition, render day and night, write `scene.json`.
4. Check every crop at phone size, in the product layout and inside a vertical
   video frame.
5. Review page: each scene moving at phone size twice (product layout, video
   frame); Like / Don't like / Neither post real comments; tier label on each.
6. Liked scenes go into the catalogue for the product and the next film.
