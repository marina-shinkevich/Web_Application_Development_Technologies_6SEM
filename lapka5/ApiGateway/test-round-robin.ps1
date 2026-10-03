[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

$url = "http://localhost:5000/lb"
$methods = @("GET", "POST", "PUT", "DELETE")
$counts = @{ "X" = 0; "Y" = 0; "Z" = 0 }

Write-Host "Starting Round Robin Test..." -ForegroundColor Cyan

foreach ($method in $methods) {
    Write-Host "Method: $method"
    for ($i = 1; $i -le 20; $i++) {
        try {
            $response = Invoke-RestMethod -Uri $url -Method $method
            $nick = $response.nick
            if ($nick) { $counts[$nick]++ }
        } catch {
            Write-Host "Gateway error!" -ForegroundColor Red
        }
    }
}

Write-Host "`n--- FINAL ROUND ROBIN RESULTS ---" -ForegroundColor Green
$counts.GetEnumerator() | Sort-Object Name | Format-Table -AutoSize

# Анализ
$total = $counts["X"] + $counts["Y"] + $counts["Z"]
Write-Host "`nTotal requests: $total"
Write-Host "Expected (ideal Round Robin): ~66-67 each"
Write-Host ""
Write-Host "Server X: $($counts['X']) ($([math]::Round($counts['X']/$total*100, 1))%)"
Write-Host "Server Y: $($counts['Y']) ($([math]::Round($counts['Y']/$total*100, 1))%)"
Write-Host "Server Z: $($counts['Z']) ($([math]::Round($counts['Z']/$total*100, 1))%)"