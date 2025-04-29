#!/bin/sh
echo "📍 Current directory:"
pwd

echo "📂 Listing current directory contents:"
ls -al

echo "📁 Listing contents of /app:"
ls -al /app
# Make migrations and migrate the database.
echo "Making migrations and migrating the database. "
python app/manage.py makemigrations --noinput
python app/manage.py migrate --noinput
python app/manage.py collectstatic --noinput
exec "$@"