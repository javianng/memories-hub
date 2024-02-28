import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

type DateRequestType = {
  idx: string;
  title: string | null;
  date: Date;
  description: string | null;
  timelineitems: TimelineItemType[];
};

export type TimelineItemType = {
  idx: string;
  title: string | null;
  description: string | null;
  logo: string | null;
  datetime: Date;
};

export const dateRequestRouter = createTRPCRouter({
  // data retrieval
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.dateRequest.findMany({
      orderBy: {
        date: "desc",
      },
    });
  }),

  getLatest: publicProcedure.query(({ ctx }) => {
    return ctx.db.dateRequest.findFirst({
      orderBy: { date: "desc" },
    });
  }),

  getUpcoming: publicProcedure.query(async ({ ctx }) => {
    const today = new Date();
    const futureDateRequests = await ctx.db.dateRequest.findMany({
      where: {
        date: {
          gt: today,
        },
      },
    });
    return futureDateRequests;
  }),

  getPastTwo: publicProcedure.query(async ({ ctx }) => {
    const today = new Date();
    const pastDateRequests = await ctx.db.dateRequest.findMany({
      where: {
        date: {
          lt: today,
        },
      },
      orderBy: {
        date: "desc",
      },
      take: 2,
    });
    return pastDateRequests;
  }),

  readByTitle: publicProcedure
    .input(
      z.object({
        idx: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const dateRequest = await ctx.db.dateRequest.findUnique({
        where: {
          idx: input.idx,
        },
        include: {
          timelineitems: {
            orderBy: {
              datetime: "asc", // Assuming the field name for time is 'time', replace it with the actual field name if it's different
            },
          },
        },
      });
      if (!dateRequest) {
        throw new Error("DateRequest not found");
      }
      return dateRequest as DateRequestType;
    }),

  // data mutation
  approveDateRequest: publicProcedure
    .input(
      z.object({
        idx: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const updatedDateRequest = await ctx.db.dateRequest.update({
          where: {
            idx: input.idx,
          },
          data: { approved: true },
        });
        return updatedDateRequest;
      } catch (error) {
        console.error("Error approving date request:", error);
        throw error;
      }
    }),

  createDateRequest: publicProcedure
    .input(
      z.object({
        title: z.string(),
        date: z.date(),
        description: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const newDateRequest = await ctx.db.dateRequest.create({
        data: {
          title: input.title,
          date: input.date,
          description: input.description,
        },
      });
      return newDateRequest;
    }),
});
