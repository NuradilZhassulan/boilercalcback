const express = require("express");
const router = express.Router();
const BoilerExtraService = require("../models/BoilerExtraService");

// Получение всех цен
router.get('/', async (req, res) => {
  try {
    const extraServices = await BoilerExtraService.find();
    res.json(extraServices);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Добавление новой цены
router.post('/', async (req, res) => {
    const { nameExtraService, priceExtraService } = req.body;

    if (!priceExtraService) { // Проверка на наличие поля price
        return res.status(400).json({ message: 'Поле priceExtraService обязательно для заполнения.' });
      }
    
  
    const newExtraService = new BoilerExtraService({ nameExtraService, priceExtraService });
    await newExtraService.save();
    res.status(201).json(newExtraService);
  });

// Обновление цены
router.patch('/:id', async (req, res) => {
  try {
    const updatedExtraService = await BoilerExtraService.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedExtraService);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Удаление цены
router.delete('/:id', async (req, res) => {
  try {
    await BoilerExtraService.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Редактирование существующей записи
router.put('/:id', async (req, res) => {
  const { nameExtraService, priceExtraService  } = req.body;
    
    try {
      const updatedExtraService = await BoilerExtraService.findByIdAndUpdate(
        req.params.id,
        { nameExtraService, priceExtraService },
        { new: true }
      );
  
      if (!updatedExtraService) {
        return res.status(404).send({ message: 'Запись не найдена.' });
      }
  
      res.send(updatedExtraService);
    } catch (error) {
      res.status(400).send({ message: 'Ошибка при обновлении записи.', error: error.message });
    }
  });

module.exports = router;
