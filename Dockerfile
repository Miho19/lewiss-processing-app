FROM node:22-alpine AS builder
WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

# run tests here?
RUN npm run build

FROM nginx:stable-alpine
WORKDIR /usr/share/nginx/html

RUN rm -rf ./*

COPY --from=builder /app/dist .


COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD [ "nginx", "-g", "daemon off;" ]
