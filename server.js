const express = require('express');
const WebSocket = require('ws');
const candlestickController = require('./controllers/candlestickController');
const orderBookController = require('./controllers/orderBookController');

const app = express();
const port = 3000;

const wss = new WebSocket.Server({ port: 8080 });
global.WebSocket = WebSocket; 

candlestickController.connectCandlestickWebSocket(wss);
orderBookController.connectOrderBookWebSocket(wss);

// API Routes
app.get('/api/candlestick', candlestickController.getCandlestickData);
app.get('/api/orderbook', orderBookController.getOrderBookData);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
