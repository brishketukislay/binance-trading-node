const orderBookModel = require('../models/orderBookModel');

// WebSocket connection
exports.connectOrderBookWebSocket = (wss) => {
  orderBookModel.connectOrderBookWebSocket(wss);
};

exports.getOrderBookData = async (req, res) => {
  try {
    const data = await orderBookModel.fetchOrderBookData();
    res.json(data);
  } catch (error) {
    console.error('Error fetching order book data:', error);
    res.status(500).send('Error fetching order book data');
  }
};
