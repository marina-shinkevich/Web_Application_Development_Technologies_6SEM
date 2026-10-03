@echo off
echo -------------------------------------------
echo Test API Gateway
echo -------------------------------------------
echo.

echo 1. Correct requests for API Gateway:
echo ----------------------------------------
echo GET /apiX -> Server X:
curl.exe -X GET http://localhost:5000/apiX
echo.

echo POST /apiY -> Server Y:
curl.exe -X POST http://localhost:5000/apiY
echo.

echo PUT /apiZ -> Server Z:
curl.exe -X PUT http://localhost:5000/apiZ
echo.

echo DELETE /apiZ -> Server Z:
curl.exe -X DELETE http://localhost:5000/apiZ
echo.

echo 2. Check for incorrect routing:
echo -----------------------------------------------------------
echo GET /apiY :
curl.exe -X GET http://localhost:5000/apiY -f
echo.

echo POST /apiX :
curl.exe -X POST http://localhost:5000/apiX -f
echo.

echo PUT /apiY :
curl.exe -X PUT http://localhost:5000/apiY -f
echo.

echo DELETE /apiX :
curl.exe -X DELETE http://localhost:5000/apiX -f
echo.

echo --------------------------------------------
echo all Success 
echo --------------------------------------------
pause