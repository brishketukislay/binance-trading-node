const WebSocket = require('ws');
const axios = require('axios');

const BINANCE_WS_ORDERBOOK = 'wss://stream.binance.com:9443/ws/solusdt@depth';

// Receive and broadcast Candlestick data
exports.connectOrderBookWebSocket = (wss) => {
  function connect() {
    const orderBookSocket = new WebSocket(BINANCE_WS_ORDERBOOK);

    orderBookSocket.on('message', (data) => {
      const parsedData = JSON.parse(data);
      // console.log('Received Order Book Data:', parsedData);

      wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify({ type: 'orderbook', data: parsedData }));
        }
      });
    });

    orderBookSocket.on('close', () => {
      console.log('Order Book WebSocket disconnected. Reconnecting...');
      setTimeout(connect, 5000);
    });

    orderBookSocket.on('error', (error) => {
      console.error('Order Book WebSocket error:', error);
      orderBookSocket.close(); // close the socket if any error
    });
  }

  connect();
};

// fetch data from REST api
exports.fetchOrderBookData = async () => {
  const response = await axios.get('https://api.binance.com/api/v3/depth?symbol=SOLUSDT');
  return response.data;
};
