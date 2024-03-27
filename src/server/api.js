const express = require('express');
const nodemailer = require('nodemailer');
const app = express();
app.use(express.json());

const transporter = nodemailer.createTransport({
  service: 'gmail', // Use your email service
  auth: {
    user: 'yourEmail@example.com', // Your email
    pass: 'yourEmailPassword', // Your email password
  },
});

app.post('/send-email', (req, res) => {
  const { email, message } = req.body;
  const mailOptions = {
    from: email, // Sender address
    to: 'zenanshang2@gmail.com', // List of recipients
    subject: 'Message from Your Website', // Subject line
    text: message, // Plain text body
  };

  transporter.sendMail(mailOptions, function (err, info) {
    if (err) {
      console.error(err);
      res.status(500).send('Error sending email');
    } else {
      console.log(info);
      res.status(200).send('Email successfully sent');
    }
  });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
