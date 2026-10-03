$url = "http://localhost:5243/lb"
$methods = @("GET", "POST", "PUT", "DELETE")
$counts = @{ "X" = 0; "Y" = 0; "Z" = 0 }

Write-Host "Запуск 200 запросов. Подождите пару минут..." -ForegroundColor Cyan

foreach ($method in $methods) {
    for ($i = 1; $i -le 50; $i++) {
        # Отправляем запрос и конвертируем JSON-ответ
        $response = Invoke-RestMethod -Uri $url -Method $method
        $nick = $response.nick # В C# объекты часто сериализуются с маленькой буквы
        
        if ($nick) {
            $counts[$nick]++
        }
    }
}

Write-Host "Результаты балансировки:" -ForegroundColor Green
$counts.GetEnumerator() | Sort-Object Name | Format-Table -AutoSize