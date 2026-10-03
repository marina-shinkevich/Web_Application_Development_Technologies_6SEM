using Microsoft.Data.SqlClient;
using Dapper;

var builder = WebApplication.CreateBuilder(args);


builder.WebHost.ConfigureKestrel(options => options.ListenAnyIP(3005));

var app = builder.Build();
app.UseRouting();

var connectionString = builder.Configuration.GetConnectionString("Default") 
    ?? "Server=127.0.0.1,1435;Database=Celebrities;User Id=sa;Password=SuperSafe_Passw0rd_2026;Encrypt=False;TrustServerCertificate=True;";

try
{
    using var connection = new SqlConnection(connectionString);
    await connection.OpenAsync();
    Console.WriteLine("DB Connected");
}
catch (Exception ex)
{
    Console.WriteLine($"DB Error: {ex.Message}");
}


app.MapGet("/api/celebrities", async () =>
{
    using var db = new SqlConnection(connectionString);
    var result = await db.QueryAsync("SELECT * FROM Celebrities");
    return Results.Ok(result);
});


app.MapPost("/api/celebrities", async (Celebrity celebrity) =>
{
    using var db = new SqlConnection(connectionString);
    var sql = "INSERT INTO Celebrities (FullName, Nationality, ReqPhotoPath) VALUES (@FullName, @Nationality, @ReqPhotoPath)";
    

    await db.ExecuteAsync(sql, celebrity); 
    return Results.Json(new { message = "Added" }, statusCode: 201);
});


app.MapPut("/api/celebrities/{id:int}", async (int id, Celebrity celebrity) =>
{
    using var db = new SqlConnection(connectionString);
    var sql = "UPDATE Celebrities SET FullName = @FullName, Nationality = @Nationality, ReqPhotoPath = @ReqPhotoPath WHERE id = @Id";
    
   
    await db.ExecuteAsync(sql, new { Id = id, celebrity.FullName, celebrity.Nationality, celebrity.ReqPhotoPath });
    return Results.Ok(new { message = "Updated" });
});


app.MapDelete("/api/celebrities/{id:int}", async (int id) =>
{
    using var db = new SqlConnection(connectionString);
    var sql = "DELETE FROM Celebrities WHERE id = @Id";
    
    await db.ExecuteAsync(sql, new { Id = id });
    return Results.Ok(new { message = "Deleted" });
});

Console.WriteLine("API running on http://localhost:3005");
app.Run();


public record Celebrity(string FullName, string Nationality, string ReqPhotoPath);
