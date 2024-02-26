import fs from 'fs';
import FormData from 'form-data';
import Mailgun from 'mailgun.js';
import { Resend } from 'resend';
import { MailtrapClient, MailtrapClientConfig } from "mailtrap"
import { serviceConfig } from '../configs/config';
import { IMailgunClient } from 'mailgun.js/Interfaces';

const mailtrapSdk = new MailtrapClient({ token: serviceConfig.mailtrap.apiKey });
const resendSdk = new Resend(serviceConfig.resend.apiKey);

export class EmailHandler {
    private mailgun: Mailgun | null;
    private mailgunClient: IMailgunClient | null;
    private mailtrap: MailtrapClient | null;
    private resend: Resend | null;

    constructor() {
        this.mailgun = null;
        this.mailgunClient = null;
        this.mailtrap = null;
        this.resend = null;
    }

    private initializeInstance(provider: string): void {
        if (provider === "mailgun") {
            if (!this.mailgun) {
                this.mailgun = new Mailgun(FormData);
                this.mailgunClient = this.mailgun.client({ username: 'api', key: serviceConfig.mailgun.apiKey });
            }
        } else if (provider === "mailtrap") {
            if (!this.mailtrap) {
                this.mailtrap = new MailtrapClient({ token: serviceConfig.mailtrap.apiKey });
            }
        } else if (provider === "resend") {
            if (!this.resend) {
                this.resend = new Resend(serviceConfig.resend.apiKey);
            }
        }
    }

    async sendEmail(provider: string, emailTo: string, subject: string, emailBody: string, attachment?: Express.Multer.File) {
        this.initializeInstance(provider);
        switch (provider) {
            case "mailgun":
                return await this.sendMailgunEmail(emailTo, subject, emailBody, attachment);
            case "mailtrap":
                return await this.sendMailtrapEmail(emailTo, subject, emailBody, attachment);
            case "resend":
                return await this.sendResendEmail(emailTo, subject, emailBody, attachment);
            default:
                throw new Error("Invalid email provider");
        }
    }
    async sendResendEmail(emailTo: string, subject: string, emailBody: string, attachment?: Express.Multer.File) {
        try {
            await resendSdk.emails.send({
                from: serviceConfig.default.emailFrom,
                to: emailTo,
                subject: subject,
                html: emailBody,
                attachments: [
                    {
                        filename: attachment?.originalname,
                        path: attachment?.path
                    }
                ],
            })
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async sendMailgunEmail(emailTo: string, subject: string, emailBody: string, attachment?: Express.Multer.File) {
        try {
            await this.mailgunClient?.messages.create(serviceConfig.mailgun.domain, {
                from: serviceConfig.default.emailFrom,
                to: [emailTo],
                subject: subject,
                text: emailBody,
                attachment: {
                    filename: attachment?.originalname ?? '',
                    path: attachment?.path,
                    data: attachment?.buffer ?? '',
                },
            });
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async sendMailtrapEmail(emailTo: string, subject: string, emailBody: string, attachment?: Express.Multer.File) {
        try {
            const attachmentData = attachment ? fs.readFileSync(attachment.path).toString('base64') : undefined;

            await mailtrapSdk.send({
                from: {
                    name: serviceConfig.default.emailName,
                    email: serviceConfig.default.emailFrom
                },
                subject: subject,
                html: emailBody,
                to: [{ email: emailTo }],
                attachments: [
                    {
                        filename: attachment?.originalname ?? '',
                        content: attachmentData || ''
                    }
                ]
            });
        } catch (error: any) {
            throw new Error(error.message);
        }
    }
}