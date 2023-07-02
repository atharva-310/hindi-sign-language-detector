FROM matthewfeickert/docker-python3-ubuntu:latest

WORKDIR /home/docker/data

COPY requirements.txt ./

RUN pip install -r requirements.txt 

RUN pip install opencv-python-headless

COPY . .

# CMD [ "uvicorn" "app:app" "--host=0.0.0.0" "--port=${PORT:-5000}" ]
# CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "80", "--proxy-headers"]
CMD ["gunicorn", "app:app", "--workers", "4", "--worker-class", "uvicorn.workers.UvicornWorker"]