FROM node:alpine as development

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install
COPY tsconfig.json tsconfig.json
COPY nest-cli.json nest-cli.json

COPY apps/payments apps/payments
COPY libs libs

RUN npm run build payments

FROM node:alpine as production

ARG NODE_ENV=production
ENV NOD_ENV=${NODE_ENV}

COPY package*.json ./

RUN npm install --only=production

COPY --from=development /usr/src/app/dist ./dist

CMD ["node", "dist/apps/payments/main"]
