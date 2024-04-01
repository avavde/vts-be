const express = require('express');
const WebSocket = require('ws');
const http = require('http');
const bodyParser = require('body-parser'); // Добавляем импорт bodyParser
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

const server = http.createServer(app);
const wss = new WebSocket.Server({ noServer: true });

// Обновляем пути импорта с учетом структуры каталогов
const WebSocketService = require('./services/websocketService');
const feedsRoutes = require('./routes/feedManagementRoutes'); // Путь к feedsRoutes
const anchorTagRoutes = require('./routes/anchorTagRoutes'); // Путь к anchorTagRoutes
const tagZonesRoutes = require('./routes/tagZonesRoutes'); // Путь к anchorTagRoutes
const zoneRoutes = require('./routes/zoneManagementRoutes') 
const websocketRoutes = require('./routes/websocketRoutes'); // Путь к websocketRoutes

const webSocketService = new WebSocketService(wss);
const cors = require('cors');

// Разрешить запросы со всех источников
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', feedsRoutes);
app.use('/api', anchorTagRoutes);
app.use('/api', tagZonesRoutes);
app.use('/api', zoneRoutes);


wss.on('connection', (ws) => {
  console.log('Клиент подключен к WebSocket серверу');
  ws.on('message', (message) => {
    console.log('Получено сообщение от клиента:', message);
  });
  ws.send(JSON.stringify({ message: 'Соединение с сервером установлено' }));
});

server.on('upgrade', (request, socket, head) => {
  wss.handleUpgrade(request, socket, head, (ws) => {
    wss.emit('connection', ws, request);
  });
});

app.use((req, res, next) => {
  req.webSocketService = webSocketService;
  next();
});

app.use('/api/websocket', websocketRoutes);

app.get('/', (req, res) => {
  res.send('SEWIO RTLS Backend запущен...');
});

server.listen(PORT, () => {
  console.log(`Сервер работает на http://localhost:${PORT}`);
});
