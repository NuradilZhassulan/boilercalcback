const express = require('express');
const router = express.Router();
const BoilerValue = require('../models/BoilerValue');

// Получение всех цен
router.get('/', async (req, res) => {
  try {
    const boilerValues = await BoilerValue.find();
    res.json(boilerValues);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Добавление новой цены
router.post('/', async (req, res) => {
    const { boilerValue, priceBoilerValue } = req.body;

    if (!priceBoilerValue) { // Проверка на наличие поля price
        return res.status(400).json({ message: 'Поле priceBoilerValue обязательно для заполнения.' });
      }
    
  
    const newBoilerValue = new BoilerValue({ boilerValue, priceBoilerValue });
    await newBoilerValue.save();
    res.status(201).json(newBoilerValue);
  });

// Обновление цены
router.patch('/:id', async (req, res) => {
  try {
    const updatedBoilerValue = await BoilerValue.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedBoilerValue);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Удаление цены
router.delete('/:id', async (req, res) => {
  try {
    await BoilerValue.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Редактирование существующей записи
router.put('/:id', async (req, res) => {
  const { boilerValue, priceBoilerValue } = req.body;
    
    try {
      const updatedBoilerValue = await BoilerValue.findByIdAndUpdate(
        req.params.id,
        { boilerValue, priceBoilerValue },
        { new: true }
      );
  
      if (!updatedBoilerValue) {
        return res.status(404).send({ message: 'Запись не найдена.' });
      }
  
      res.send(updatedBoilerValue);
    } catch (error) {
      res.status(400).send({ message: 'Ошибка при обновлении записи.', error: error.message });
    }
  });

module.exports = router;

