import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendLeadNotification(
  name: string,
  email: string,
  message: string
) {
  try {
    const result = await resend.emails.send({
      from: 'noreply@techai.pk',
      to: process.env.ADMIN_EMAIL || 'admin@techai.pk',
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
        <hr>
        <p><a href="${process.env.NEXTAUTH_URL}/dashboard/leads">View in Dashboard</a></p>
      `,
    });

    return result;
  } catch (error) {
    console.error('Failed to send email:', error);
    throw error;
  }
}

export async function sendWelcomeEmail(email: string, name: string) {
  try {
    const result = await resend.emails.send({
      from: 'noreply@techai.pk',
      to: email,
      subject: 'Thank you for reaching out!',
      html: `
        <h2>Hi ${name},</h2>
        <p>Thank you for contacting me. I've received your message and will get back to you as soon as possible.</p>
        <p>Best regards,<br>Abdul Wahab</p>
      `,
    });

    return result;
  } catch (error) {
    console.error('Failed to send welcome email:', error);
    throw error;
  }
}
