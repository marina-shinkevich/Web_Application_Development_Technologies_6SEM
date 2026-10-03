const express = require("express");
const sql = require("mssql");

const app = express();
app.use(express.json());
const PORT = 3005;

const config = {
    user: "sa",
    password: "SuperSafe_Passw0rd_2026",
    server: "127.0.0.1",
    port: 1435,
    database: "Celebrities",
    options: { encrypt: false, trustServerCertificate: true }
};

let pool;
(async () => {
    pool = await sql.connect(config);
    console.log("DB Connected");
})();

app.post("/api/celebrities", async (req, res) => {
    const { FullName, Nationality, ReqPhotoPath } = req.body;  
    await pool.request()
        .input('FullName', sql.NVarChar, FullName?.substring(0, 100))
        .input('Nationality', sql.NVarChar, Nationality?.substring(0, 50))
        .input('ReqPhotoPath', sql.NVarChar, ReqPhotoPath?.substring(0, 200))
        .query('INSERT INTO Celebrities (FullName, Nationality, ReqPhotoPath) VALUES (@FullName, @Nationality, @ReqPhotoPath)');
    
    res.status(201).json({ message: "Added" });
});

app.get("/api/celebrities", async (req, res) => {
    const result = await pool.request().query("SELECT * FROM Celebrities");
    res.json(result.recordset);
});


app.put("/api/celebrities/:id", async (req, res) => {
    const { id } = req.params;
    const { FullName, Nationality, ReqPhotoPath } = req.body; 
    
    await pool.request()
        .input('FullName', sql.NVarChar, FullName)
        .input('Nationality', sql.NVarChar, Nationality)
        .input('ReqPhotoPath', sql.NVarChar, ReqPhotoPath)
        .input('id', sql.Int, id)
        .query('UPDATE Celebrities SET FullName=@FullName, Nationality=@Nationality, ReqPhotoPath=@ReqPhotoPath WHERE id=@id');
    
    res.json({ message: "Updated" });
});


app.delete("/api/celebrities/:id", async (req, res) => {
    await pool.request()
        .input('id', sql.Int, req.params.id)
        .query('DELETE FROM Celebrities WHERE id=@id');
    
    res.json({ message: "Deleted" });
});

app.listen(PORT, () => console.log(`API running on http://localhost:${PORT}`));