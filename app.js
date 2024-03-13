const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const valueRoutes = require("./routes/values");
const priceRoutes = require("./routes/prices");
const countExitRoutes = require("./routes/countExits");
const extraServicesRoutes = require("./routes/extraService");

const app = express();
app.use(express.json());

// const corsOptions = {
//   origin: "http://10.224.0.16:3001", // Разрешить только запросы с этого источника

//   optionsSuccessStatus: 200, // некоторые браузеры устарели
// };

// app.use(cors(corsOptions));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://192.168.0.102:3001'); // обновите это с вашим доменом/оригином, который нуждается в доступе
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  next();
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
