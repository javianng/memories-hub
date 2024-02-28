import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const timelineItemRouter = createTRPCRouter({
  // data mutation
  createTimelineItem: publicProcedure
    .input(
      z.object({
        dateRequestIdx: z.string(),
        title: z.string(),
        description: z.string(),
        logo: z.string().nullable(),
        datetime: z.date(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const newTimelineItem = await ctx.db.timelineItem.create({
        data: {
          title: input.title,
          description: input.description,
          logo: input.logo,
          datetime: input.datetime,
          dateRequestIdx: input.dateRequestIdx,
        },
      });
      return newTimelineItem;
    }),
});
