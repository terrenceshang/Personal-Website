const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const app = express();

app.use(cors());
app.use(express.json());

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'contactmezenan@gmail.com',
    pass: 'hqbd fdan pqhp rytc',
  },
});

app.post('/send-email', (req, res) => {
  res.send('Processing email sending');
  const { fullName, email, phone, message } = req.body;
  const mailOptions = {
    from: email,
    to: 'zenanshang2@gmail.com',
    subject: `${fullName} (${email})`,
    text: `Name: ${fullName}\nEmail: ${email}\nPhone: ${phone}\nMessage: ${message}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
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
