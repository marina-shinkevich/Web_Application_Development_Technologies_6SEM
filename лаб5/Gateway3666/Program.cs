using Ocelot.DependencyInjection;
using Ocelot.Middleware;
using Ocelot.LoadBalancer.LoadBalancers;
using Ocelot.Responses;
using Ocelot.Values;
using Microsoft.AspNetCore.Http;
using System.Linq;

var builder = WebApplication.CreateBuilder(args);

builder.Configuration.AddJsonFile("ocelot.json", optional: false, reloadOnChange: true);

builder.Services
    .AddOcelot()
    .AddCustomLoadBalancer<MyWeightsBalancer>((provider, route, serviceDiscovery) =>
    {
        return new MyWeightsBalancer(serviceDiscovery.GetAsync);
    });

var app = builder.Build();

await app.UseOcelot();

app.Run();

public class MyWeightsBalancer : ILoadBalancer
{
    private readonly Func<Task<List<Service>>> _services;
    private readonly Random _random = new();

    public MyWeightsBalancer(Func<Task<List<Service>>> services)
    {
        _services = services;
    }

    public async Task<Response<ServiceHostAndPort>> Lease(HttpContext httpContext)
    {
        var services = await _services();

        int roll = _random.Next(1, 101);
        Service selected;

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