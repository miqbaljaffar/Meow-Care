const { WebSocketServer } = require('ws');
const http = require('http');

// Buat server HTTP standar
const server = http.createServer();

// Buat server WebSocket dan lampirkan ke server HTTP
const wss = new WebSocketServer({ noServer: true });

// Simpan semua koneksi klien yang aktif
const clients = new Set();

wss.on('connection', (ws) => {
  clients.add(ws);
  console.log('Client connected');

  ws.on('close', () => {
    clients.delete(ws);
    console.log('Client disconnected');
  });

  ws.on('error', (error) => {
    console.error('WebSocket error:', error);
    clients.delete(ws);
  });
});

// Fungsi untuk menyiarkan pesan ke semua klien
function broadcast(data) {
  const message = JSON.stringify(data);
  for (const client of clients) {
    if (client.readyState === 1) { // 1 artinya OPEN
      client.send(message);
    }
  }
}

// Handler untuk upgrade koneksi HTTP ke WebSocket
server.on('upgrade', (request, socket, head) => {
  wss.handleUpgrade(request, socket, head, (ws) => {
    wss.emit('connection', ws, request);
  });
});

// API sederhana untuk Next.js bisa mengirim pesan ke server ini
server.on('request', (req, res) => {
  if (req.method === 'POST' && req.url === '/broadcast') {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      try {
        const data = JSON.parse(body);
        broadcast(data);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true, message: 'Broadcast successful' }));
      } catch (e) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, message: 'Invalid JSON' }));
      }
    });
  } else {
    res.writeHead(404);
    res.end();
  }
});

const port = process.env.WEBSOCKET_PORT || 3001;
server.listen(port, () => {
  console.log(`WebSocket server is running on ws://localhost:${port}`);
});