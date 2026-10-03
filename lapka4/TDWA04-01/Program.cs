var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

if (args.Length < 2)
{
    Console.WriteLine("Usage: TDWA04-01 <Nick> <Port>");
    return;
}

string nick = args[0];
int port = int.Parse(args[1]);

app.Urls.Add($"http://*:{port}");

app.Map("/A", async context =>
{
    var response = new
    {
        Nick = nick,
        Method = context.Request.Method
    };
    await context.Response.WriteAsJsonAsync(response);
});

app.Run();