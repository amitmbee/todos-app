FROM node:10-alpine AS staticassets

RUN mkdir -p /todos-app/
WORKDIR /todos-app/
COPY ./ ./
RUN npm install
RUN npm run build


FROM nginx:1.15-alpine
RUN apk add --no-cache bash libssl1.0 openssh bash
WORKDIR /usr/share/nginx/html
COPY --from=staticassets /todos-app/build ./
COPY ./nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
