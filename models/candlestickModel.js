const WebSocket = require('ws');
const axios = require('axios');

const BINANCE_WS_CANDLESTICK = 'wss://stream.binance.com:9443/ws/solusdt@kline_1m';

// Receive and broadcast Candlestick data
exports.connectCandlestickWebSocket = (wss) => {
  function connect() {
    const candlestickSocket = new WebSocket(BINANCE_WS_CANDLESTICK);

    candlestickSocket.on('message', (data) => {
      const parsedData = JSON.parse(data);
      console.log('Received Candlestick Data:', parsedData);
      wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify({ type: 'candlestick', data: parsedData }));
        }
      });
    });

    candlestickSocket.on('close', () => {
      console.log('Candlestick WebSocket disconnected. Reconnecting...');
      setTimeout(connect, 5000); 
    });

    candlestickSocket.on('error', (error) => {
      console.error('Candlestick WebSocket error:', error);
      candlestickSocket.close(); // close the socket if any error
    });
  }

  connect();
};

// fetch data from REST api
exports.fetchCandlestickData = async () => {
  const response = await axios.get(
    'https://api.binance.com/api/v3/klines?symbol=SOLUSDT&interval=1m'
  );
  return response.data;
};
