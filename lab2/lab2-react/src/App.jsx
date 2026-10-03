import { useState } from 'react';
import './App.css';

const API_URL = 'http://localhost:20000/api/Save-JSON';

function App() {
	const [op, setOp] = useState('sub');
	const [x, setX] = useState(3);
	const [y, setY] = useState(5);
	const [status, setStatus] = useState(null);
	const [result, setResult] = useState(null);
	const [error, setError] = useState(null);

	function displayResult(statusCode, data, err = null) {
		setStatus(statusCode);
		setResult(data);
		setError(err);
	}

	async function handleGet() {
		try {
			const response = await fetch(API_URL, {
				method: 'GET',
				headers: { 'Content-Type': 'application/json' }
			});
			const data = await response.json();
			displayResult(response.status, data);
		} catch (err) {
			displayResult(0, null, err.message);
		}
	}

	async function handlePost() {
		const numX = parseFloat(x);
		const numY = parseFloat(y);
		if (isNaN(numX) || isNaN(numY)) {
			displayResult(400, null, 'X и Y должны быть числами');
			return;
		}
		try {
			const response = await fetch(API_URL, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ op, x: numX, y: numY })
			});
			const data = await response.json();
			displayResult(response.status, data);
		} catch (err) {
			displayResult(0, null, err.message);
		}
	}

	async function handlePut() {
		const numX = parseFloat(x);
		const numY = parseFloat(y);
		if (isNaN(numX) || isNaN(numY)) {
			displayResult(400, null, 'X и Y должны быть числами');
			return;
		}
		try {
			const response = await fetch(API_URL, {
				method: 'PUT',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ op, x: numX, y: numY })
			});
			const data = await response.json();
			displayResult(response.status, data);
		} catch (err) {
			displayResult(0, null, err.message);
		}
	}

	async function handleDelete() {
    try {
        const response = await fetch(API_URL, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' }
        });

        const text = await response.text();
        

        const data = text ? JSON.parse(text) : null;
        
        displayResult(response.status, data);
    } catch (err) {
        console.error('❌ Ошибка:', err);
        displayResult(0, null, err.message);
    }
}
	return (
		<div className="container">
			<div className="form-section">
				<h2>Ввод данных</h2>
				<div className="input-group">
					<label htmlFor="op">Операция (op):</label>
					<select
						id="op"
						value={op}
						onChange={e => setOp(e.target.value)}
					>
						<option value="add">add (сложение)</option>
						<option value="sub">sub (вычитание)</option>
						<option value="mul">mul (умножение)</option>
						<option value="div">div (деление)</option>
					</select>
				</div>
				<div className="input-group">
					<label htmlFor="x">X:</label>
					<input
						type="number"
						id="x"
						value={x}
						onChange={e => setX(e.target.value)}
					/>
				</div>
				<div className="input-group">
					<label htmlFor="y">Y:</label>
					<input
						type="number"
						id="y"
						value={y}
						onChange={e => setY(e.target.value)}
					/>
				</div>
			</div>

			<div className="buttons-section">
				<button
					type="button"
					className="btn btn-get"
					onClick={handleGet}
				>
					GET
				</button>
				<button
					type="button"
					className="btn btn-post"
					onClick={handlePost}
				>
					POST
				</button>
				<button
					type="button"
					className="btn btn-put"
					onClick={handlePut}
				>
					PUT
				</button>
				<button
					type="button"
					className="btn btn-delete"
					onClick={handleDelete}
				>
					DELETE
				</button>
			</div>

			<div className="result-section">
				<h2>Результат запроса</h2>
				{status != null && (
					<div
						className={
							status >= 200 && status < 300
								? 'status status-success'
								: 'status status-error'
						}
					>
						HTTP Status: {status}
					</div>
				)}
				{(result != null || error != null) && (
					<div className={`result ${error ? 'error' : 'success'}`}>
						{error
							? `Ошибка: ${error}`
							: JSON.stringify(result, null, 2)}
					</div>
				)}
			</div>
		</div>
	);
}

export default App;
