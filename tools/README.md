# Tools

**This folder is the canonical copy.** Product repos copy these files as they are
(`skill-rules.mjs` and `skill-combos.mjs` into `scripts/`, `papers-mcp/` into
`tools/`) and never edit their copy; improvements are made here first.

| Tool | What it does | Run |
|---|---|---|
| `skill-rules.mjs` | Pulls every hard rule from the repo's rule files and skills, tagged by topic | `node scripts/skill-rules.mjs [--topic t] [--json]` |
| `skill-combos.mjs` | Proves each skill set in `.claude/skills/combos.json` has an owner in `RULE-OWNERS.md` for every shared topic | `node scripts/skill-combos.mjs [--lock]` |
| `papers-mcp/` | Free paper search (ERIC, Europe PMC, Crossref; OpenAlex and Semantic Scholar with free keys). MCP server and command line, no dependencies | `node tools/papers-mcp/server.mjs search "\"key term\" more words"` |

Per-repo config: `.claude/skills/rule-sources.json` (the repo's rule files and
extra skill folders; see `methods/skills/skill-audit.md`).

This repo audits itself the same way: `node tools/skill-combos.mjs` from the repo
root checks `skills/` against `methods/`.
