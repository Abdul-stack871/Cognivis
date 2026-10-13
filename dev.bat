@echo off
echo ========================================================
echo Starting Cognivis - Multimodal Document Intelligence
echo ========================================================
echo Frontend: http://localhost:5173
echo Backend:  http://localhost:8000
echo API Docs: http://localhost:8000/docs
echo ========================================================
echo.

start "Cognivis Backend (FastAPI)" cmd /k ".venv\Scripts\python.exe -m uvicorn backend.main:app --host 127.0.0.1 --port 8000 --reload"
timeout /t 2 /nobreak >nul
call npm.cmd run dev
pause

