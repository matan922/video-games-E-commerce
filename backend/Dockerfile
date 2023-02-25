# base image
FROM python:3.9-buster

# set working directory
WORKDIR /app

# add requirements.txt
COPY requirements.txt .

# RUN apt-get install default-libmysqlclient-dev

# install dependencies
RUN pip install -r requirements.txt

# copy the rest of the application code
COPY . .

# start the application
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]