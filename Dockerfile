FROM node:20-alpine

WORKDIR /usr/src/app

# Copia apenas os arquivos de dependência primeiro (melhora cache do build)
COPY package*.json ./

RUN npm install --omit=dev

# Copia o resto do código
COPY . .

EXPOSE 3000

CMD ["node", "app.js"]
