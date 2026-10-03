[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

$url = "http://localhost:5000/lb"
$methods = @("GET", "POST", "PUT", "DELETE")
$counts = @{ "X" = 0; "Y" = 0; "Z" = 0 }

Write-Host "Starting Weighted Test (50/30/20)..." -ForegroundColor Cyan

foreach ($method in $methods) {
    Write-Host "Method: $method"
    for ($i = 1; $i -le 10; $i++) {
        try {
            $response = Invoke-RestMethod -Uri $url -Method $method
            $nick = $response.nick
            if ($nick) { $counts[$nick]++ }
        } catch {
            Write-Host "Gateway error!" -ForegroundColor Red
        }
    }
}

Write-Host "`n--- FINAL WEIGHTED RESULTS ---" -ForegroundColor Green
$counts.GetEnumerator() | Sort-Object Name | Format-Table -AutoSize

# Анализ
$total = $counts["X"] + $counts["Y"] + $counts["Z"]
Write-Host "`nTotal requests: $total"
Write-Host "Expected: X=100 (50%), Y=60 (30%), Z=40 (20%)"
Write-Host ""
Write-Host "Server X: $($counts['X']) ($([math]::Round($counts['X']/$total*100, 1))%)"
Write-Host "Server Y: $($counts['Y']) ($([math]::Round($counts['Y']/$total*100, 1))%)"
Write-Host "Server Z: $($counts['Z']) ($([math]::Round($counts['Z']/$total*100, 1))%)"

# Проверка соответствия
$expectedX = 100
$expectedY = 60
$expectedZ = 40

$diffX = [math]::Abs($counts['X'] - $expectedX)
$diffY = [math]::Abs($counts['Y'] - $expectedY)
$diffZ = [math]::Abs($counts['Z'] - $expectedZ)

if ($diffX -le 15 -and $diffY -le 10 -and $diffZ -le 10) {
    Write-Host "`n✅ Weighted balancer working correctly" -ForegroundColor Green
} else {
    Write-Host "`n⚠️  Deviation from expected distribution" -ForegroundColor Yellow
}