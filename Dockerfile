version: "3.9"

services:
  db:
    image: mysql:8.0
    container_name: ecommerce_db
    restart: always
    environment:
      MYSQL_ROOT_PASSWORD: root
      MYSQL_DATABASE: ecommerce_db
    ports:
      - "3306:3306"
    volumes:
      - mysql_data:/var/lib/mysql
      - ./backend/db_schema.sql:/docker-entrypoint-initdb.d/schema.sql

  backend:
    build: ./backend
    container_name: ecommerce_backend
    env_file:
      - ./backend/.env.example
    depends_on:
      - db
    ports:
      - "8000:8000"

  frontend:
    build: ./frontend
    container_name: ecommerce_frontend
    depends_on:
      - backend
    ports:
      - "5173:5173"

volumes:
  mysql_data:
