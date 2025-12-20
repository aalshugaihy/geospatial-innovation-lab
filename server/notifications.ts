/**
 * Notification Service
 * Handles email and SMS notifications
 * 
 * Note: This is a template implementation. To use in production:
 * 1. Sign up for SendGrid/Mailgun for email
 * 2. Sign up for Twilio for SMS
 * 3. Add API keys to environment variables
 * 4. Install required packages: pnpm add @sendgrid/mail twilio
 */

interface EmailOptions {
  to: string;
  subject: string;
  text: string;
  html?: string;
}

interface SMSOptions {
  to: string;
  message: string;
}

/**
 * Send email notification
 * Template implementation - replace with actual SendGrid/Mailgun integration
 */
export async function sendEmail(options: EmailOptions): Promise<boolean> {
  console.log('[Email Notification]', {
    to: options.to,
    subject: options.subject,
    preview: options.text.substring(0, 50) + '...',
  });

  // TODO: Implement actual email sending
  // Example with SendGrid:
  /*
  const sgMail = require('@sendgrid/mail');
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  
  await sgMail.send({
    to: options.to,
    from: process.env.FROM_EMAIL,
    subject: options.subject,
    text: options.text,
    html: options.html,
  });
  */

  return true;
}

/**
 * Send SMS notification
 * Template implementation - replace with actual Twilio integration
 */
export async function sendSMS(options: SMSOptions): Promise<boolean> {
  console.log('[SMS Notification]', {
    to: options.to,
    preview: options.message.substring(0, 50) + '...',
  });

  // TODO: Implement actual SMS sending
  // Example with Twilio:
  /*
  const twilio = require('twilio');
  const client = twilio(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN
  );
  
  await client.messages.create({
    body: options.message,
    from: process.env.TWILIO_PHONE_NUMBER,
    to: options.to,
  });
  */

  return true;
}

/**
 * Notification templates
 */

export function getApplicationStatusChangeEmail(
  userName: string,
  projectName: string,
  status: string,
  reviewNotes?: string
): EmailOptions {
  const statusLabels: Record<string, string> = {
    submitted: 'تم استلام طلبك',
    under_review: 'طلبك قيد المراجعة',
    accepted: 'تم قبول طلبك',
    rejected: 'نأسف، لم يتم قبول طلبك',
    in_progress: 'طلبك قيد التنفيذ',
    completed: 'تم إكمال طلبك',
  };

  const subject = `معمل الابتكار الجيومكاني - ${statusLabels[status] || 'تحديث حالة الطلب'}`;
  
  const text = `
مرحباً ${userName},

${statusLabels[status] || 'تم تحديث حالة طلبك'}

المشروع: ${projectName}
الحالة الجديدة: ${statusLabels[status] || status}

${reviewNotes ? `ملاحظات المراجعة:\n${reviewNotes}\n` : ''}

يمكنك متابعة حالة طلبك من خلال لوحة المعلومات الخاصة بك.

مع تحياتنا،
فريق معمل الابتكار الجيومكاني
  `.trim();

  const html = `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; direction: rtl;">
      <div style="background: linear-gradient(135deg, #002937 0%, #14BEC3 100%); padding: 30px; text-align: center;">
        <h1 style="color: white; margin: 0;">معمل الابتكار الجيومكاني</h1>
      </div>
      <div style="padding: 30px; background: #f9fafb;">
        <p style="font-size: 18px; color: #1f2937;">مرحباً ${userName},</p>
        <p style="font-size: 16px; color: #374151; line-height: 1.6;">
          ${statusLabels[status] || 'تم تحديث حالة طلبك'}
        </p>
        <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-right: 4px solid #46C18F;">
          <p style="margin: 0; color: #6b7280; font-size: 14px;">المشروع</p>
          <p style="margin: 5px 0 15px 0; color: #1f2937; font-size: 16px; font-weight: bold;">${projectName}</p>
          <p style="margin: 0; color: #6b7280; font-size: 14px;">الحالة الجديدة</p>
          <p style="margin: 5px 0 0 0; color: #46C18F; font-size: 16px; font-weight: bold;">${statusLabels[status] || status}</p>
        </div>
        ${reviewNotes ? `
        <div style="background: #fef3c7; padding: 15px; border-radius: 8px; margin: 20px 0;">
          <p style="margin: 0 0 10px 0; color: #92400e; font-weight: bold;">ملاحظات المراجعة:</p>
          <p style="margin: 0; color: #78350f; line-height: 1.6;">${reviewNotes}</p>
        </div>
        ` : ''}
        <p style="font-size: 14px; color: #6b7280; margin-top: 30px;">
          يمكنك متابعة حالة طلبك من خلال لوحة المعلومات الخاصة بك.
        </p>
      </div>
      <div style="background: #1f2937; padding: 20px; text-align: center;">
        <p style="color: #9ca3af; margin: 0; font-size: 14px;">
          مع تحياتنا، فريق معمل الابتكار الجيومكاني
        </p>
      </div>
    </div>
  `;

  return {
    to: '', // Will be filled by caller
    subject,
    text,
    html,
  };
}

export function getSessionReminderEmail(
  userName: string,
  mentorName: string,
  sessionDate: Date,
  location: string
): EmailOptions {
  const subject = 'تذكير: جلسة إرشادية قادمة';
  
  const dateStr = sessionDate.toLocaleDateString('ar-SA', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  
  const timeStr = sessionDate.toLocaleTimeString('ar-SA', {
    hour: '2-digit',
    minute: '2-digit',
  });

  const text = `
مرحباً ${userName},

تذكير بجلستك الإرشادية القادمة:

المرشد: ${mentorName}
التاريخ: ${dateStr}
الوقت: ${timeStr}
الموقع: ${location}

يرجى التأكد من حضورك في الموعد المحدد.

مع تحياتنا،
فريق معمل الابتكار الجيومكاني
  `.trim();

  const html = `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; direction: rtl;">
      <div style="background: linear-gradient(135deg, #002937 0%, #14BEC3 100%); padding: 30px; text-align: center;">
        <h1 style="color: white; margin: 0;">تذكير بجلسة إرشادية</h1>
      </div>
      <div style="padding: 30px; background: #f9fafb;">
        <p style="font-size: 18px; color: #1f2937;">مرحباً ${userName},</p>
        <p style="font-size: 16px; color: #374151;">لديك جلسة إرشادية قادمة:</p>
        <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-right: 4px solid #14BEC3;">
          <p style="margin: 0; color: #6b7280; font-size: 14px;">المرشد</p>
          <p style="margin: 5px 0 15px 0; color: #1f2937; font-size: 16px; font-weight: bold;">${mentorName}</p>
          <p style="margin: 0; color: #6b7280; font-size: 14px;">التاريخ والوقت</p>
          <p style="margin: 5px 0 15px 0; color: #1f2937; font-size: 16px; font-weight: bold;">${dateStr} - ${timeStr}</p>
          <p style="margin: 0; color: #6b7280; font-size: 14px;">الموقع</p>
          <p style="margin: 5px 0 0 0; color: #1f2937; font-size: 16px;">${location}</p>
        </div>
        <p style="font-size: 14px; color: #6b7280;">
          يرجى التأكد من حضورك في الموعد المحدد.
        </p>
      </div>
      <div style="background: #1f2937; padding: 20px; text-align: center;">
        <p style="color: #9ca3af; margin: 0; font-size: 14px;">
          مع تحياتنا، فريق معمل الابتكار الجيومكاني
        </p>
      </div>
    </div>
  `;

  return {
    to: '',
    subject,
    text,
    html,
  };
}

export async function sendResourceNotification(resource: any) {
  // In a real implementation, this would:
  // 1. Query users who have subscribed to this resource category
  // 2. Send email notifications to those users
  // For now, we'll just log it
  console.log(`[Notification] New resource published: ${resource.title} in category ${resource.category}`);
  
  // TODO: Implement actual notification logic
  /*
  const interestedUsers = await db.getUsersByCategory(resource.category);
  for (const user of interestedUsers) {
    const email = getNewResourceEmail(user.name, resource.title, resource.category);
    await sendEmail({ ...email, to: user.email });
  }
  */
}

export function getEventRegistrationConfirmationEmail(
  userName: string,
  eventTitle: string,
  eventDate: string,
  eventTime: string,
  eventLocation: string
) {
  const subject = `تأكيد التسجيل في ${eventTitle}`;
  
  const text = `
مرحباً ${userName},

تم تسجيلك بنجاح في الفعالية التالية:

اسم الفعالية: ${eventTitle}
التاريخ: ${eventDate}
الوقت: ${eventTime}
الموقع: ${eventLocation}

نتطلع لرؤيتك في الفعالية!

مع تحياتنا،
فريق معمل الابتكار الجيومكاني
  `.trim();

  const html = `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; direction: rtl;">
      <div style="background: linear-gradient(135deg, #002937 0%, #14BEC3 100%); padding: 30px; text-align: center;">
        <h1 style="color: white; margin: 0;">تأكيد التسجيل في الفعالية</h1>
      </div>
      <div style="padding: 30px; background: #f9fafb;">
        <p style="font-size: 18px; color: #1f2937;">مرحباً ${userName},</p>
        <p style="font-size: 16px; color: #374151; line-height: 1.6;">
          تم تسجيلك بنجاح في الفعالية! نحن متحمسون لرؤيتك.
        </p>
        <div style="background: white; padding: 25px; border-radius: 12px; margin: 25px 0; border-right: 4px solid #46C18F; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
          <p style="margin: 0; color: #6b7280; font-size: 14px;">اسم الفعالية</p>
          <p style="margin: 5px 0 20px 0; color: #1f2937; font-size: 20px; font-weight: bold;">${eventTitle}</p>
          
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-top: 20px;">
            <div>
              <p style="margin: 0; color: #6b7280; font-size: 14px;">📅 التاريخ</p>
              <p style="margin: 5px 0 0 0; color: #1f2937; font-size: 16px; font-weight: 600;">${eventDate}</p>
            </div>
            <div>
              <p style="margin: 0; color: #6b7280; font-size: 14px;">🕐 الوقت</p>
              <p style="margin: 5px 0 0 0; color: #1f2937; font-size: 16px; font-weight: 600;">${eventTime}</p>
            </div>
          </div>
          
          <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
            <p style="margin: 0; color: #6b7280; font-size: 14px;">📍 الموقع</p>
            <p style="margin: 5px 0 0 0; color: #1f2937; font-size: 16px;">${eventLocation}</p>
          </div>
        </div>
        
        <div style="background: #dcfce7; padding: 20px; border-radius: 8px; margin: 20px 0; border: 1px solid #86efac;">
          <p style="margin: 0; color: #166534; font-size: 14px; line-height: 1.6;">
            ✅ تم إرسال تأكيد التسجيل إلى بريدك الإلكتروني. يرجى الاحتفاظ بهذه الرسالة للرجوع إليها.
          </p>
        </div>
        
        <p style="font-size: 14px; color: #6b7280; margin-top: 30px; line-height: 1.6;">
          إذا كان لديك أي استفسارات أو تحتاج إلى إلغاء التسجيل، يرجى التواصل معنا.
        </p>
      </div>
      <div style="background: #1f2937; padding: 20px; text-align: center;">
        <p style="color: #9ca3af; margin: 0; font-size: 14px;">
          نتطلع لرؤيتك! 🎉<br>
          فريق معمل الابتكار الجيومكاني
        </p>
      </div>
    </div>
  `;

  return {
    subject,
    html,
  };
}

export function getSessionReminderSMS(
  mentorName: string,
  sessionDate: Date
): SMSOptions {
  const dateStr = sessionDate.toLocaleDateString('ar-SA', {
    month: 'numeric',
    day: 'numeric',
  });
  
  const timeStr = sessionDate.toLocaleTimeString('ar-SA', {
    hour: '2-digit',
    minute: '2-digit',
  });

  return {
    to: '',
    message: `تذكير: لديك جلسة إرشادية مع ${mentorName} يوم ${dateStr} الساعة ${timeStr}. معمل الابتكار الجيومكاني`,
  };
}
