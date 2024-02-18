/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import fs from 'node:fs';
import path from 'node:path';
import nodemailer from 'nodemailer';
import nodeMailgun from 'nodemailer-mailgun-transport';
import Handlebars from 'handlebars';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import Mail from 'nodemailer/lib/mailer';

const transporter = nodemailer.createTransport(
  nodeMailgun({
    auth: {
      api_key: process.env.MAILGUN_API_KEY!,
      domain: process.env.MAILGUN_DOMAIN!,
    },
  })
);

const emailSender = (options: Mail.Options): Promise<Error | SMTPTransport.SentMessageInfo> =>
  new Promise((resolve, reject) => {
    transporter.sendMail(options, (err, info) => {
      if (err) return reject(err);

      return resolve(info);
    });
  });

/**
 * @description Sent email to the email address provided
 * @param email the email address where email to send
 * @param subject the subject of the email
 * @param payload the payload of the email (depends on the template)
 * @param template the path of the template to use
 * @returns
 */
export const sendEmail = async (email: string, subject: string, payload: any, template: string) => {
  try {
    const source = fs.readFileSync(path.join(__dirname, template), 'utf-8');
    const compiledTemplate = Handlebars.compile(source);

    const options: Mail.Options = {
      from: process.env.FROM_EMAIL,
      to: email,
      subject,
      html: compiledTemplate({
        ...payload,
      }),
    };

    return emailSender(options);
  } catch (err) {
    return err;
  }
};
