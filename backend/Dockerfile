# FROM python:3

# RUN apt-get -y install binutils libproj-dev gdal-bin

# RUN mkdir /code
# WORKDIR /code

# RUN ["python", "manage.py", "runserver", "0.0.0.0:8000"]

FROM python:3

ENV PYTHONUNBUFFERED 1

RUN apt-get update -y
RUN apt-get -y install binutils libproj-dev gdal-bin

RUN mkdir /code
WORKDIR /code

ADD requirements.txt /code/

RUN pip install -r requirements.txt

ADD . /code/

#CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]

EXPOSE 8000

CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]