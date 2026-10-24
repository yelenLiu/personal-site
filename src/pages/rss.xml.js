import rss from '@astrojs/rss';
export async function GET(context) {
  const posts = import.meta.glob('../content/writing/*.md', { eager: true });
  return rss({
    title: 'Yelen — Writing',
    description: 'Experiments in AI agents, developer tools, and independent building.',
    site: context.site,
    items: Object.entries(posts).filter(([, post]) => post.frontmatter.draft !== true).map(([path, post]) => ({
      title: post.frontmatter.title,
      description: post.frontmatter.description,
      pubDate: new Date(post.frontmatter.date),
      link: `/writing/${path.split('/').pop().replace(/\.md$/, '')}/`,
    })),
  });
}