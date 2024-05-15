import { sendMail } from '@/libs/mailer';
import type { NextApiRequest, NextApiResponse } from 'next';


interface VendorFormData {
  name: string;
  email: string;
  phone: string;
  address: string;
  description: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    res.status(405).json({ message: 'Method Not Allowed' });
    return;
  }

  const { name, email, phone, address, description } = req.body as VendorFormData;

  // Prepare the email content
  const subject = 'New Vendor Registration';
  const toEmail = process.env.ADMIN_EMAIL || 'your-email@example.com';
  const emailText = `
    Name: ${name}
    Email: ${email}
    Phone: ${phone}
    Address: ${address}
    Description: ${description}
  `;

  try {
    // Send the email
    const result = await sendMail({
      from: process.env.NODEMAILER_EMAIL || 'your-email@example.com',
      to: toEmail,
      subject,
      text: emailText,
    });

    if (result) {
      console.log('Email sent successfully');
      res.status(200).json({ message: 'Vendor details sent successfully' });
    } else {
      console.error('Failed to send email');
      res.status(500).json({ message: 'Failed to send vendor details' });
    }
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ message: 'Failed to send vendor details' });
  }
}