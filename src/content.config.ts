import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
export const collections = {
  writing: defineCollection({
    loader: glob({ pattern: '*.md', base: './src/content/writing' }),
    schema: z.object({
      title: z.string().min(1),
      description: z.string().min(1),
      date: z.coerce.date(),
      category: z.string().optional(),
      draft: z.boolean().optional(),
    }),
  }),
};
