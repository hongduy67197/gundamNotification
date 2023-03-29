const nodemailer = require("nodemailer");

function generateCode() {
  return Math.random().toString().substring(2, 8);
}

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "gundambasevnstore@gmail.com",
    pass: "rwpsrnxatyythotn",
  },
  port: 465,
  host: "gsmtp.gmail.com",
});

function sendEMail(email, transporter) {
  transporter.sendMail(
    {
      from: "gundambasevnstore@gmail.com",
      to: email,
      subject: "Hello ✔",
      text: "Email registered successfully",
      html: `<a href=https://www.bnkrmall.co.kr/premium/p_category.do>co sp moi</a>`,
    },
    function (err, res) {
      console.log(39, err, res);
      if (err) {
        console.log(41, err);
      } else {
        console.log("Message sent successfully");
      }
    }
  );
}

module.exports = {
  transporter,
  sendEMail,
  generateCode,
};
