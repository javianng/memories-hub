import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const coreMemoryComponentRouter = createTRPCRouter({
  // data mutation
  createCoreMemoryComponent: publicProcedure
    .input(
      z.object({
        coreMemoryIdx: z.string(),
        title: z.string().nullable(),
        description: z.string().nullable(),
        image: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const newCoreMemoryComponent = await ctx.db.coreMemoryComponent.create({
        data: {
          coreMemoryIdx: input.coreMemoryIdx,
          title: input.title,
          description: input.description,
          image: input.image,
        },
      });
      return newCoreMemoryComponent;
    }),
});
