import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendVerificationEmail(
  email: string,
  token: string,
  username: string,
) {
  const verificationUrl = `${process.env.NEXT_PUBLIC_APP_URL}/verify-email?token=${token}`;

  await resend.emails.send({
    from: process.env.EMAIL_FROM || "onboarding@resend.dev",
    to: email,
    subject: "Verify Your Email - CEO Registration",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>Welcome, ${username}!</h2>
        <p>Thank you for registering as a CEO. Please verify your email address to access your dashboard.</p>
        <div style="margin: 30px 0;">
          <a href="${verificationUrl}" 
             style="background-color: #4F46E5; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block;">
            Verify Email
          </a>
        </div>
        <p>Or copy and paste this link into your browser:</p>
        <p style="color: #666; word-break: break-all;">${verificationUrl}</p>
        <p style="color: #999; font-size: 12px; margin-top: 30px;">
          This link will expire in 24 hours. If you didn't create this account, please ignore this email.
        </p>
      </div>
    `,
  });
}

export async function sendEmployeeApprovalRequestToCEO(
  ceoEmail: string,
  ceoName: string,
  employeeName: string,
  employeeEmail: string,
  approvalToken: string,
) {
  const approveUrl = `${process.env.NEXT_PUBLIC_APP_URL}/approve-employee?token=${approvalToken}&action=approve`;
  const rejectUrl = `${process.env.NEXT_PUBLIC_APP_URL}/approve-employee?token=${approvalToken}&action=reject`;

  await resend.emails.send({
    from: process.env.EMAIL_FROM || "onboarding@resend.dev",
    to: ceoEmail,
    subject: "New Employee Registration - Approval Required",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>Hello ${ceoName},</h2>
        <p>A new employee has registered and is requesting to join your organization:</p>
        
        <div style="background-color: #f3f4f6; padding: 20px; border-radius: 5px; margin: 20px 0;">
          <p><strong>Name:</strong> ${employeeName}</p>
          <p><strong>Email:</strong> ${employeeEmail}</p>
        </div>

        <p>Please review and take action:</p>
        
        <div style="margin: 30px 0;">
          <a href="${approveUrl}" 
             style="background-color: #10B981; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block; margin-right: 10px;">
            Approve
          </a>
          <a href="${rejectUrl}" 
             style="background-color: #EF4444; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block;">
            Reject
          </a>
        </div>

        <p style="color: #999; font-size: 12px; margin-top: 30px;">
          This request will expire in 7 days.
        </p>
      </div>
    `,
  });
}

export async function sendEmployeeApprovalNotification(
  employeeEmail: string,
  employeeName: string,
  accessToken: string,
) {
  const accessUrl = `${process.env.NEXT_PUBLIC_APP_URL}/activate-account?token=${accessToken}`;

  await resend.emails.send({
    from: process.env.EMAIL_FROM || "onboarding@resend.dev",
    to: employeeEmail,
    subject: "Account Approved - Access Your Dashboard",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>Congratulations, ${employeeName}!</h2>
        <p>Your employee account has been approved by your CEO.</p>
        <p>Click the button below to activate your account and access your dashboard:</p>
        
        <div style="margin: 30px 0;">
          <a href="${accessUrl}" 
             style="background-color: #4F46E5; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block;">
            Activate Account
          </a>
        </div>

        <p>Or copy and paste this link into your browser:</p>
        <p style="color: #666; word-break: break-all;">${accessUrl}</p>

        <p style="color: #999; font-size: 12px; margin-top: 30px;">
          This link will expire in 24 hours.
        </p>
      </div>
    `,
  });
}

export async function sendEmployeeRejectionNotification(
  employeeEmail: string,
  employeeName: string,
) {
  await resend.emails.send({
    from: process.env.EMAIL_FROM || "onboarding@resend.dev",
    to: employeeEmail,
    subject: "Account Registration Update",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>Hello ${employeeName},</h2>
        <p>We regret to inform you that your employee registration request has not been approved at this time.</p>
        <p>If you believe this is a mistake, please contact your organization's administrator.</p>
        
        <p style="color: #999; font-size: 12px; margin-top: 30px;">
          Thank you for your interest.
        </p>
      </div>
    `,
  });
}

export async function sendPasswordResetEmail(
  email: string,
  token: string,
  username: string,
) {
  const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL}/reset-password?token=${token}`;

  await resend.emails.send({
    from: process.env.EMAIL_FROM || "onboarding@resend.dev",
    to: email,
    subject: "Password Reset Request",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>Hello ${username},</h2>
        <p>We received a request to reset your password. Click the button below to create a new password:</p>
        
        <div style="margin: 30px 0;">
          <a href="${resetUrl}" 
             style="background-color: #4F46E5; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block;">
            Reset Password
          </a>
        </div>

        <p>Or copy and paste this link into your browser:</p>
        <p style="color: #666; word-break: break-all;">${resetUrl}</p>

        <p style="color: #999; font-size: 12px; margin-top: 30px;">
          This link will expire in 1 hour. If you didn't request a password reset, please ignore this email and your password will remain unchanged.
        </p>
      </div>
    `,
  });
}
