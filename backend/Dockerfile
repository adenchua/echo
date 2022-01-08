FROM node:16.13

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .

EXPOSE 5084

CMD ["npm", "start"]