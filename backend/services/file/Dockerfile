FROM node
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY ./services/file/package*.json ./services/file/
RUN cd services/file && npm install

COPY services/file ./services/file
COPY shared ./shared

WORKDIR /app/services/file

CMD [ "npm","start" ]