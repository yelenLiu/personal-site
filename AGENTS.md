# Blog maintenance

- Production: https://yelen-blog.yelen4430.workers.dev/
- Repository: yelenLiu/personal-site, production branch: main.
- Read README.md and docs/maintenance.md before changing the site.
- Keep changes small; preserve the current layout and public article URLs.
- Low-risk fixes can be committed directly when the user authorizes maintenance. Ask before major design changes, content removal or architecture changes. Never publish private personal-context notes or unpublished drafts without explicit authorization.
- Run `npm ci` on a clean checkout, then `npm run verify`. Frontmatter validation is required; never bypass a failing build.
- Publishing means committing an approved article with `draft: false`, not only creating a Markdown file.
- After committing, wait for Cloudflare and verify `/build-info.json` matches the exact commit. Then use the actual production browser to check the affected pages, navigation and metadata. A successful GitHub write/build is not proof of a deployed release.
- Test light/dark, narrow/wide viewports and keyboard navigation where available. State unavailable checks explicitly; do not call source inspection a browser test.
- Record the commit, deployment evidence, checks and remaining limitations in the handoff. Revert a bad commit rather than force-pushing main.
