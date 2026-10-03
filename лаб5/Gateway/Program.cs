using Ocelot.DependencyInjection;
using Ocelot.Middleware;
using Ocelot.Responses;
using Ocelot.Values;
using Ocelot.LoadBalancer.LoadBalancers;

var builder = WebApplication.CreateBuilder(args);

builder.Configuration.AddJsonFile("ocelot.json", optional: false, reloadOnChange: true);

// Регистрация Ocelot с указанием типа нашего балансировщика
builder.Services.AddOcelot()
    .AddCustomLoadBalancer<WeightedLoadBalancer>((provider, route, serviceDiscovery) => 
        new WeightedLoadBalancer(serviceDiscovery.GetAsync));

var app = builder.Build();
await app.UseOcelot();
app.Run();

public class WeightedLoadBalancer : ILoadBalancer
{
    private readonly Func<Task<List<Service>>> _services;
    private readonly Random _random = new();

    // 1. Добавили свойство Type (требование новой версии)
    public string Type => nameof(WeightedLoadBalancer);

    public WeightedLoadBalancer(Func<Task<List<Service>>> services)
    {
        _services = services;
    }

    // 2. Переименовали Lease в LeaseAsync (требование новой версии)
    public async Task<Response<ServiceHostAndPort>> LeaseAsync(HttpContext httpContext)
    {
        var services = await _services();
        
        if (services == null || services.Count == 0)
        {
            return new ErrorResponse<ServiceHostAndPort>(new List<Ocelot.Errors.Error>());
        }

        int roll = _random.Next(1, 101);
        Service selected;

        // Логика весов: 3001 (50%), 3002 (30%), 3003 (20%)
        if (roll <= 50) 
            selected = services.FirstOrDefault(s => s.HostAndPort.DownstreamPort == 3001) ?? services[0];
        else if (roll <= 80) 
            selected = services.FirstOrDefault(s => s.HostAndPort.DownstreamPort == 3002) ?? services[0];
        else 
            selected = services.FirstOrDefault(s => s.HostAndPort.DownstreamPort == 3003) ?? services[0];

        return new OkResponse<ServiceHostAndPort>(selected.HostAndPort);
    }

    public void Release(ServiceHostAndPort hostAndPort) { }
}