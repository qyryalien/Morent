#!/usr/bin/env bash
# exit on error
set -o errexit

poetry add $( cat requirements.txt )
poetry install

python manage.py collectstatic
python manage.py makemigrations core
python manage.py migrate
