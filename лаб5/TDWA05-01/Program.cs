var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

string nick = args.FirstOrDefault(a => a.StartsWith("--Nick="))?.Split('=')[1] ?? "Default";
int delay = int.Parse(args.FirstOrDefault(a => a.StartsWith("--Delay="))?.Split('=')[1] ?? "0");

app.MapGet("/A", async () => { 
    await Task.Delay(delay / 3); 
    return Results.Json(new { Nick = nick, Method = "GET" }); 
});

app.MapPost("/A", async () => { 
    await Task.Delay(delay * 2 / 3); 
    return Results.Json(new { Nick = nick, Method = "POST" }); 
});

app.MapPut("/A", async () => { 
    await Task.Delay(delay); 
    return Results.Json(new { Nick = nick, Method = "PUT" }); 
});

app.MapDelete("/A", async () => { 
    await Task.Delay(delay / 4); 
    return Results.Json(new { Nick = nick, Method = "DELETE" }); 
});

app.Run();