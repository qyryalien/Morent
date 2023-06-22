#!/usr/bin/env bash
# exit on error
set -o errexit

cd FrontEnd
npm run build
mkdir -p build/root

cd ..

pip install --upgrade pip; pip install poetry; /opt/render/project/src/.venv/bin/poetry install
python manage.py collectstatic --no-input
python manage.py migrate
