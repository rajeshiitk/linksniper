import nodemailer, { Transporter } from "nodemailer";
import dotenv from "dotenv";
import {
  NODE_MAILER_EMAIL,
  NODE_MAILER_HOST,
  NODE_MAILER_PASSWORD,
  NODE_MAILER_PORT,
} from "../config";
dotenv.config({ path: ".env" });

class MailService {
  private static instance: MailService; // this is a static property which will hold the instance of this class and we will use this instance to call the methods of this class from outside of this class
  private transporter: Transporter; // this is a property which will hold the instance of nodemailer.Transporter class and we will use this instance to call the methods of this class from outside of this class

  // the difference between static and private is that static properties are accessible from outside of the class but private properties are not accessible from outside of the class

  private constructor() {
    this.transporter = nodemailer.createTransport({
      host: NODE_MAILER_HOST,
      port: Number(NODE_MAILER_PORT),
      secure: true,
      auth: {
        user: NODE_MAILER_EMAIL,
        pass: NODE_MAILER_PASSWORD,
      },
    });
  }

  public static getInstance(): MailService {
    // this is a static method which will return the instance of this class and we will use this instance to call the methods of this class from outside of this class
    if (!MailService.instance) {
      MailService.instance = new MailService();
    }
    return MailService.instance;
  }

  public async sendMail(
    to: string,
    subject: string,
    html: string
  ): Promise<void> {
    const info = await this.transporter.sendMail({
      from: '"LinkSniper 👻" rtsphysic.18@gmail.com',
      to,
      subject,
      html,
    });

    console.log("Message sent: %s", info.messageId);
  }
}

export default MailService;

// async function main() {
//   const mailService = MailService.getInstance();

//   // Usage example
//   const to = "example@gmail.com";
//   const subject = "Server is Restared";
//   // const text = "Hello world?";
//   const html = "<b>Hello world?</b>";

//   try {
//     await mailService.sendMail(to, subject, html);
//   } catch (error) {
//     console.error(error);
//   }
// }

// main();

// here we are using private constructor so that no one can create an instance of this class from outside which will prevent us from creating multiple instances of this class and we will use a static method getInstance() to create an instance of this class and we will use this instance to call the methods of this class from outside of this class and we will use this instance to call the methods of this class from outside of this class w
