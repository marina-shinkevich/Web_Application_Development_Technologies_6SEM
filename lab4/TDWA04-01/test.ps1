Write-Host "1) GET http://localhost:3001/A"
curl.exe -X GET "http://localhost:3001/A"
Write-Host "`n`n"

Write-Host "2) POST http://localhost:3002/A"
curl.exe -X POST "http://localhost:3002/A"
Write-Host "`n`n"

Write-Host "3) PUT http://localhost:3003/A"
curl.exe -X PUT "http://localhost:3003/A"
Write-Host "`n`n"


Write-Host "4) GET http://localhost:5000/api"
curl.exe -X GET "http://localhost:5000/api"
Write-Host "`n`n"

Write-Host "5) POST http://localhost:5000/api"
curl.exe --% -X POST http://localhost:5000/api -H "Content-Type: application/json" -d '{"message":"hello from curl"}'
Write-Host "`n`n"

Write-Host "6) PUT http://localhost:5000/api"
curl.exe --% -X PUT http://localhost:5000/api -H "Content-Type: application/json" -d '{"value":123}'
Write-Host "`n`n"

Write-Host "7) DELETE http://localhost:5000/api"
curl.exe -X DELETE "http://localhost:5000/api"
Write-Host "`n`n"
