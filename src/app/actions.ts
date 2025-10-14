// src/app/actions.ts

'use server';

import { Resend } from 'resend';
import { z } from 'zod';
import nodemailer from 'nodemailer';

// NOTE: We are no longer initializing Resend here.

export async function handleContactForm(formData: FormData) {
  // Retrieve the form data
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const phone = formData.get('phone') as string;
  const message = formData.get('message') as string;

  // --- NEW: Initialize Resend inside the function ---
  // It will now check for the API key only when the form is submitted.
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("CRITICAL: RESEND_API_KEY environment variable is not set.");
    return { error: 'Server configuration error. Could not send message.' };
  }
  const resend = new Resend(apiKey);
  // --- END OF NEW CODE ---


  try {
    const { data, error } = await resend.emails.send({
      from: 'Contact Form <onboarding@resend.dev>',
      to: ['prasannareddy771@gmail.com'],
      subject: `New Message from ${name} via Contact Form`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
        <hr>
        <h3>Message:</h3>
        <p>${message}</p>
      `,
    });

    if (error) {
      console.error({ error });
      return { error: 'Failed to send message.' };
    }

    return { success: 'Message sent successfully!' };

  } catch (exception) {
    console.error(exception);
    return { error: 'An unexpected error occurred.' };
  }
}















// Define the structure of the form data
const applySchema = z.object({
  name: z.string().min(2, "Name is required."),
  email: z.string().email("Invalid email address."),
  phone: z.string().min(10, "Phone number is required."),
  jobTitle: z.string(),
  resume: z.instanceof(File),
});

export type FormState = {
  message: string;
  success: boolean;
};

export async function handleApplyForm(prevState: FormState, formData: FormData): Promise<FormState> {
  // Validate form data
  const validatedFields = applySchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    phone: formData.get('phone'),
    jobTitle: formData.get('jobTitle'),
    resume: formData.get('resume'),
  });

  if (!validatedFields.success) {
    return {
      message: "Please fill all required fields correctly.",
      success: false,
    };
  }

  const { name, email, phone, jobTitle, resume } = validatedFields.data;

  // IMPORTANT: Set up your email transporter
  // Use environment variables for security
  const transporter = nodemailer.createTransport({
    service: 'gmail', // or another email service
    auth: {
      user: process.env.EMAIL_USER, // Your email address
      pass: process.env.EMAIL_PASS, // Your email app password
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: "prasannareddy771@gmail.com", // The email where you'll receive applications
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
        content: Buffer.from(await resume.arrayBuffer()),
      },
    ],
  };

  try {
    await transporter.sendMail(mailOptions);
    return { message: "Submitted successfully", success: true };
  } catch (error) {
    console.error("Failed to send email:", error);
    return { message: "Failed to submit application. Please try again.", success: false };
  }
}