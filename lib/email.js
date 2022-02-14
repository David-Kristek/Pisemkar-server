import nodemailer from "nodemailer";

const sendEmail = (to, subject, html) => {
  var transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "pisemkarbot@gmail.com",
      pass: process.env.EMAILPASSWORD,
    },
  });
  var mailOptions = {
    from: "pisemkarbot@gmail.com",
    to,
    subject,
    html,
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

export { sendEmail };
