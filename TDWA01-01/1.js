const http = require('http');

const PORT = 40000;

let storedRequest = null;

function calculate(op, x, y) {
  switch (op) {
    case 'add': return x + y;
    case 'sub': return x - y;
    case 'mul': return x * y;
    case 'div': return x / y;
    default: return null;
  }
}

function getRequestBody(req, callback) {
  let body = '';
  req.on('data', chunk => {
    body += chunk.toString();
  });

  req.on('end', () => {
    try {
      const json = body ? JSON.parse(body) : null;
      callback(null, json);
    } catch (err) {
      callback(err, null);
    }
  });
}

const server = http.createServer((req, res) => {

  if (req.url !== '/NGINX-test') {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    return res.end('Not Found');
  }

  if (req.method === 'GET') {
    if (!storedRequest) {
      res.writeHead(404);
      return res.end();
    }

    const { op, x, y } = storedRequest;
    const result = calculate(op, x, y);

    res.writeHead(200, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify({ op, x, y, result }));
  }

  if (req.method === 'POST') {
    getRequestBody(req, (err, body) => {
      if (err || !body || typeof body.op !== 'string' || typeof body.x !== 'number' || typeof body.y !== 'number') {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ error: 'Invalid JSON structure. Expected { op, x, y }.' }));
      }

      const { op, x, y } = body;

      if (storedRequest &&
          storedRequest.op === op &&
          storedRequest.x === x &&
          storedRequest.y === y) {
        res.writeHead(409);
        return res.end();
      }

      const result = calculate(op, x, y);
      storedRequest = { op, x, y };

      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ op, x, y, result }));
    });

    return;
  }

  if (req.method === 'PUT') {
    if (!storedRequest) {
      res.writeHead(404);
      return res.end();
    }

    getRequestBody(req, (err, body) => {
      if (err || !body || typeof body.op !== 'string' || typeof body.x !== 'number' || typeof body.y !== 'number') {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ error: 'Invalid JSON structure. Expected { op, x, y }.' }));
      }

      const { op, x, y } = body;
      storedRequest = { op, x, y };
      const result = calculate(op, x, y);

      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ op, x, y, result }));
    });

    return;
  }

  if (req.method === 'DELETE') {
    if (!storedRequest) {
      res.writeHead(404);
      return res.end();
    }

    storedRequest = null;
    res.writeHead(200);
    return res.end();
  }

  res.writeHead(405);
  res.end();
});

server.listen(PORT, () => {
  console.log(`TDWA01-01 server running at http://localhost:${PORT}/NGINX-test`);
});
