FROM node:19.5.0-alpine3.16 AS builder

WORKDIR /app

COPY . .
RUN npm ci

FROM nginx:1.23.4 AS runner
COPY --from=builder /app/build /usr/share/nginx/html
EXPOSE 80