FROM node:20

WORKDIR /app

COPY package*.json ./

RUN npm ci --only=production

COPY . .

EXPOSE 6060

CMD ["node", "index.js"]