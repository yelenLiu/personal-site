# Yelen personal site

Astro static blog. Production: https://yelen-blog.yelen4430.workers.dev/

## Development

Node.js 22.12+ (CI uses Node 22). Commit `package-lock.json`.

```sh
npm ci
npm run dev
npm run verify
```

`verify` validates article frontmatter, checks Astro types, builds the static site and checks generated routes, internal links, canonical URLs, metadata, RSS, sitemap and source commit identity.

## Deployment

The current site uses **Cloudflare Workers Static Assets**, not Pages. Git-connected production branch: `main`; build command: `npm run build`; deploy command: `npx wrangler deploy`; static output: `dist`. `wrangler.jsonc` defines the existing worker name and real 404 handling. Keep Cloudflare Node set to 22.12+ and `SITE_URL=https://yelen-blog.yelen4430.workers.dev` (or omit it to use the checked-in production default). No Cloudflare API key belongs in this repository.

The Cloudflare dashboard's Git connection and build commands must match this configuration; they are external account settings. The GitHub verification workflow checks changes but does not itself deploy or block Cloudflare builds.

After pushing, inspect `https://yelen-blog.yelen4430.workers.dev/build-info.json`. Its `commit` must equal the source commit before accepting a release. When building from an archive without `.git`, provide a full `COMMIT_SHA`. For a custom domain, update `SITE_URL`, redeploy and verify canonical, RSS and sitemap origins together.

## Writing and maintenance

See [maintenance workflow](docs/maintenance.md) and [agent instructions](AGENTS.md).

The Personal Context project is a private experiment. Do not publish private notes or describe it as a validated released product.
