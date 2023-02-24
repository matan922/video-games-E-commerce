# base image
FROM mysql:8

# set the default timezone to UTC
ENV TZ=UTC

# add the initialization script
COPY ./init.sql /docker-entrypoint-initdb.d/
