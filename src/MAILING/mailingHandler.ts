import {SparkPostProvider} from "./provider/sparkPost";

export class MailingHandler{

   static async sendConfirmationEmail (recipients: string, url: string) {
        await SparkPostProvider.sendConfirmationEmail(recipients, url);
   }

   static  async sendForgotPasswordEmail (recipients: string, url: string) {
       await SparkPostProvider.sendForgotPasswordEmail(recipients, url);
   }

}
