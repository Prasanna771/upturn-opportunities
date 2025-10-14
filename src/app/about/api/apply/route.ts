import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  const formData = await req.formData();
  const name = formData.get('name');
  const phone = formData.get('phone');
  const email = formData.get('email');
  const jobTitle = formData.get('jobTitle');
  const resume = formData.get('resume') as File | null;

  try {
    await resend.emails.send({
      from: 'Upturn Opportunities <no-reply@yourdomain.com>',
      to: 'prasannareddy771@gmail.com',
      subject: `New Job Application: ${jobTitle}`,
      html: `
        <h2>New Application for ${jobTitle}</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Email:</strong> ${email}</p>
      `,
      attachments: resume
        ? [{ filename: resume.name, content: Buffer.from(await resume.arrayBuffer()).toString('base64') }]
        : [],
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}















import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const phone = formData.get('phone') as string;
  const jobTitle = formData.get('jobTitle') as string;
  const resume = formData.get('resume') as File;

  if (!name || !email || !phone || !jobTitle || !resume) {
    return NextResponse.json({ error: 'Missing required fields.' }, { status: 400 });
  }

  // Convert resume file to buffer
  const resumeBuffer = Buffer.from(await resume.arrayBuffer());

  // Set up Nodemailer transporter
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // Email options
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: 'prasannareddy771@gmail.com', // Your receiving email
    subject: `New Job Application: ${jobTitle}`,
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
  };

  try {
    await transporter.sendMail(mailOptions);
    return NextResponse.json({ message: 'Application sent successfully!' }, { status: 200 });
  } catch (error) {
    console.error('Email sending error:', error);
    return NextResponse.json({ error: 'Failed to send application.' }, { status: 500 });
  }
}