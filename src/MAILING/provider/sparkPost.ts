import * as SparkPost from "sparkpost";
import { Recipient } from "sparkpost";

export class SparkPostProvider {
  static client: SparkPost;

  static getCient() {
    if (SparkPostProvider.client != null)
      SparkPostProvider.client = new SparkPost(process.env.SPARKPOST_API_KEY);

    return SparkPostProvider.client;
  }

  static async sendConfirmationEmail(recipient: string, url: string) {

    const html = ` 
        <html>
        <body>
            <p>Testing SparkPost - the world's most awesomest email service!</p>
            <a href="${url}">Confirm your email</a>
        </body>
        </html>`
    ;

    const from = "testing@sparkpostbox.com";
    const subject = "Confirm email";
    const recipients: Recipient[] = [{ address: recipient }];
    await SparkPostProvider.sendEmail(html, from, subject, recipients);
  }

  static async sendForgotPasswordEmail(recipient: string, url: string) {
      const html = ` 
        <html>
        <body>
            <p>Testing SparkPost - the world's most awesomest email service!</p>
            <a href="${url}">Recover your password</a>
        </body>
        </html>`
      ;

      const from = "testing@sparkpostbox.com";
      const subject = "Forgot password";
      const recipients: Recipient[] = [{ address: recipient }];
      await SparkPostProvider.sendEmail(html, from, subject, recipients);
  }

  static async sendEmail(
    html: string,
    from: string,
    subject: string,
    recipients: Recipient[]
  ) {
    try {
      const response = await SparkPostProvider.getCient().transmissions.send({
        options: {
          sandbox: true
        },
        content: {
          from: from,
          subject: subject,
          html: html
        },
        recipients: recipients
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }
}
