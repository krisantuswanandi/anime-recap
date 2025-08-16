import { defineContentConfig, defineCollection, z } from "@nuxt/content";

export default defineContentConfig({
  collections: {
    episodes: defineCollection({
      type: "page",
      source: "anime/**/episode-*.md",
      schema: z.object({
        airedDate: z.string(),
        episode: z.number(),
      }),
    }),
    animes: defineCollection({
      type: "page",
      source: "anime/**/index.md",
    }),
  },
});
