const baseUrl = '/api/Save-JSON'; // пойдёт через NGINX на TDWA01-01

const opInput = document.getElementById('op');
const xInput  = document.getElementById('x');
const yInput  = document.getElementById('y');

const statusEl   = document.getElementById('status');
const responseEl = document.getElementById('response');

async function sendRequest(method, body) {
    const options = { method, headers: {} };

    if (body) {
        options.headers['Content-Type'] = 'application/json';
        options.body = JSON.stringify(body);
    }

    try {
        const res = await fetch(baseUrl, options);
        const text = await res.text();

        let data = null;
        try {
            data = text ? JSON.parse(text) : null;
        } catch {
            data = text || null;
        }

        statusEl.textContent = `${res.status} ${res.statusText}`;
        responseEl.textContent = data ? JSON.stringify(data, null, 2) : '(пустой ответ)';
    } catch (err) {
        statusEl.textContent = 'Ошибка';
        responseEl.textContent = err.message;
    }
}

document.getElementById('btn-get').addEventListener('click', () => {
    sendRequest('GET', null);
});

document.getElementById('btn-post').addEventListener('click', () => {
    const body = {
        op: opInput.value.trim(),
        x: Number(xInput.value),
        y: Number(yInput.value)
    };
    sendRequest('POST', body);
});

document.getElementById('btn-put').addEventListener('click', () => {
    const body = {
        op: opInput.value.trim(),
        x: Number(xInput.value),
        y: Number(yInput.value)
    };
    sendRequest('PUT', body);
});

document.getElementById('btn-delete').addEventListener('click', () => {
    sendRequest('DELETE', null);
});