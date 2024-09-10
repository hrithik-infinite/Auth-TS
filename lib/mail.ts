import { Resend } from "resend";
const resend = new Resend(process.env.RESEND_API_KEY);
export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `http://localhost:3000/auth/new-verification?token=${token}`;

  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Test",
    html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Verify Your Account</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f4f4f4;
      margin: 0;
      padding: 0;
    }
    .email-container {
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
    h1 {
      color: #333333;
    }
    p {
      color: #555555;
    }
    .btn {
      display: inline-block;
      padding: 12px 24px;
      background-color: #007bff;
      color: #ffffff;
      text-decoration: none;
      border-radius: 5px;
      font-weight: bold;
    }
    .btn:hover {
      background-color: #0056b3;
    }
    .footer {
      margin-top: 20px;
      text-align: center;
      color: #888888;
      font-size: 12px;
    }
  </style>
</head>
<body>

  <div class="email-container">
    <h1>Welcome to Auth TS!</h1>
    <p>Hi [Customer's First Name],</p>
    <p>Thank you for signing up for Auth TS!. We are thrilled to have you on board!</p>
    <p>Please click the button below to verify your email address and activate your account:</p>

    <p style="text-align: center;">
      <a href="${confirmLink}" class="btn">Verify My Account</a>
    </p>

    <p>If you didn’t create an account with us, please ignore this email.</p>

    <div class="footer">
      <p>&copy; 2024 Auth TS!. All rights reserved.</p>
    </div>
  </div>

</body>
</html>
`,
  });
};
