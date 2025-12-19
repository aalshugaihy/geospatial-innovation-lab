import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { z } from "zod";
import * as db from "./db";
import { sendEmail, getApplicationStatusChangeEmail } from "./notifications";

export const appRouter = router({
    // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  // Application management
  applications: router({
    list: protectedProcedure.query(async ({ ctx }) => {
      return await db.getUserApplications(ctx.user.id);
    }),
    get: protectedProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ ctx, input }) => {
        return await db.getApplicationById(input.id, ctx.user.id);
      }),
    create: protectedProcedure
      .input(z.object({
        initiativeType: z.enum(["incubator", "accelerator", "hackathon", "bootcamp", "geosandbox"]),
        projectName: z.string().min(1),
        projectDescription: z.string().min(10),
        teamSize: z.number().optional(),
        expectedDuration: z.string().optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        return await db.createApplication({
          userId: ctx.user.id,
          ...input,
        });
      }),
    update: protectedProcedure
      .input(z.object({
        id: z.number(),
        projectName: z.string().optional(),
        projectDescription: z.string().optional(),
        teamSize: z.number().optional(),
        expectedDuration: z.string().optional(),
        status: z.enum(["draft", "submitted", "under_review", "accepted", "rejected", "in_progress", "completed", "withdrawn"]).optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        const { id, ...data } = input;
        await db.updateApplication(id, ctx.user.id, data);
        return { success: true };
      }),
    submit: protectedProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ ctx, input }) => {
        await db.updateApplication(input.id, ctx.user.id, {
          status: "submitted",
          submittedAt: new Date(),
        });
        return { success: true };
      }),
  }),

  // Mentoring sessions
  mentoring: router({
    list: protectedProcedure.query(async ({ ctx }) => {
      return await db.getUserMentoringSessions(ctx.user.id);
    }),
    schedule: protectedProcedure
      .input(z.object({
        applicationId: z.number().optional(),
        mentorName: z.string().min(1),
        mentorEmail: z.string().email().optional(),
        sessionType: z.enum(["consultation", "technical_review", "business_strategy", "pitch_practice", "general_guidance"]),
        scheduledAt: z.date(),
        duration: z.number().min(15),
        location: z.string().optional(),
        notes: z.string().optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        return await db.createMentoringSession({
          userId: ctx.user.id,
          ...input,
        });
      }),
    update: protectedProcedure
      .input(z.object({
        id: z.number(),
        status: z.enum(["scheduled", "confirmed", "completed", "cancelled", "rescheduled"]).optional(),
        scheduledAt: z.date().optional(),
        feedback: z.string().optional(),
        rating: z.number().min(1).max(5).optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        const { id, ...data } = input;
        await db.updateMentoringSession(id, ctx.user.id, data);
        return { success: true };
      }),
  }),

  // Events
  events: router({
    list: publicProcedure.query(async () => {
      return await db.getPublishedEvents();
    }),
    myRegistrations: protectedProcedure.query(async ({ ctx }) => {
      return await db.getUserEventRegistrations(ctx.user.id);
    }),
    register: protectedProcedure
      .input(z.object({
        eventId: z.number(),
        notes: z.string().optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        return await db.createEventRegistration({
          userId: ctx.user.id,
          ...input,
        });
      }),
  }),

  // Projects routes
  projects: router({
    list: protectedProcedure.query(async ({ ctx }) => {
      return await db.getUserProjects(ctx.user.id);
    }),
    updateStage: protectedProcedure
      .input(z.object({
        projectId: z.number(),
        stage: z.enum(['idea', 'development', 'testing', 'launch']),
      }))
      .mutation(async ({ ctx, input }) => {
        await db.updateProjectStage(input.projectId, input.stage, ctx.user.id);
        return { success: true };
      }),
  }),

  // Resources routes
  resources: router({
    list: publicProcedure.query(async () => {
      return await db.getPublicResources();
    }),
  }),

  // Admin routes
  admin: router({
    users: protectedProcedure.query(async ({ ctx }) => {
      if (ctx.user.role !== 'admin') {
        throw new Error('Unauthorized');
      }
      return await db.getAllUsers();
    }),
    updateUserRole: protectedProcedure
      .input(z.object({
        userId: z.number(),
        role: z.enum(['user', 'admin']),
      }))
      .mutation(async ({ ctx, input }) => {
        if (ctx.user.role !== 'admin') {
          throw new Error('Unauthorized');
        }
        await db.updateUserRole(input.userId, input.role);
        return { success: true };
      }),
    applications: protectedProcedure.query(async ({ ctx }) => {
      if (ctx.user.role !== 'admin') {
        throw new Error('Unauthorized');
      }
      return await db.getAllApplications();
    }),
    updateApplicationStatus: protectedProcedure
      .input(z.object({
        id: z.number(),
        status: z.string(),
        reviewNotes: z.string().optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        if (ctx.user.role !== 'admin') {
          throw new Error('Unauthorized');
        }
        
        // Update application status
        await db.updateApplicationStatus(input.id, input.status, input.reviewNotes);
        
        // Get application and user details for notification
        const application = await db.getApplicationById(input.id);
        if (application) {
          const user = await db.getUserById(application.userId);
          if (user && user.email) {
            // Send email notification
            const emailOptions = getApplicationStatusChangeEmail(
              user.name || 'المستخدم',
              application.projectName,
              input.status,
              input.reviewNotes
            );
            emailOptions.to = user.email;
            
            try {
              await sendEmail(emailOptions);
            } catch (error) {
              console.error('Failed to send notification email:', error);
              // Don't fail the mutation if email fails
            }
          }
        }
        
        return { success: true };
      }),
  }),
});

export type AppRouter = typeof appRouter;
