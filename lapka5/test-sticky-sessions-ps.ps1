[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

$url = "http://localhost:5005/lb-sticky"
$methods = @("GET", "POST", "PUT", "DELETE")
$counts = @{ "X" = 0; "Y" = 0; "Z" = 0 }

Write-Host "Starting Sticky Sessions Test..." -ForegroundColor Cyan

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

Write-Host "`n--- FINAL STICKY SESSIONS RESULTS ---" -ForegroundColor Green
$counts.GetEnumerator() | Sort-Object Name | Format-Table -AutoSize

# Анализ
$total = $counts["X"] + $counts["Y"] + $counts["Z"]
Write-Host "`nTotal requests: $total"
Write-Host "Note: Sticky Sessions may stick to one server"
Write-Host ""
Write-Host "Server X: $($counts['X']) ($([math]::Round($counts['X']/$total*100, 1))%)"
Write-Host "Server Y: $($counts['Y']) ($([math]::Round($counts['Y']/$total*100, 1))%)"
Write-Host "Server Z: $($counts['Z']) ($([math]::Round($counts['Z']/$total*100, 1))%)"

# Проверка на "прилипание"
$max = ($counts["X"], $counts["Y"], $counts["Z"] | Measure-Object -Maximum).Maximum
if ($max / $total -gt 0.6) {
    Write-Host "`n✅ Sticky Sessions detected: one server got $([math]::Round($max/$total*100, 1))% of requests" -ForegroundColor Green
} else {
    Write-Host "`n⚠️  Not very sticky distribution" -ForegroundColor Yellow
}