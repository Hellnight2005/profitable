import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: NextRequest) {
    try {
        const { name, email, subject, message } = await req.json();

        if (!name || !email || !subject || !message) {
            return NextResponse.json({ error: 'All fields are required.' }, { status: 400 });
        }

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.GMAIL_USER,
                pass: process.env.GMAIL_APP_PASSWORD,
            },
        });

        await transporter.sendMail({
            from: `"Portfolio Contact" <${process.env.GMAIL_USER}>`,
            to: "abhijeet2005shinde@gmail.com",
            replyTo: email,
            subject: `New Portfolio Inquiry: ${subject}`,
            html: `
  <div style="font-family: Arial, Helvetica, sans-serif; background:#f6f7f9; padding:30px;">
    
    <div style="max-width:620px; margin:auto; background:#ffffff; border:1px solid #e5e7eb; border-radius:8px; padding:28px;">
      
      <h2 style="margin-top:0; color:#111;">New Message From Your Portfolio</h2>
      <p style="color:#555; font-size:14px;">
        Someone contacted you through your portfolio website. Details are below.
      </p>

      <div style="background:#fafafa; border:1px solid #eee; padding:16px; border-radius:6px; margin-top:20px;">
        
        <p style="margin:6px 0;"><strong>Name:</strong> ${name}</p>
        
        <p style="margin:6px 0;">
          <strong>Email:</strong> 
          <a href="mailto:${email}" style="color:#2563eb; text-decoration:none;">
            ${email}
          </a>
        </p>

        <p style="margin:6px 0;"><strong>Subject / Goal:</strong> ${subject}</p>

      </div>

      <div style="margin-top:24px;">
        <p style="font-weight:bold; margin-bottom:10px;">Message</p>
        <p style="color:#333; line-height:1.6; white-space:pre-wrap; background:#fafafa; padding:16px; border-radius:6px; border:1px solid #eee;">
          ${message}
        </p>
      </div>

      <div style="margin-top:28px;">
        <a href="mailto:${email}" 
           style="display:inline-block; padding:10px 18px; background:#2563eb; color:#fff; text-decoration:none; border-radius:6px; font-size:14px;">
           Reply to ${name}
        </a>
      </div>

      <p style="font-size:12px; color:#888; margin-top:24px;">
        This email was automatically sent from your portfolio contact form.
      </p>

    </div>
  </div>
  `,
        });

        return NextResponse.json({ success: true });
    } catch (err) {
        console.error('[contact API]', err);
        return NextResponse.json({ error: 'Failed to send message. Please try again.' }, { status: 500 });
    }
}
