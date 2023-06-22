#!/usr/bin/env bash
# exit on error
set -o errexit

pip install --upgrade pip; pip install poetry; .venv/bin/poetry install

python manage.py collectstatic
python manage.py makemigrations core
python manage.py migrate
