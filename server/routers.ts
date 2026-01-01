import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { z } from "zod";
import * as db from "./db";
import { sendEmail, getApplicationStatusChangeEmail, getEventRegistrationConfirmationEmail, getContactConfirmationEmail, getContactNotificationEmail } from "./notifications";

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
        const registration = await db.createEventRegistration({
          userId: ctx.user.id,
          ...input,
        });
        
        // Get event details for confirmation email
        const event = await db.getEventById(input.eventId);
        
        if (event && ctx.user.email) {
          // Send confirmation email
          const emailContent = getEventRegistrationConfirmationEmail(
            ctx.user.name || 'المستفيد',
            event.title,
            new Date(event.startDate).toLocaleDateString('ar-SA', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            }),
            new Date(event.startDate).toLocaleTimeString('ar-SA', {
              hour: '2-digit',
              minute: '2-digit'
            }),
            event.location
          );
          
          await sendEmail({
            to: ctx.user.email,
            subject: emailContent.subject,
            text: '',
            html: emailContent.html
          });
        }
        
        return registration;
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

  // Contact form
  contact: router({
    submit: publicProcedure
      .input(z.object({
        name: z.string().min(3),
        email: z.string().email(),
        phone: z.string().min(10),
        subject: z.string().min(1),
        message: z.string().min(10),
      }))
      .mutation(async ({ input }) => {
        // Send confirmation email to user
        const userEmailContent = getContactConfirmationEmail(
          input.name,
          input.subject
        );
        
        if (input.email) {
          await sendEmail({
            to: input.email,
            subject: userEmailContent.subject,
            text: '',
            html: userEmailContent.html
          });
        }
        
        // Send notification email to admin
        const adminEmailContent = getContactNotificationEmail(
          input.name,
          input.email,
          input.phone,
          input.subject,
          input.message
        );
        
        // In production, send to actual admin email
        console.log('[Admin Notification]', adminEmailContent);
        
        return { success: true };
      }),
  }),

  // Resources routes
  resources: router({
    list: publicProcedure.query(async () => {
      return await db.getPublicResources();
    }),
    upload: protectedProcedure
      .input(z.object({
        fileData: z.string(), // base64 data URL
        fileName: z.string(),
        resourceType: z.enum(['document', 'video']),
      }))
      .mutation(async ({ ctx, input }) => {
        const { uploadFile, parseDataUrl, validateFileType, validateFileSize, ALLOWED_DOCUMENT_TYPES, ALLOWED_VIDEO_TYPES, MAX_DOCUMENT_SIZE, MAX_VIDEO_SIZE } = await import('./upload-helper.js');
        
        // Parse data URL
        const { buffer, contentType } = parseDataUrl(input.fileData);
        
        // Validate file type
        const allowedTypes = input.resourceType === 'document' ? ALLOWED_DOCUMENT_TYPES : ALLOWED_VIDEO_TYPES;
        if (!validateFileType(contentType, allowedTypes)) {
          throw new Error('نوع الملف غير مدعوم');
        }
        
        // Validate file size
        const maxSize = input.resourceType === 'document' ? MAX_DOCUMENT_SIZE : MAX_VIDEO_SIZE;
        if (!validateFileSize(buffer.length, maxSize)) {
          throw new Error('حجم الملف كبير جداً');
        }
        
        // Upload to S3
        const result = await uploadFile(buffer, input.fileName, contentType);
        return result;
      }),
    create: protectedProcedure
      .input(z.object({
        title: z.string(),
        description: z.string(),
        resourceType: z.enum(['document', 'video', 'link']),
        category: z.enum(['geospatial', 'business', 'technical', 'legal', 'marketing']),
        url: z.string(),
        fileUrl: z.string().optional(),
        thumbnailUrl: z.string().optional(),
        tags: z.array(z.string()).optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        const resource = await db.createResource({
          ...input,
          tags: input.tags?.join(','),
        });
        
        // Send notifications to users interested in this category
        const { sendResourceNotification } = await import('./notifications.js');
        await sendResourceNotification(resource);
        
        return resource;
      }),
    rate: protectedProcedure
      .input(z.object({
        resourceId: z.number(),
        rating: z.number().min(1).max(5),
        comment: z.string().optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        const db = await import('./db.js');
        return await db.rateResource({
          resourceId: input.resourceId,
          userId: ctx.user.id,
          rating: input.rating,
          comment: input.comment,
        });
      }),
    getRatings: publicProcedure
      .input(z.object({ resourceId: z.number() }))
      .query(async ({ input }) => {
        const db = await import('./db.js');
        return await db.getResourceRatings(input.resourceId);
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

  // Chat routes for mentor dashboard
  chat: router({
    getConversations: protectedProcedure.query(async ({ ctx }) => {
      // Mock data for now - in production, fetch from database
      return [
        {
          id: 1,
          userId: 2,
          userName: 'أحمد السعيد',
          userEmail: 'ahmed@example.com',
          lastMessage: 'شكراً على المساعدة في المشروع',
          lastMessageAt: new Date(),
          unreadCount: 2,
          status: 'active' as const,
          isOnline: true,
        },
        {
          id: 2,
          userId: 3,
          userName: 'نورة المطيري',
          userEmail: 'noura@example.com',
          lastMessage: 'متى يمكنني البدء في البرنامج؟',
          lastMessageAt: new Date(Date.now() - 3600000),
          unreadCount: 0,
          status: 'active' as const,
          isOnline: false,
        },
        {
          id: 3,
          userId: 4,
          userName: 'خالد الدوسري',
          userEmail: 'khaled@example.com',
          lastMessage: 'هل يمكن مراجعة خطة العمل؟',
          lastMessageAt: new Date(Date.now() - 7200000),
          unreadCount: 1,
          status: 'active' as const,
          isOnline: true,
        },
      ];
    }),
    getDailyStats: protectedProcedure.query(async ({ ctx }) => {
      // Mock data for now - in production, calculate from database
      const stats = [];
      for (let i = 6; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        stats.push({
          date: date.toISOString(),
          messageCount: Math.floor(Math.random() * 50) + 10,
          conversationCount: Math.floor(Math.random() * 10) + 3,
          responseTime: Math.floor(Math.random() * 30) + 5,
        });
      }
      return stats;
    }),
  }),
});

export type AppRouter = typeof appRouter;
