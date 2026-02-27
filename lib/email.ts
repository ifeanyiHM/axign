import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: parseInt(process.env.EMAIL_PORT || "587"), //465
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false,
    minVersion: "TLSv1.2",
  },
});

type TaskAssignmentRecipient = {
  email: string;
  username: string;
};

type AssignedTask = {
  id: string;
  title: string;
  description: string;
  dueDate: string | Date;
  priority: string;
  category: string;
  assignedBy: string;
  organizationName?: string;
};

function escapeHtml(input: string) {
  return input
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export async function sendVerificationEmail(
  email: string,
  token: string,
  username: string,
) {
  const verificationUrl = `${process.env.NEXT_PUBLIC_APP_URL}/verify-email?token=${token}`;

  const mailOptions = {
    from: process.env.EMAIL_FROM,
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
  };

  await transporter.sendMail(mailOptions);
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

  const mailOptions = {
    from: process.env.EMAIL_FROM,
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
  };

  await transporter.sendMail(mailOptions);
}

export async function sendEmployeeApprovalNotification(
  employeeEmail: string,
  employeeName: string,
  accessToken: string,
) {
  const accessUrl = `${process.env.NEXT_PUBLIC_APP_URL}/activate-account?token=${accessToken}`;

  const mailOptions = {
    from: process.env.EMAIL_FROM,
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
  };

  await transporter.sendMail(mailOptions);
}

export async function sendEmployeeRejectionNotification(
  employeeEmail: string,
  employeeName: string,
) {
  const mailOptions = {
    from: process.env.EMAIL_FROM,
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
  };

  await transporter.sendMail(mailOptions);
}

export async function sendPasswordResetEmail(
  email: string,
  token: string,
  username: string,
) {
  const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL}/reset-password?token=${token}`;

  const mailOptions = {
    from: process.env.EMAIL_FROM,
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
  };

  await transporter.sendMail(mailOptions);
}

export async function sendTaskAssignmentEmails(
  assignees: TaskAssignmentRecipient[],
  task: AssignedTask,
) {
  const taskUrl = `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/tasks/${task.id}`;

  await Promise.all(
    assignees.map((assignee) => {
      const mailOptions = {
        from: process.env.EMAIL_FROM,
        to: assignee.email,
        subject: `New Task Assigned: ${task.title}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #111827;">
            
            <h2 style="color: #111827;">Hi ${assignee.username}, 👋</h2>

            <p>
              You’ve been assigned a new task${
                task.organizationName
                  ? ` in <strong>${task.organizationName}</strong>`
                  : ""
              }.
            </p>

            <div style="background-color: #f9fafb; border: 1px solid #e5e7eb; padding: 16px; border-radius: 8px; margin: 20px 0;">
              <p><strong>📌 Title:</strong> ${task.title}</p>
              <p><strong>🗂 Category:</strong> ${task.category}</p>
              <p><strong>⚡ Priority:</strong> ${task.priority}</p>
              <p><strong>📅 Due Date:</strong> ${new Date(
                task.dueDate,
              ).toLocaleDateString()}</p>
            </div>

            <p style="margin-bottom: 20px;">
              <strong>Description:</strong><br />
              ${task.description}
            </p>

            <div style="margin: 30px 0;">
              <a
                href="${taskUrl}"
                style="
                  background-color: #4F46E5;
                  color: #ffffff;
                  padding: 12px 24px;
                  text-decoration: none;
                  border-radius: 6px;
                  display: inline-block;
                "
              >
                View Task
              </a>
            </div>

            <p style="color: #6b7280; font-size: 14px;">
              Please review the task and begin work as required.
            </p>

            <hr style="margin: 30px 0; border: none; border-top: 1px solid #e5e7eb;" />

            <p style="color: #9ca3af; font-size: 12px;">
              This is an automated notification. If you have questions, please contact your organization administrator.
            </p>
          </div>
        `,
      };

      return transporter.sendMail(mailOptions);
    }),
  );
}

export async function sendEmployeeInvitationEmail(
  inviteeEmail: string,
  inviteeName: string,
  inviterUsername: string,
  organizationName: string,
) {
  const signupUrl = `${process.env.NEXT_PUBLIC_APP_URL}/signup`;

  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: inviteeEmail,
    subject: `You're Invited to Join ${organizationName} on Axign`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #111827;">
        <div style="background: linear-gradient(135deg, #1f2937 0%, #374151 100%); padding: 30px; border-radius: 8px 8px 0 0;">
          <h1 style="color: #ffffff; margin: 0; font-size: 28px;">
            You're Invited! 🎉
          </h1>
        </div>

        <div style="background-color: #ffffff; padding: 30px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 8px 8px;">
          <h2 style="color: #111827; margin-top: 0;">Hi ${inviteeName},</h2>
          
          <p style="color: #374151; font-size: 16px; line-height: 1.6;">
            <strong>${inviterUsername}</strong> has invited you to join <strong style="color: #9b7a19;">${organizationName}</strong> on Axign — the all-in-one task management platform.
          </p>

          <div style="background-color: #f9fafb; border-left: 4px solid #9b7a19; padding: 20px; margin: 25px 0; border-radius: 4px;">
            <h3 style="color: #111827; margin-top: 0; font-size: 18px;">
              What is Axign?
            </h3>
            <p style="color: #6b7280; margin: 0; line-height: 1.6;">
              Axign helps teams collaborate seamlessly with smart task management, real-time tracking, and powerful analytics — all in one place.
            </p>
          </div>

          <p style="color: #374151; font-size: 16px; line-height: 1.6;">
            Click the button below to create your account and start collaborating with your team:
          </p>

          <div style="margin: 35px 0; text-align: center;">
            <a
              href="${signupUrl}"
              style="
                background-color: #9b7a19;
                color: #ffffff;
                padding: 14px 32px;
                text-decoration: none;
                border-radius: 8px;
                display: inline-block;
                font-weight: 600;
                font-size: 16px;
              "
            >
              Join ${organizationName}
            </a>
          </div>

          <p style="color: #6b7280; font-size: 14px;">
            Or copy and paste this link into your browser:
          </p>
          <p style="color: #9b7a19; word-break: break-all; background-color: #f9fafb; padding: 12px; border-radius: 4px; font-size: 13px;">
            ${signupUrl}
          </p>

          <hr style="margin: 30px 0; border: none; border-top: 1px solid #e5e7eb;" />

          <p style="color: #9ca3af; font-size: 12px; margin-bottom: 0;">
            This invitation was sent by ${inviterUsername} from ${organizationName}. If you didn't expect this invitation, you can safely ignore this email.
          </p>
        </div>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
}

// export type ContactFormPayload = {
//   fullName: string;
//   email: string;
//   company?: string;
//   subject: string;
//   message: string;
// };

export async function sendContactFormEmail(
  fullName: string,
  email: string,
  subject: string,
  message: string,
  company?: string,
) {
  const supportInbox = process.env.EMAIL_FROM;

  if (!supportInbox) {
    throw new Error("CONTACT_RECEIVER_EMAIL is not set");
  }

  const dashboardUrl =
    process.env.NEXT_PUBLIC_APP_URL || "https://axign.vercel.app";

  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: supportInbox,
    subject: `Contact Form: ${subject}`,
    replyTo: email,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #111827;">
        
        <div style="background: linear-gradient(135deg, #111827 0%, #374151 100%); padding: 28px; border-radius: 8px 8px 0 0;">
          <h1 style="color: #ffffff; margin: 0; font-size: 24px;">
            New Contact Message 📩
          </h1>
          <p style="color: #e5e7eb; margin: 10px 0 0; font-size: 14px; line-height: 1.6;">
            A message was submitted from the Axign Contact page.
          </p>
        </div>

        <div style="background-color: #ffffff; padding: 28px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 8px 8px;">
          
          <h2 style="color: #111827; margin-top: 0;">Sender details</h2>

          <div style="background-color: #f9fafb; border: 1px solid #e5e7eb; padding: 16px; border-radius: 8px; margin: 16px 0 22px;">
            <p style="margin: 0 0 8px;"><strong>👤 Full Name:</strong> ${escapeHtml(fullName)}</p>
            <p style="margin: 0 0 8px;"><strong>✉️ Email:</strong> ${escapeHtml(email)}</p>
            <p style="margin: 0 0 8px;"><strong>🏢 Company:</strong> ${escapeHtml(company || "—")}</p>
            <p style="margin: 0;"><strong>🧾 Subject:</strong> ${escapeHtml(subject)}</p>
          </div>

          <h3 style="color: #111827; margin: 0 0 10px;">Message</h3>
          <div style="background-color: #f9fafb; border-left: 4px solid #111827; padding: 16px; border-radius: 4px; margin-bottom: 20px;">
            <p style="color: #374151; margin: 0; line-height: 1.7; white-space: pre-wrap;">
              ${escapeHtml(message)}
            </p>
          </div>

          <div style="margin: 28px 0; text-align: center;">
            <a
              href="${dashboardUrl}"
              style="
                background-color: #111827;
                color: #ffffff;
                padding: 12px 24px;
                text-decoration: none;
                border-radius: 8px;
                display: inline-block;
                font-weight: 600;
                font-size: 14px;
              "
            >
              Open Axign
            </a>
          </div>

          <p style="color: #6b7280; font-size: 13px; line-height: 1.6;">
            Tip: You can reply directly to this email to respond to <strong>${escapeHtml(
              fullName,
            )}</strong>.
          </p>

          <hr style="margin: 26px 0; border: none; border-top: 1px solid #e5e7eb;" />

          <p style="color: #9ca3af; font-size: 12px; margin-bottom: 0;">
            This is an automated email from Axign Contact page.
          </p>
        </div>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
}
