FROM node:22.12-alpine

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .

RUN npm run build

EXPOSE 5084

CMD ["npm", "run", "start:prod"]
