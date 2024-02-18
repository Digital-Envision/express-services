import FormData from 'form-data';
import Mailgun from 'mailgun.js';
import { Resend } from 'resend';
import { MailtrapClient } from "mailtrap"
import { serviceConfig } from '../configs/config';

const mailgunSdk = new Mailgun(FormData);
const mailtrapSdk = new MailtrapClient({ token: serviceConfig.mailtrap.apiKey });
const resendSdk = new Resend(serviceConfig.resend.apiKey);

export class EmailHandler {
    private mailgun: any;

    constructor() {
        this.mailgun = mailgunSdk.client({ username: 'api', key: serviceConfig.mailgun.apiKey });
    }
    async sendEmail(provider: string, emailTo: string, subject: string, emailBody: string) {
        switch (provider) {
            case "mailgun":
                return await this.sendMailgunEmail(emailTo, subject, emailBody);
            case "mailtrap":
                return await this.sendMailtrapEmail(emailTo, subject, emailBody);
            case "resend":
                return await this.sendResendEmail(emailTo, subject, emailBody);
            default:
                throw new Error("Invalid email provider");
        }
    }
    async sendResendEmail(emailTo: string, subject: string, emailBody: string) {
        try {
            await resendSdk.emails.send({
                from: serviceConfig.default.emailFrom,
                to: emailTo,
                subject: subject,
                html: emailBody
            })
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async sendMailgunEmail(emailTo: string, subject: string, emailBody: string) {
        try {
            await this.mailgun.create(serviceConfig.mailgun.domain, {
                from: serviceConfig.default.emailFrom,
                to: [emailTo],
                subject: subject,
                text: emailBody
            });
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async sendMailtrapEmail(emailTo: string, subject: string, emailBody: string) {
        try {
            await mailtrapSdk.send({
                from: {
                    name: serviceConfig.default.emailName,
                    email: serviceConfig.default.emailFrom
                },
                subject: subject,
                html: emailBody,
                to: [{ email: emailTo }]
            });
        } catch (error: any) {
            throw new Error(error.message);
        }
    }
}