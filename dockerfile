# build stage
FROM node:18.7-alpine as build-stage

WORKDIR /app
COPY package*.json ./
RUN npm set strict-ssl false
RUN node -v
RUN npm -v
RUN npm i npm@8.18.0
RUN npm -v
RUN npm install
COPY . .
RUN npm run build

# production stage
FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
