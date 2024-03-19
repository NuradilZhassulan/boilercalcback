const express = require("express");
const router = express.Router();
const BoilerPrice = require("../models/BoilerPrice");

// Получение всех цен
router.get("/", async (req, res) => {
  try {
    const prices = await BoilerPrice.find();
    res.json(prices);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Добавление новой цены
router.post("/", async (req, res) => {
  const { power1, power2, price } = req.body;
  try {
    // Проверка на заполненность всех обязательных полей
    if (!power1 || !power2 || !price) {
      return res
        .status(400)
        .json({ message: "Все поля обязательны к заполнению." });
    }

    const newPrice = new BoilerPrice({ power1, power2, price });
    await newPrice.save();
    res.status(201).json(newPrice);
  } catch (error) {
    if (error.name === "ValidationError") {
      // Если ошибка валидации, отправляем статус 400 с сообщением об ошибке
      return res.status(400).json({ message: error.message });
    } else {
      // Для всех других ошибок отправляем статус 500 с обобщенным сообщением
      return res.status(500).json({ message: "Внутренняя ошибка сервера" });
    }
  }
});

// Обновление цены
router.patch("/:id", async (req, res) => {
  try {
    const updatedPrice = await BoilerPrice.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedPrice);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Удаление цены
router.delete("/:id", async (req, res) => {
  try {
    await BoilerPrice.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Редактирование существующей записи
router.put("/:id", async (req, res) => {
  const { power1, power2, price } = req.body;

  try {
    const updatedPrice = await BoilerPrice.findByIdAndUpdate(
      req.params.id,
      { power1, power2, price },
      { new: true }
    );

    if (!updatedPrice) {
      return res.status(404).send({ message: "Запись не найдена." });
    }

    res.send(updatedPrice);
  } catch (error) {
    res
      .status(400)
      .send({ message: "Ошибка при обновлении записи.", error: error.message });
  }
});

module.exports = router;
