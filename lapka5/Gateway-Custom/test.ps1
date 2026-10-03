[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

$url = "http://localhost:5000/lb"
$methods = @("GET", "POST", "PUT", "DELETE")
$counts = @{ "X" = 0; "Y" = 0; "Z" = 0 }

Write-Host "Starting Weighted Test (50/30/20)..." -ForegroundColor Cyan

foreach ($method in $methods) {
    Write-Host "Method: $method"
    for ($i = 1; $i -le 50; $i++) {
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