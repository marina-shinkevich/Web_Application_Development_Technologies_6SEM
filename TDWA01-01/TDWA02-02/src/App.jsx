import { useState } from 'react'
import './App.css'

function App() {
  const [op, setOp] = useState('');
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [status, setStatus] = useState('—');
  const [response, setResponse] = useState('Ответ будет здесь');

  const baseUrl = '/api/Save-JSON';

  const sendRequest = async (method, body = null) => {
    const options = { method, headers: {} };
    if (body) {
      options.headers['Content-Type'] = 'application/json';
      options.body = JSON.stringify(body);
    }

    try {
      const res = await fetch(baseUrl, options);
      const text = await res.text();
      let data;
      try { data = text ? JSON.parse(text) : null; } catch { data = text; }

      setStatus(`${res.status} ${res.statusText}`);
      setResponse(data ? JSON.stringify(data, null, 2) : '(пустой ответ)');
    } catch (err) {
      setStatus('Ошибка');
      setResponse(err.message);
    }
  };

  return (
    <div className="container">
      <h1>TDWA02-02 – SPA React Client</h1>

      <div className="form">
        <label>Операция (op): 
          <input type="text" value={op} onChange={(e) => setOp(e.target.value)} placeholder="add | sub..." />
        </label>
        <label>x: 
          <input type="number" value={x} onChange={(e) => setX(Number(e.target.value))} />
        </label>
        <label>y: 
          <input type="number" value={y} onChange={(e) => setY(Number(e.target.value))} />
        </label>
      </div>

      <div className="buttons">
        <button onClick={() => sendRequest('GET')}>GET</button>
        <button onClick={() => sendRequest('POST', { op, x, y })}>POST</button>
        <button onClick={() => sendRequest('PUT', { op, x, y })}>PUT</button>
        <button onClick={() => sendRequest('DELETE')}>DELETE</button>
      </div>

      <div className="result">
        <h2>Результат</h2>
        <p><strong>HTTP статус:</strong> <span>{status}</span></p>
        <pre>{response}</pre>
      </div>
    </div>
  )
}

export default App