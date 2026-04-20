FROM python:3.10-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
EXPOSE 5005
EXPOSE 8000
CMD ["sh", "-c", "rasa train --domain domain.yml --data data/ --out models/ && rasa run --enable-api --cors '*' --port 5005 --model models/ & python3 server.py"]
