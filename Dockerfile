FROM node:12.18 as development

WORKDIR /usr/src/app

COPY package.json ./

COPY yarn.lock ./

RUN yarn --frozen-lockfile

COPY . .

RUN yarn build

FROM node:12.18-alpine as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package.json ./

COPY yarn.lock ./

RUN yarn install --production

COPY --from=development /usr/src/app/dist ./dist

EXPOSE 3000

CMD ["node", "dist/main"]
