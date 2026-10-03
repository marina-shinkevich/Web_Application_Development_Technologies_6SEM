var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

if (args.Length < 3)
{
    Console.WriteLine("Usage: TDWA05-01 <Nick> <Port> <Delay>");
    return;
}

string nick = args[0];
int port = int.Parse(args[1]);
int delay = int.Parse(args[2]);

app.Urls.Add($"http://*:{port}");

app.Map("/A", async context =>
{
    int actualDelay = 0;
    string method = context.Request.Method;
    
    switch (method)
    {
        case "GET":
            actualDelay = (int)(delay * 1.0 / 3);
            break;
        case "POST":
            actualDelay = (int)(delay * 2.0 / 3);
            break;
        case "PUT":
            actualDelay = delay;
            break;
        case "DELETE":
            actualDelay = (int)(delay * 1.0 / 4);
            break;
        default:
            actualDelay = 0;
            break;
    }
    
    await Task.Delay(actualDelay);
    
    var response = new
    {
        Nick = nick,
        Method = method,
        Delay = delay,
        ActualDelay = actualDelay
    };
    
    await context.Response.WriteAsJsonAsync(response);
});

app.Run();