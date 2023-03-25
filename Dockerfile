FROM node:alpine as build

WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
ENV REACT_APP_SERVER_URL https://api.mediatation.tokyo/api
COPY ./package.json /app/
RUN yarn --silent

COPY . /app
RUN yarn build
# Nginx setup
FROM nginx:alpine
COPY --from=build .nginx/nginx.conf /etc/nginx/conf.d/default.conf
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=build /app/build .
ENTRYPOINT ["nginx", "-g", "daemon off;"]