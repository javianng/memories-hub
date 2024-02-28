import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const coreMemoryRouter = createTRPCRouter({
  // data retrieval
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.coreMemory.findMany({
      orderBy: {
        date: "desc",
      },
      include: { CoreMemoryComponent: true },
    });
  }),

  getLatest: publicProcedure.query(({ ctx }) => {
    return ctx.db.coreMemory.findFirst({
      orderBy: { date: "desc" },
    });
  }),

  getUpcoming: publicProcedure.query(async ({ ctx }) => {
    const today = new Date();
    const futureCoreMemory = await ctx.db.coreMemory.findMany({
      where: {
        date: {
          gt: today,
        },
      },
    });
    return futureCoreMemory;
  }),

  getFour: publicProcedure.query(async ({ ctx }) => {
    const today = new Date();
    const pastCoreMemory = await ctx.db.coreMemory.findMany({
      where: {
        date: {
          lt: today,
        },
      },
      include: { CoreMemoryComponent: true },
      orderBy: {
        date: "desc",
      },
      take: 4,
    });
    return pastCoreMemory;
  }),

  readByTitle: publicProcedure
    .input(
      z.object({
        idx: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const coreMemory = await ctx.db.coreMemory.findUnique({
        where: {
          idx: input.idx,
        },
        include: { CoreMemoryComponent: true },
      });
      if (!coreMemory) {
        throw new Error("CoreMemory not found");
      }
      return coreMemory;
    }),

  // data mutation
  createCoreMemory: publicProcedure
    .input(
      z.object({
        title: z.string(),
        date: z.date(),
        subtitle: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const newCoreMemory = await ctx.db.coreMemory.create({
        data: {
          title: input.title,
          date: input.date,
          subtitle: input.subtitle,
        },
      });
      return newCoreMemory;
    }),
});
