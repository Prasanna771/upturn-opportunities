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















