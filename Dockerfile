FROM node:lts AS development
WORKDIR /app
COPY package.json /app/package.json
COPY package-lock.json /app/package-lock.json

RUN npm ci
COPY . /app
ENV CI=true
ENV REACT_APP_SERVER_URL=https://api.mediatation.tokyo/api
CMD [ "npm", "start" ]
FROM development AS build
RUN npm run build
# Nginx setup
FROM nginx:alpine
COPY --from=build /app/.nginx/nginx.conf /etc/nginx/conf.d/default.conf
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=build /app/build .
ENTRYPOINT ["nginx", "-g", "daemon off;"]