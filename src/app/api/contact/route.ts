import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  try {
    const data = await req.json();

    // Create a transporter using Gmail SMTP
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER || 'neovisionhc@gmail.com', // Replace with sender email
        pass: process.env.EMAIL_PASS, // App Password for Gmail
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER || 'neovisionhc@gmail.com',
      to: 'neovisionhc@gmail.com',
      subject: `New B2B Inquiry from ${data.orgName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 10px;">
          <h2 style="color: #003e7a; margin-top: 0;">New Partnership Inquiry</h2>
          <p>You have received a new inquiry from the NeoVision Health Care website contact form.</p>
          <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; border-bottom: 1px solid #f1f5f9; color: #64748b;"><strong>Organization Name:</strong></td>
              <td style="padding: 8px 0; border-bottom: 1px solid #f1f5f9; color: #0f172a;">${data.orgName}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; border-bottom: 1px solid #f1f5f9; color: #64748b;"><strong>Contact Name:</strong></td>
              <td style="padding: 8px 0; border-bottom: 1px solid #f1f5f9; color: #0f172a;">${data.contactName}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; border-bottom: 1px solid #f1f5f9; color: #64748b;"><strong>Email Address:</strong></td>
              <td style="padding: 8px 0; border-bottom: 1px solid #f1f5f9; color: #003e7a;"><a href="mailto:${data.email}">${data.email}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px 0; border-bottom: 1px solid #f1f5f9; color: #64748b;"><strong>Phone Number:</strong></td>
              <td style="padding: 8px 0; border-bottom: 1px solid #f1f5f9; color: #0f172a;">${data.phone || 'N/A'}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; border-bottom: 1px solid #f1f5f9; color: #64748b;"><strong>Inquiry Type:</strong></td>
              <td style="padding: 8px 0; border-bottom: 1px solid #f1f5f9; color: #0f172a;">${data.inquiryType}</td>
            </tr>
          </table>
          <h4 style="color: #64748b; margin-top: 20px; margin-bottom: 10px;">Message:</h4>
          <div style="background-color: #f8fafc; padding: 15px; border-radius: 8px; color: #334155; line-height: 1.6;">
            ${data.message.replace(/\n/g, '<br/>')}
          </div>
          <p style="color: #94a3b8; font-size: 12px; margin-top: 30px; text-align: center;">
            This email was sent automatically from the NeoVision Health Care website.
          </p>
        </div>
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true, message: 'Message sent successfully!' });
  } catch (error) {
    console.error('Email send error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to send message. Please try again later.' },
      { status: 500 }
    );
  }
}
