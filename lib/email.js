import sgMail from "@sendgrid/mail";
const sendEmail = async (to, subject, html) => {
  sgMail.setApiKey(process.env.SEND_GRID_API_KEY);

  const sendMail = async (msg) => {
    try {
      const res = await sgMail.send(msg);
      console.log("Email sent to ", msg.to);
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
