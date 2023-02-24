# base image
FROM python:3.9-alpine

# set working directory
WORKDIR /app

# add requirements.txt
COPY requirements.txt .

# install dependencies
RUN pip install -r requirements.txt

# copy the rest of the application code
COPY . .

# start the application
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
