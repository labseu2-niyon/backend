const nodemailer = require('nodemailer');

async function passwordResetMail(token, email) {
  const transporter = nodemailer.createTransport({
    host: 'stmp.googlemail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.USER_MAIL,
      pass: process.env.PASSWORD_MAIL
    }
  });

  const mailOption = {
    from: 'niyonlabs@gmail.com',
    to: email,
    subject: 'Password Reset',
    html:
      '<div> <p> Hello kindly click these to reset your password on niyon app'
  };

  try {
    const mail = await transporter.sendMail(mailOption);
    return mail;
  } catch (error) {
    return error.message;
  }
}

module.exports = { passwordResetMail };
