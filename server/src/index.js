const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const app = express();

app.use(cors());
app.use(express.json());

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'yourEmail@gmail.com',
    pass: 'yourPassword',
  },
});

app.post('/send-email', (req, res) => {
  const { fullName, email, phone, message } = req.body;
  const mailOptions = {
    from: email,
    to: 'zenanshang2@gmail.com',
    subject: 'New Contact Form Submission',
    text: `Name: ${fullName}\nEmail: ${email}\nPhone: ${phone}\nMessage: ${message}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      res.status(500).send('Error sending email');
    } else {
      res.send('Email sent successfully');
    }
  });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
