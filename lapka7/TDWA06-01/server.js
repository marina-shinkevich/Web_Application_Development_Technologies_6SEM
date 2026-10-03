const express = require("express");
const sql = require("mssql");

const app = express().use(express.json());
const PORT = 3005;

const config = {
    user: "sa",
    password: "SuperSafe_Passw0rd_2026",
    server: "127.0.0.1",
    port: 1435,
    database: "Celebrities",
    options: { encrypt: false, trustServerCertificate: true }
};


const poolPromise = new sql.ConnectionPool(config).connect()
    .then(pool => { console.log("DB Connected"); return pool; })
    .catch(err => console.log("DB Error", err));


app.post("/api/celebrities", async (req, res) => {
    const { FullNmae, Nationality, ReqPhotoPath } = req.body;
    const pool = await poolPromise;
    await pool.request().query(`INSERT INTO Celebrities VALUES (N'${FullNmae}', N'${Nationality}', ${ReqPhotoPath})`);
    res.status(201).json({ message: "Added" });
});


app.get("/api/celebrities", async (req, res) => {
    const pool = await poolPromise;
    const result = await pool.request().query("SELECT * FROM Celebrities");
    res.json(result.recordset);
});

app.put("/api/celebrities/:id", async (req, res) => {
    const { id } = req.params;
    const {FullName, Nationality, ReqPhotoPath } = req.body;
    const pool = await poolPromise;
    await pool.request().query(`UPDATE Celebrities SET FullName=N'${FullName}', Nationality=N'${Nationality}', ReqPhotoPath=${ReqPhotoPath} WHERE id=${id}`);
    res.json({ message: "Updated" });
});


app.delete("/api/celebrities/:id", async (req, res) => {
    const pool = await poolPromise;
    await pool.request().query(`DELETE FROM Celebrities WHERE id=${req.params.id}`);
    res.json({ message: "Deleted" });
});

app.listen(PORT, () => console.log(`API running on http://localhost:${PORT}`));


setInterval(() => {}, 600000);