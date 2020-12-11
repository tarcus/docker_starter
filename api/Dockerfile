#stage 1 base
FROM node:latest as base
WORKDIR /usr/src/app
COPY package*.json ./
#RUN npm install
COPY . .
EXPOSE 3000

#stage 2 production
FROM base as production
ENV NODE_ENV=production
RUN npm install --production
CMD ["npm", "start"]

#stage 3 development 
FROM base as dev
ENV NODE_ENV=development
RUN npm config set unsafe-perm true && npm install -g nodemon
RUN npm install
CMD ["npm", "run","start_dev"]