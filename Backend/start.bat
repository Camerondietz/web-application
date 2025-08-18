Set-ExecutionPolicy RemoteSigned -Scope Process
call .venv/scripts/activate
python -m manage runserver
pause