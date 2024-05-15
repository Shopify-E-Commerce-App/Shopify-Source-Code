import nodemailer from 'nodemailer';

interface MailOptions {
  from: string;
  to: string;
  subject: string;
  text: string;
}

export async function sendMail(options: MailOptions): Promise<boolean> {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.NODEMAILER_EMAIL,
      pass: process.env.NODEMAILER_PW,
    },
  });

  const mailOptions: nodemailer.SendMailOptions = {
    from: options.from,
    to: options.to,
    subject: options.subject,
    text: options.text,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email sent');
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
}