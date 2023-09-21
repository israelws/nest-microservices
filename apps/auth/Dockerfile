FROM node:alpine as development

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install
COPY tsconfig.json tsconfig.json

COPY apps/auth /apps/auth
COPY libs libs

RUN npm run build auth

FROM node:alpine as production

ARG NODE_ENV=production
ENV NOD_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --only=production

COPY --from=development /usr/src/app/dist ./dist

CMD ["node", "dist/apps/auth/main"]
