declare module 'nodemailer' {
  export interface SendMailOptions {
    from: string
    to: string
    cc?: string
    bcc?: string
    replyTo?: string
    subject: string
    text?: string
    html?: string
  }

  export interface Transporter {
    sendMail(mailOptions: SendMailOptions): Promise<any>
  }

  export interface TransportOptions {
    service: string
    auth: {
      user: string
      pass: string
    }
  }

  export function createTransport(options: TransportOptions): Transporter
}
