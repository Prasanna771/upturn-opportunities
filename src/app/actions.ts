'use server';

import { Resend } from 'resend';

// This is a shared state type for our forms
export interface FormState {
  success: boolean;
  message: string;
}

// --- UPDATED function for the Contact Form ---
export async function handleContactForm(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const phone = formData.get('phone') as string;
  const message = formData.get('message') as string;

  if (!name || !email || !phone || !message) {
    return { success: false, message: "Please fill out all required fields." };
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("CRITICAL: RESEND_API_KEY is not set.");
    return { success: false, message: 'Server configuration error.' };
  }
  const resend = new Resend(apiKey);

  try {
    const { data, error } = await resend.emails.send({
      from: 'Contact Form <onboarding@resend.dev>',
      to: ['prasannareddy771@gmail.com'],
      subject: `New Message from ${name} via Contact Form`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <hr>
        <h3>Message:</h3>
        <p>${message}</p>
      `,
    });

    if (error) {
      console.error({ error });
      return { success: false, message: 'Failed to send message.' };
    }

    return { success: true, message: 'Thank you for contacting us! We will get in touch with you shortly.' };

  } catch (exception) {
    console.error(exception);
    return { success: false, message: 'An unexpected error occurred.' };
  }
}

// --- NEW function for the Job Application Form ---
export async function handleJobApplication(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const phone = formData.get('phone') as string;
  const jobTitle = formData.get('jobTitle') as string;
  const resume = formData.get('resume') as File;

  if (!name || !email || !phone || !jobTitle || resume.size === 0) {
    return { success: false, message: 'Please fill out all required fields.' };
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("CRITICAL: RESEND_API_KEY environment variable is not set.");
    return { success: false, message: 'Server configuration error.' };
  }
  const resend = new Resend(apiKey);

  try {
    const resumeBuffer = Buffer.from(await resume.arrayBuffer());

    const { data, error } = await resend.emails.send({
      from: 'Job Application <onboarding@resend.dev>',
      to: ['prasannareddy771@gmail.com'],
      subject: `New Job Application for: ${jobTitle}`,
      html: `
        <h2>New Application Received</h2>
        <p><strong>Position:</strong> ${jobTitle}</p>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
      `,
      attachments: [
        {
          filename: resume.name,
          content: resumeBuffer,
        },
      ],
    });

    if (error) {
      console.error('Resend Error:', error);
      return { success: false, message: 'Failed to send application. Please try again.' };
    }

    return { success: true, message: "Application sent successfully!" };

  } catch (exception) {
    console.error('Server Error:', exception);
    return { success: false, message: 'An unexpected server error occurred.' };
  }
}