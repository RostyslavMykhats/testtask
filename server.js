const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.post('/send-email', (req, res) => {
  const { name, email, message } = req.body;

  // Параметри для відправлення пошти
  const transporter = nodemailer.createTransport({
    service: 'Gmail', // Використовуйте відповідний сервіс пошти
    auth: {
      user: 'your-email@gmail.com', // Вашa пошта
      pass: 'your-email-password', // Пароль до вашої пошти
    },
  });

  // Змініть "your-email@gmail.com" на вашу пошту
  const mailOptions = {
    from: 'your-email@gmail.com',
    to: 'recipient-email@example.com', // Пошта одержувача
    subject: 'New Message from Contact Form', // Тема листа
    text: `
      Name: ${name}
      Email: ${email}
      Message: ${message}
    `,
  };

  // Відправлення листа
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Error:', error);
      res.status(500).send('Error sending email');
    } else {
      console.log('Email sent:', info.response);
      res.send('Email sent successfully');
    }
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
