FROM node:16

EXPOSE 8887

WORKDIR /app
ADD packages/api /app

RUN chown -R www-data:www-data /app
RUN npm i

USER www-data

CMD npm run dev
