@echo off
echo Start test TDWA04-01
echo ---------------------------------
echo.

echo Server X :
echo --------------------
curl.exe -X GET http://localhost:5001/A
echo.
curl.exe -X POST http://localhost:5001/A
echo.
curl.exe -X PUT http://localhost:5001/A
echo.
curl.exe -X DELETE http://localhost:5001/A
echo.

echo Server Y :
echo --------------------
curl.exe -X GET http://localhost:5002/A
echo.
curl.exe -X POST http://localhost:5002/A
echo.
curl.exe -X PUT http://localhost:5002/A
echo.
curl.exe -X DELETE http://localhost:5002/A
echo.

echo Server Z:
echo --------------------
curl.exe -X GET http://localhost:5003/A
echo.
curl.exe -X POST http://localhost:5003/A
echo.
curl.exe -X PUT http://localhost:5003/A
echo.
curl.exe -X DELETE http://localhost:5003/A
echo.

echo ----------------------------------------
echo all Success 
echo =---------------------------------------
pauses