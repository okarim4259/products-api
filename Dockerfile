FROM node:alpine
WORKDIR "/app"
COPY ./package.json ./
RUN npm install
COPY . .
EXPOSE 8088
CMD ["npm", "run", "dev"]