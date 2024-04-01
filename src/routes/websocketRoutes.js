const express = require('express');
const router = express.Router();

router.post('/subscribe', (req, res) => {
  // Теперь мы получаем webSocketService из объекта запроса
  const webSocketService = req.webSocketService;
  webSocketService.subscribeToTags(); // Вызываем метод подписки
  res.send('Подписка на обновления выполнена');
});

router.post('/unsubscribe', (req, res) => {
  const { resource } = req.body; // Получаем ресурс из тела запроса
  const webSocketService = req.webSocketService;
  webSocketService.unsubscribe(resource); // Вызываем метод отписки
  res.send(`Отписка от ${resource} выполнена`);
});

module.exports = router;
