FROM python:3.10-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
EXPOSE 5005
EXPOSE 8000
CMD ["python3", "-c", "import subprocess; subprocess.Popen(['rasa', 'run', '--enable-api', '--cors', '*', '--port', '5005']); subprocess.run(['python3', '-m', 'http.server', '8000'])"]
