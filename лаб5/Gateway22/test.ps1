$url = "http://localhost:5181/lb"
$methods = @("GET", "POST", "PUT", "DELETE")
$counts = @{ "X" = 0; "Y" = 0; "Z" = 0 }

# Создаем сессию для хранения Cookie
$session = New-Object Microsoft.PowerShell.Commands.WebRequestSession

Write-Host "Запуск 200 запросов (Sticky Sessions)..." -ForegroundColor Cyan

foreach ($method in $methods) {
    for ($i = 1; $i -le 50; $i++) {
        # Передаем параметр -WebSession
        $response = Invoke-RestMethod -Uri $url -Method $method -WebSession $session
        $nick = $response.nick
        if ($nick) { $counts[$nick]++ }
    }
}

Write-Host "Результаты Sticky Sessions:" -ForegroundColor Green
$counts.GetEnumerator() | Sort-Object Name | Format-Table -AutoSize