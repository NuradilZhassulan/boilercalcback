const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const valueRoutes = require("./routes/values");
const priceRoutes = require("./routes/prices");
const countExitRoutes = require("./routes/countExits");
const extraServicesRoutes = require("./routes/extraService");
const nodemailer = require('nodemailer');

const app = express();
app.use(express.json());

app.use((req, res, next) => {
  const allowedOrigins = ['http://localhost:3001', 'https://mighty-caverns-86737-6af8502f2aff.herokuapp.com'];
  const origin = req.headers.origin;

  if (allowedOrigins.includes(origin)) {
     res.setHeader('Access-Control-Allow-Origin', origin);
  }

  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  next();
});

const transporter = nodemailer.createTransport({
  host: 'smtp.mail.ru',
  port: 465, // Обычно для SMTPS (SMTP over SSL) используется порт 465
  secure: true, // true для 465 порта, false для других портов
  auth: {
    user: 'nurik_22_11_96@mail.ru',
    pass: 'kzHuYEbLr6Ndj44a0Ykm',
  },
});

// Endpoint для отправки электронных писем
app.post('/api/send-email', (req, res) => {
  const { email, phone, totalPrice, boilerType,
    boilerPower1,
    boilerPower2,
    waterSource,
    waterVolume,
    selectedCount,
    sendCheckedState,
    sendExtraServices,
    contour,
    power,
    gasConsumption } = req.body;

  const mailOptions = {
    from: 'eplotorg63@mail.ru',
    to: 'teplotorg63@mail.ru',
    subject: 'Новый заказ',
    text: `Поступил новый заказ. 
    Email клиента: ${email}, 
    телефон: ${phone}, 
    итоговая сумма: ${totalPrice}, 
    комбинацию котлов: ${boilerType},
    мощность котлов 1: ${boilerPower1},
    мощность котлов 2: ${boilerPower2},
    горячая вода: ${waterSource},
    бойлер: ${waterVolume},
    кол. потребителей тепла: ${selectedCount},
    выбранные потребителей тепла: ${JSON.stringify(sendCheckedState)},
    доп. заказы: ${JSON.stringify(sendExtraServices)},
    характеристики: "Котел": ${contour},
    характеристики: "Мощность котельной кВт": ${power},
    характеристики: "Расход газа природного м3/ч": ${gasConsumption}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).send('Ошибка при отправке письма');
    } else {
      console.log('Email sent: ' + info.response);
      res.status(200).send('Письмо успешно отправлено');
    }
  });
});


// Подключение к MongoDB
mongoose.connect("mongodb+srv://nuradil:Qwerty11*@cluster0.smwjri5.mongodb.net/boilerValues?retryWrites=true&w=majority&appName=Cluster0", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use("/api/values", valueRoutes);

app.use("/api/prices", priceRoutes);

app.use("/api/countExit", countExitRoutes);

app.use("/api/extraservices", extraServicesRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
