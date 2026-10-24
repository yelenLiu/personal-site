# Repeatable blog maintenance

## Publish an article

1. Confirm the final text, language, title and stable slug. Publication requires the user's instruction; drafting alone is not approval to publish.
2. Add `src/content/writing/<slug>.md`. Use the following frontmatter. Dates are interpreted/displayed in UTC; the public URL is `/writing/<slug>/`.

```yaml
---
title: "Article title"
description: "A clear, accurate summary."
date: "2026-10-24"
category: "Experiments"
draft: true
---
```

3. Review the article in a browser, including headings, links, images and code blocks. Keep image files under `public/` and supply meaningful alt text. Mark `draft: false` only for an approved publication. Drafts must be absent from index, detail routes, RSS and sitemap. A future date alone does not schedule a post.
4. Run `npm ci` on a fresh checkout and `npm run verify`. Commit source and lockfile changes to main, recording the full commit SHA. The production Git integration should start a Cloudflare build.
5. Poll `/build-info.json` at reasonable intervals, allowing several minutes. Check `commit` matches this SHA; cached/old HTML or a successful commit is insufficient. If it does not update, inspect Cloudflare deployment logs/settings. Do not claim deployment success.
6. In the cloud browser, open Writing and the exact article, follow navigation, inspect the canonical/description/OG article tags and check RSS + sitemap include the new URL. Verify draft URLs remain unavailable.
7. Report the commit, exact live URL, release identity, checks and any limits.

## Adjust the site

- `src/layouts/Base.astro`: shared metadata, navigation, keyboard skip link, theme switch (system → light → dark, persisted locally).
- `public/styles.css`: typography, colors and responsive layout.
- `src/data/projects.ts`: project entries.
- `src/pages/about.astro`: public bio.
- `astro.config.mjs`: canonical origin and sitemap; update together with Cloudflare `SITE_URL` when changing domain.
- `src/content.config.ts`: article metadata schema.
- `wrangler.jsonc`: Workers static assets and 404 behavior.

Before editing, read the latest repository state. Avoid overwriting concurrent changes. Prefer a small commit; use a branch/PR for larger changes. Ask before redesign, deleting content or restructuring.

## Browser acceptance checklist

1. Homepage: headline, writing/project links and footer.
2. Writing: correct ordering, no drafts, one primary heading.
3. Projects/About: copy, links, active navigation.
4. Article: body and code/table/image overflow, publication metadata.
5. Desktop + mobile (at least 375/390 px and 320 px): no horizontal page overflow, usable navigation and footer.
6. Theme: system default, explicit light/dark, persistence after navigation/reload. Keyboard: visible focus and working skip link. Check contrast beyond screenshots when needed.
7. RSS, robots, sitemap-index and its referenced sitemap: correct production origin and URLs.
8. Missing URL: useful error page **with HTTP 404**, not homepage/200.
9. Inspect console/network when supported. Record actual timings if measured; a fast-looking screenshot is not a performance benchmark.

If the available browser cannot resize or emulate color preference, explicitly mark those tests unavailable. Source/CSS review supplements real browsing; it does not substitute for it.

## Rollback and access failures

Revert the offending commit and let the same deployment pipeline run. Verify the new revert SHA through build-info and browse again; do not force-push main. Existing article URLs should stay stable; plan redirects before renaming slugs.

If the cloud browser is blocked, retain commit/build evidence and report the exact error. Do not infer that the site is offline for ordinary visitors. Continue source checks but label visual acceptance incomplete. Cloudflare account settings/credentials are separate from GitHub repository access.

## Useful ChatGPT requests

- “在 personal-site 起草文章，先设为 draft，完成预览后给我确认。”
- “将我确认的这篇文章发布到博客，提交后核对 build-info 和线上文章、RSS、Sitemap。”
- “修复博客这个显示问题；保持现有设计，完成构建、提交及线上验收。”
