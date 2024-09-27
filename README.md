It's a Node.js application that streams real-time candlestick and order book data for the SOL/USDT trading pair using the Binance WebSocket API and provides historical data via REST API.

Installation
Clone the repository:

1. Clone repo using
git clone https://github.com/yourusername/trading-node.git

2. navigate to the trading-node folder
cd trading-node

3.Install dependencies:
npm install

4. Run the code:
node server.js

5. REST API Endpoints
GET /api/candlestick: Get historical 1-minute candlestick data.
GET /api/orderbook: Get current order book data.

6. WebSocket
WebSocket server runs on ws://localhost:8080.
