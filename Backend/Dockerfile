# backend/Dockerfile
FROM python:3.13-slim
# Set environment variables to avoid buffering issues and to define the Python version
ENV PYTHONUNBUFFERED=1
ENV PYTHONPATH=/app

# Copy the requirements.txt file into the container at /app
COPY requirements.txt /app/

# Install any needed dependencies specified in requirements.txt
RUN pip install --no-cache-dir -r /app/requirements.txt

# Copy the current directory contents into the container at /app
COPY . /app/

EXPOSE 8000

RUN chmod +x /app/entrypoint.sh
ENTRYPOINT ["/bin/bash","/app/entrypoint.sh"]

CMD ["gunicorn", "webproject.wsgi", "--bind", ":8000"]
