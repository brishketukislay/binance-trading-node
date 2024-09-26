const candlestickModel = require('../models/candlestickModel');

// WebSocket connection
exports.connectCandlestickWebSocket = (wss) => {
  candlestickModel.connectCandlestickWebSocket(wss);
};

exports.getCandlestickData = async (req, res) => {
  try {
    const data = await candlestickModel.fetchCandlestickData();
    res.json(data);
  } catch (error) {
    console.error('Error fetching candlestick data:', error);
    res.status(500).send('Error fetching candlestick data');
  }
};
