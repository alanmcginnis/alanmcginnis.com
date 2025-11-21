import { defineCollection, z } from "astro:content";

const experience = defineCollection({
  type: "content",
  schema: z.object({
    company: z.string(),
    role: z.string(),
    dateStart: z.coerce.date(),
    dateEnd: z.union([z.coerce.date(), z.string()]),
    featured: z.boolean().optional(),
    featuredDate: z.string().optional(),
    blurb: z.string().optional(),
  }),
});

const highlights = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    draft: z.boolean().optional(),
    image: z.string().optional(),
  }),
});

export const collections = { experience, highlights };

