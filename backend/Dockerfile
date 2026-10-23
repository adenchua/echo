FROM node:24.22-alpine

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .

RUN npm run build

EXPOSE 5084

CMD ["npm", "run", "start:prod"]
