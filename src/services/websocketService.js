const WebSocket = require('ws');
require('dotenv').config();

class WebSocketService {
    constructor(wss) {
        this.wss = wss;
        this.url = process.env.SEWIO_WS_URL;
        this.apiKey = process.env.SEWIO_API_KEY;
        this.ws = null;
        this.messagesQueue = [];
        this.init();
    }

    init() {
        this.ws = new WebSocket(this.url, {
            headers: { 'X-ApiKey': this.apiKey }
        });

        this.ws.on('open', () => {
            console.log('Подключен к SEWIO WebSocket');
            this.subscribeToTags();
        });

        this.ws.on('message', (data) => {
            const message = JSON.parse(data);
            this.messagesQueue.push(message);
            this.wss.clients.forEach(client => {
                if (client.readyState === WebSocket.OPEN) {
                    client.send(JSON.stringify(message));
                }
            });
        });

        this.ws.on('close', () => {
            console.log('Отключен от SEWIO WebSocket');
        });

        this.ws.on('error', (err) => {
            console.error('WebSocket error:', err);
        });

        setInterval(() => {
            while (this.messagesQueue.length > 0) {
                const message = this.messagesQueue.shift();
                this.processMessage(message);
            }
        }, 100);
    }

    processMessage(message) {
       //  console.log("Получено сообщение:", JSON.stringify(message));
        const { resource, body } = message;
    
        if (resource.startsWith('/zones/') || resource.startsWith('/tagzones/data')) {
            console.log("1");
            if (body.zones && body.zones.length > 0) {
                body.zones.forEach(zone => {
                    if (['info', 'warning', 'danger'].includes(zone.type)) {
                        console.log(`Метка с ID ${body.uuid} вошла в зону типа '${zone.type}' с названием '${zone.name}'`);
                    }
                });
            } else {
                 console.log('Сообщение не содержит информацию о зонах или они не соответствуют ожидаемым типам.');
            }
        }
    }


    subscribeToTags() {
        const subscribeMessage = {
            method: "subscribe",
            resource: "/feeds/" // Подписка на все обновления меток
        };
        this.ws.send(JSON.stringify(subscribeMessage));
        console.log('Подписаны на обновления меток');
    }

    unsubscribe(resource) {
        const unsubscribeMessage = {
            method: "unsubscribe",
            resource: resource
        };
        this.ws.send(JSON.stringify(unsubscribeMessage));
        console.log(`Отписаны от ${resource}`);
    }
}

module.exports = WebSocketService;
