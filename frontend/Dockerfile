FROM node:20.9.0 AS build

WORKDIR /app

COPY . .

RUN npm install

RUN npm run build

# EXPOSE 3000
# CMD ["npm", "run","start"]
# docker build -t my-app .
# docker run -p 3000:3000 my-app


FROM nginx:alpine
COPY --from=build /app/public /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

# docker build -t my-app .
# docker run --name my-app -p 3000:80 my-app