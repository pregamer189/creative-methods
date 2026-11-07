# Launch films: from the picture in your head to a pro film (2026-11-07)

For launch, promo and waitlist films meant to look like a top product launch.
Not for daily social posts (those follow `storyboard.md` and the coded route).

## The problem (Elias, 2026-11-07)

Every way of handing over a visual idea loses something:

| Medium | What it keeps | What it loses |
|---|---|---|
| Describing the scene | Meaning, feeling, story | Framing, speed, distances, what it looks like |
| Paper sketch | Composition of one moment | Motion and timing ("stale") |
| 3D modelling yourself | Space and camera, exactly | Takes skill and time; slow to change |
| Acting it out on camera | Timing, energy, the move | Exact numbers; everything depends on how well it's read |

So no single medium works. **The fix: split the idea into layers and capture
each layer with the cheapest medium that carries it completely.** The agent
then builds every layer on one shared camera, so they line up.

| Layer | Captured with | Who |
|---|---|---|
| The one idea and the feeling | Five lines (`storyboard.md`), spoken is fine | Elias talks, agent writes |
| The look (light, material, colour, texture) | 3 reference frames per shot from real films (`references/watch-list.md`, `methods/research/reference-analysis.md`), never adjectives | Agent proposes, Elias picks |
| The camera move and timing | **Slab take**: a printed marker card moved by hand in front of a still camera, talking through it. Tracked into an exact camera path (`tools/slab-take/`) | Elias acts (about 10 minutes) |
| Space and staging (what is where, what pops out of what) | Greybox scene built by the agent around the tracked camera; a top-down sketch only if staging is unclear | Agent |
| Character action | Elias acts the action on camera (performance reference), one take per beat | Elias acts |
| Sound | Song and voice first (`sound.md`, `voice.md`) | As today |

Why the slab take beats plain acting: the markers turn the take into numbers.
The move arrives exactly as acted (speed, tilt, hover height), nothing is
"read". What's left to interpret is only the look and the characters, and
those come from references and performance takes.

## The chain

1. **Brief.** `video-storyboard` skill: five lines, shot list, and the tier
   ladder below. Read past marks on films first.
2. **References.** Three frames of look per shot. Take the grammar, never the content.
3. **Act it.** One slab take per camera move, voice running ("slow push... tilt...
   hover... now they jump out"). The voice is the timing sheet. Character beats
   acted separately.
4. **Greybox animatic.** Agent tracks the takes, places a phone stand-in with the
   real app screen recording on it, flat cards for characters, and renders a rough
   animatic (`preview.py`, then Blender). **This is where Elias marks and we
   iterate** (`review-picker`: camera, timing, framing per shot). Changes here
   cost minutes; changes after the final render cost credits and days.
5. **Pick a route per element, not per film:**

   | Element | Route | Why |
   |---|---|---|
   | The phone and its screen | Full 3D (Blender), screen = real recording of the app | Product shots must be exact; AI-made interfaces read as fake and garble text |
   | Characters, creatures, environments, particles | AI video guided by the greybox render (3D-to-video, or reference-video camera control) or motion transfer from the acted take | Organic detail is where AI models are strong and 3D is slow |
   | Type, UI callouts, graphics | Coded (`coded-films-workflow.md`) | Exact, on brand, cheap to change |
   | Hands, props, real light | Real footage when the tier asks for it (practical props, like Apple's handmade MacBook Neo set pieces) | Real underpinnings are what make CG believable |

6. **Composite on the shared camera.** Every layer renders from the same tracked
   path, so they line up. Finish: `methods/design/texture-and-finish.md`.
7. **Gate.** `film-quality-gate`, plus: does each shot match its slab take and its
   reference frames?

## Tier ladder for launch films

| Tier | What it is | Typical tell |
|---|---|---|
| 1 | Coded 2D motion only | Flat; reads as a template |
| 2 | One AI video pass guided by the greybox | Drifting product, soft screen text, AI sheen |
| 3 | Hybrid: 3D hero phone + real screen + guided AI characters + coded type, composited on one camera | Aim here |
| 4 | Tier 3 plus practical footage (hands, props, real light) and a sound design pass | Apple level; needs a shoot day |

## Test case: the phone runway (Elias, 2026-11-07)

| Beat | What happens | Captured by |
|---|---|---|
| 1 | Whole phone with the app on screen, slow push in | Slab take, first part |
| 2 | The phone tilts; the camera rises over the top edge and the screen becomes a runway | Slab take; the fin keeps tracking at the low angle |
| 3 | Camera hovers very close over the screen, dramatic light, things happening on screen | Same take (the hover), light from reference frames, screen = real recording |
| 4 | Characters pop out of the screen, catch things, interact | Acted beats + greybox cards, then guided AI video composited over the 3D phone |

Status: the tracking is proven on a synthetic take (`tools/slab-take/README.md`).
Next, each needs Elias's yes (build freeze): his first real slab take, the Blender
greybox of beats 1 to 3, then one guided AI pass for beat 4.

## Tools checked 2026-11-07 (verify before paying; this field changes monthly)

| Tool | What it does for this method |
|---|---|
| Blender, driven by Python (`bpy`, headless) | Agent builds greybox and final 3D scenes; `blender_camera.py` loads the slab path |
| [MiniMax H3 Max 3D to Video](https://layer.ai/models/minimax-h3-max-3d-to-video) (Sept 2026) | Takes a blockout render up to 15 s, keeps camera path, timing and cuts, replaces stand-ins with the described scene; up to 8 reference images |
| [Seedance 2.5](https://dev.to/glglgl/seedance-25-camera-control-block-out-ai-film-shots-in-blender-first-2i7f) | Follows a reference clip; tutorial for blocking shots in Blender first |
| [Runway references](https://runway.com/resources/ai-camera-control) | Location plate + rough 3D comp + style reference; Veo 3.1 pins start and end frames |
| Higgsfield (connector in the LanguageApp project) | 3D scene builder with video generation, and motion control (recast an acted take). Costs credits |
| [Beeble Camera](https://docs.beeble.ai/integration/beeble-camera.md) | iPhone LiDAR camera tracking into Blender, for compositing over real handheld footage |
| Research: [CamCloneMaster](https://arxiv.org/pdf/2506.03140), [CoaG](https://arxiv.org/pdf/2609.24208) | Copy a camera move from a reference video; coarse 3D layout as control. Watch for product versions |

Apple practice: [practical props in the MacBook Neo film](https://petapixel.com/2026/04/24/how-apple-filmed-its-flashy-macbook-neo-video-using-handmade-props/),
[hyper-perspective in the iPhone 16e film](https://www.yankodesign.com/2025/02/19/you-probably-didnt-notice-this-clever-camera-trick-in-apples-iphone-16e-video/amp/).

## Clash note

`coded-films-workflow.md` says "no 3D world" (Elias, 2026-10-17). That stays true
for coded films. Launch films are a separate route Elias opened on 2026-11-07,
where 3D is allowed for the hero product and staging.
