FROM node:20.11

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .

EXPOSE 5084

CMD ["npm", "start"]