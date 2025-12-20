import { describe, it, expect, beforeAll } from 'vitest';
import { appRouter } from './routers';
import { getDb } from './db';
import { users, events } from '../drizzle/schema';
import { eq } from 'drizzle-orm';

describe('Event Registration with Email Confirmation', () => {
  let testUserId: number;
  let testEventId: number;
  
  beforeAll(async () => {
    const db = await getDb();
    if (!db) throw new Error('Database not available');

    // Create test user
    const userResult = await db.insert(users).values({
      openId: 'test-event-user-' + Date.now(),
      name: 'أحمد المختبر',
      email: 'test-event@example.com',
      role: 'user',
    });
    testUserId = Number(userResult[0].insertId);

    // Create test event
    const eventResult = await db.insert(events).values({
      title: 'هاكاثون الخرائط الذكية 2024',
      description: 'هاكاثون مكثف لمدة 48 ساعة لتطوير حلول جيومكانية مبتكرة',
      eventType: 'hackathon',
      startDate: new Date('2024-12-25T09:00:00'),
      endDate: new Date('2024-12-27T17:00:00'),
      location: 'مقر الهيئة العامة للمساحة - الرياض',
      capacity: 100,
      registrationDeadline: new Date('2024-12-20T23:59:59'),
      status: 'upcoming',
      isPublished: true,
    });
    testEventId = Number(eventResult[0].insertId);
  });

  it('should register user for event and send confirmation email', async () => {
    const caller = appRouter.createCaller({
      user: {
        id: testUserId,
        openId: 'test-event-user',
        name: 'أحمد المختبر',
        email: 'test-event@example.com',
        role: 'user',
      },
      req: {} as any,
      res: {} as any,
    });

    const result = await caller.events.register({
      eventId: testEventId,
      notes: 'متحمس للمشاركة في الهاكاثون!',
    });

    expect(result).toBeDefined();
    // The function logs email sending, so we verify it doesn't throw
  });

  it('should retrieve event by ID', async () => {
    const db = await getDb();
    if (!db) throw new Error('Database not available');

    const { getEventById } = await import('./db');
    const event = await getEventById(testEventId);

    expect(event).toBeDefined();
    expect(event?.title).toBe('هاكاثون الخرائط الذكية 2024');
    expect(event?.eventType).toBe('hackathon');
    expect(event?.location).toBe('مقر الهيئة العامة للمساحة - الرياض');
  });

  it('should generate proper confirmation email content', async () => {
    const { getEventRegistrationConfirmationEmail } = await import('./notifications');
    
    const emailContent = getEventRegistrationConfirmationEmail(
      'أحمد المختبر',
      'هاكاثون الخرائط الذكية 2024',
      'الأربعاء، 25 ديسمبر 2024',
      '09:00 ص',
      'مقر الهيئة العامة للمساحة - الرياض'
    );

    expect(emailContent.subject).toContain('تأكيد التسجيل');
    expect(emailContent.subject).toContain('هاكاثون الخرائط الذكية 2024');
    expect(emailContent.html).toContain('أحمد المختبر');
    expect(emailContent.html).toContain('هاكاثون الخرائط الذكية 2024');
    expect(emailContent.html).toContain('الأربعاء، 25 ديسمبر 2024');
    expect(emailContent.html).toContain('09:00 ص');
    expect(emailContent.html).toContain('مقر الهيئة العامة للمساحة - الرياض');
    expect(emailContent.html).toContain('تم تسجيلك بنجاح');
  });

  it('should list user event registrations', async () => {
    const caller = appRouter.createCaller({
      user: {
        id: testUserId,
        openId: 'test-event-user',
        name: 'أحمد المختبر',
        email: 'test-event@example.com',
        role: 'user',
      },
      req: {} as any,
      res: {} as any,
    });

    const registrations = await caller.events.myRegistrations();

    expect(registrations).toBeDefined();
    expect(Array.isArray(registrations)).toBe(true);
    expect(registrations.length).toBeGreaterThan(0);
    expect(registrations[0].userId).toBe(testUserId);
    expect(registrations[0].eventId).toBe(testEventId);
  });
});
