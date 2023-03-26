FROM node:alpine as build

WORKDIR /app
COPY package.json /app/package.json
COPY package-lock.json /app/package-lock.json
ENV REACT_APP_SERVER_URL https://api.mediatation.tokyo/api
RUN yarn --silent
COPY . /app
RUN yarn build

# Nginx setup
FROM nginx:alpine
# Copy config nginx
COPY --from=build /app/.nginx/nginx.conf /etc/nginx/conf.d/default.conf
WORKDIR /usr/share/nginx/html
# Remove default nginx static assets
RUN rm -rf ./*
# Copy static assets from builder stage
COPY --from=build /app/build .
# Containers run nginx with global directives and daemon off
ENTRYPOINT ["nginx", "-g", "daemon off;"]