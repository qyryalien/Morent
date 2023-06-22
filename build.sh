#!/usr/bin/env bash
# exit on error
set -o errexit

cd FrontEnd
npm run build
mkdir -p build/root
for file in $(ls build | grep -E -v '^(index\.html|static|root)$'); do
    mv "build/$file" build/root;
done

cd ..

pip install --upgrade pip; pip install poetry; /opt/render/project/src/.venv/bin/poetry install
python manage.py collectstatic --no-input
python manage.py migrate
