FROM python:3.10.0-buster

ENV HOME=/app
WORKDIR $HOME

# set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# create the appropriate directories
RUN mkdir /app/static
RUN mkdir /app/media


RUN apt-get update \
	&& apt-get install -y --no-install-recommends \
		postgresql-client


ADD . .

# install dependencies
RUN pip install --upgrade pip
RUN pip install -r /app/requirements.txt

RUN sed -i 's/\r$//g' $HOME/entrypoint.sh
RUN chmod +x $HOME/entrypoint.sh
RUN sh entrypoint.sh


CMD exec gunicorn --bind 0.0.0.0:8080 --workers 1 --threads 8 --timeout 0 api_financial.wsgi:application --reload
