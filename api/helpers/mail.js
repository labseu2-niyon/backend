const nodemailer = require('nodemailer');
const secret = require('../../config/secret');

async function passwordResetMail(url, token, email) {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    // requireTLS: true
    auth: {
      user: secret.USER_MAIL,
      pass: secret.PASSWORD_MAIL
    }
  });

  const mailOption = {
    from: 'niyonlabs@gmail.com',
    to: email,
    subject: 'Password Reset',
    html: `<div> 
    <p> Hello kindly click these to reset your password on niyon app
      </p> <a href=${url}?token=${token}> here </a>`
  };

  try {
    const mail = await transporter.sendMail(mailOption);
    return mail;
  } catch (error) {
    return error.message;
  }
}

module.exports = { passwordResetMail };
