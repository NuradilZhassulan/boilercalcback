const express = require('express');
const router = express.Router();
const BoilerCountExits = require('../models/BoilerCountExits');

// Получение всех цен
router.get('/', async (req, res) => {
  try {
    const countExits = await BoilerCountExits.find();
    res.json(countExits);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Добавление новой цены
router.post('/', async (req, res) => {
    const { countExit, priceCountExit } = req.body;

    if (!priceCountExit) { // Проверка на наличие поля price
        return res.status(400).json({ message: 'Поле priceCountExit обязательно для заполнения.' });
      }
    
  
    const newCountExit = new BoilerCountExits({ countExit, priceCountExit });
    await newCountExit.save();
    res.status(201).json(newCountExit);
  });

// Обновление цены
router.patch('/:id', async (req, res) => {
  try {
    const updatedCountExit = await BoilerCountExits.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedCountExit);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Удаление цены
router.delete('/:id', async (req, res) => {
  try {
    await BoilerCountExits.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Редактирование существующей записи
router.put('/:id', async (req, res) => {
  const { countExit, priceCountExit } = req.body;
    
    try {
      const updatedCountExit = await BoilerCountExits.findByIdAndUpdate(
        req.params.id,
        { countExit, priceCountExit },
        { new: true }
      );
  
      if (!updatedCountExit) {
        return res.status(404).send({ message: 'Запись не найдена.' });
      }
  
      res.send(updatedCountExit);
    } catch (error) {
      res.status(400).send({ message: 'Ошибка при обновлении записи.', error: error.message });
    }
  });

module.exports = router;
