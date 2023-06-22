#!/usr/bin/env bash
# exit on error
set -o errexit

poetry install
poetry lock
python manage.py collectstatic
python manage.py makemigrations core
python manage.py migrate
