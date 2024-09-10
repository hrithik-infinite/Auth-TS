import { Resend } from "resend";
const resend = new Resend(process.env.RESEND_API_KEY);
export const sendVerificationEmail = async (email: string, token: string, name: string) => {
  const confirmLink = `http://localhost:3000/auth/new-verification?token=${token}`;

  await resend.emails.send({
    from: "Auth Ts <onboarding@resend.dev>",
    to: email,
    subject: "Welcome to Auth TS! Activate Your Account Now",
    html: `
    <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Verify Your Account</title>
  <style>
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      background-color: #f9f9f9;
      margin: 0;
      padding: 0;
    }
    .email-container {
      max-width: 600px;
      margin: 20px auto;
      background-color: #ffffff;
      padding: 40px 30px;
      border-radius: 12px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      text-align: center;
    }
    h1 {
      color: #2c3e50;
      font-size: 24px;
      margin-bottom: 20px;
    }
    p {
      color: #7f8c8d;
      font-size: 16px;
      line-height: 1.6;
    }
    .btn {
      display: inline-block;
      padding: 14px 28px;
      background-color: #3498db;
      color: #ffffff;
      text-decoration: none;
      border-radius: 8px;
      font-weight: bold;
      font-size: 16px;
      margin: 20px 0;
      transition: background-color 0.3s ease;
    }
    .btn:hover {
      background-color: #2980b9;
    }
    .footer {
      margin-top: 40px;
      font-size: 12px;
      color: #bdc3c7;
    }
    .footer p {
      margin: 5px 0;
    }
    .footer a {
      color: #3498db;
      text-decoration: none;
    }
  </style>
</head>
<body>

  <div class="email-container">
    <h1>Welcome to Auth TS!</h1>
    <p>Hi ${name},</p>
    <p>We’re excited to have you on board! To start using Auth TS and to enjoy all the features, please confirm your email address by clicking the button below:</p>

    <p>
      <a href="${confirmLink}" class="btn">Verify My Account</a>
    </p>

    <p>If you did not sign up for an account, you can safely ignore this email, and no action will be taken.</p>

    <div class="footer">
      <p>&copy; 2024 Auth TS. All rights reserved.</p>
      <p>Developed by <strong>Hrithik Agarwal</strong>.</p>
      <p>Connect with me:</p>
      <p>
        <a href="https://linkedin.com/in/hrithikagarwal" target="_blank">LinkedIn</a> |
        <a href="https://github.com/hrithik-infinite" target="_blank">GitHub</a>
      </p>
      <p>If you have any questions, feel free to <a href="mailto:hrithikinfinite@gmail.com" style="color:#3498db; text-decoration:none;">contact us</a>.</p>
    </div>
  </div>

</body>
</html>

    `,
  });
};
