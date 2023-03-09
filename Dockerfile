FROM --platform=linux/amd64 node:19.5.0-alpine3.16 AS builder

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY package.json /app
COPY package-lock.json /app

RUN npm install --silent -y
RUN npm install react-scripts@3.4.1 -g --silent

COPY . .
RUN npm run build

FROM --platform=linux/amd64 nginx:latest AS runner

COPY --from=builder /app/build /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]