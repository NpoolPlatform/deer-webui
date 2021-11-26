FROM nginx:1.20

user ROOT

COPY dist/spa /usr/share/nginx/html
