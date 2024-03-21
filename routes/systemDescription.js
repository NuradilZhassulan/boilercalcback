const express = require("express");
const router = express.Router();
const BoilerSystemDescription = require("../models/BoilerSystemDescription");

// Получение всех цен
router.get("/", async (req, res) => {
  try {
    const systemDescriptions = await BoilerSystemDescription.find();
    res.json(systemDescriptions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Добавление новой цены
router.post("/", async (req, res) => {
  const { systemDescription } = req.body;
  try {
    if (!systemDescription) {
      // Проверка на наличие поля systemDescription
      return res.status(400).json({
        message: "Поле systemDescription обязательно для заполнения.",
      });
    }

    const newSystemDescription = new BoilerSystemDescription({
      systemDescription,
    });
    await newSystemDescription.save();
    res.status(201).json(newSystemDescription);
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
    const updatedSystemDescription =
      await BoilerSystemDescription.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
    res.json(updatedSystemDescription);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Удаление цены
router.delete("/:id", async (req, res) => {
  try {
    await BoilerSystemDescription.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Редактирование существующей записи
router.put("/:id", async (req, res) => {
  const { systemDescription } = req.body;

  try {
    const updatedSystemDescription =
      await BoilerSystemDescription.findByIdAndUpdate(
        req.params.id,
        { systemDescription },
        { new: true }
      );

    if (!updatedSystemDescription) {
      return res.status(404).send({ message: "Запись не найдена." });
    }

    res.send(updatedSystemDescription);
  } catch (error) {
    res
      .status(400)
      .send({ message: "Ошибка при обновлении записи.", error: error.message });
  }
});

module.exports = router;
