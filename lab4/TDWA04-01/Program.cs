var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

string nick = args.FirstOrDefault(a => a.StartsWith("--Nick="))?.Split('=')[1] ?? "Default";

app.Map("/A", (HttpContext context) =>
{
    return Results.Json(new 
    { 
        Nick = nick, 
        Method = context.Request.Method 
    });
});

app.Run();