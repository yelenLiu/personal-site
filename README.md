# Yelen personal site

Minimal Astro blog featuring engineering experiments, projects and writing.

## Develop

Requires Node.js 20.3 or newer.

```sh
npm install
npm run dev
npm run build
```

## Deploy

Cloudflare Pages → Connect Git → `yelenLiu/personal-site`.
Build command: `npm run build`. Output: `dist`.

On the first deployment Cloudflare assigns a `*.pages.dev` domain. Set `SITE_URL` to that exact production origin (no trailing slash) in Cloudflare environment variables, redeploy, then verify canonical URLs, sitemap, article page and RSS.

The fallback `https://example.com` is for local development only, not for a final public deployment.

## Writing

Add Markdown articles in `src/content/writing/`, with frontmatter `title`, `description`, `date`, `category`; optionally `draft: true` to hide unfinished posts.

The personal-context project is a private, unvalidated experiment. Do not upload personal notes or claim that it has been released.