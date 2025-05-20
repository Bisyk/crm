import { getSmtpFrom } from "./getSmtpFrom";
import { getUserTransporter } from "./getTransporter";

interface SendEmailInput {
  emails: string[];
  subject: string;
  htmlTemplate: string;
}

export const sendEmail = async ({
  emails,
  subject,
  htmlTemplate,
}: SendEmailInput) => {
  const transporter = await getUserTransporter();
  const from = await getSmtpFrom();

  const sendEmail = async (email: string) => {
    return transporter.sendMail({
      from,
      to: email,
      subject,
      html: htmlTemplate,
    });
  };

  return Promise.all(emails.map(sendEmail));
};
