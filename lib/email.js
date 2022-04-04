import nodemailer from "nodemailer";

const sendEmail = async (to, subject, html) => {
  const sgMail = require("@sendgrid/mail");

  sgMail.setApiKey(API_KEY);

  const sendMail = async (msg) => {
    try {
      const res = await sgMail.send(msg);
      console.log("Message sent", res);
    } catch (err) {
      console.error(err);
    }
  };
  sendMail({
    to,
    from: "pisemkarbot@gmail.com",
    subject,
    html,
  });
};

export { sendEmail };
