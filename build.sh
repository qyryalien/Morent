#!/usr/bin/env bash
# exit on error
set -o errexit

pip install --upgrade pip; pip install poetry; /opt/render/project/src/.venv/bin/poetry install
python manage.py collectstatic --clear
python manage.py findstatic 4.png
python manage.py makemigrations core
python manage.py migrate
