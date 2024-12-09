FROM node:22-alpine

WORKDIR /app

COPY . ./

RUN npm install \
    && npm run build

EXPOSE 80 5173

CMD [ "npm run preview" ]