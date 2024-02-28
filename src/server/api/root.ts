import { createTRPCRouter } from "~/server/api/trpc";
import { dateRequestRouter } from "./routers/dateRequestRouter";
import { timelineItemRouter } from "./routers/timelineItemRouter";
import { coreMemoryComponentRouter } from "./routers/coreMemoryComponentRouter";
import { coreMemoryRouter } from "./routers/coreMemoryRouter";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  daterequest: dateRequestRouter,
  timelineitem: timelineItemRouter,
  coreMemory: coreMemoryRouter,
  coreMemoryComponent: coreMemoryComponentRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
