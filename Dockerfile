FROM node:lts as build
ENV NPM_CONFIG_LOGLEVEL warn

COPY /package.json /package.json
COPY /package-lock.json /package-lock.json

RUN npm ci

COPY /tsconfig.json /tsconfig.json
COPY /tsconfig.build.json /tsconfig.build.json
COPY /nest-cli.json /nest-cli.json
COPY /src /src

RUN npm run build

FROM node:lts

COPY --from=build /dist /app/dist
COPY --from=build /node_modules /app/node_modules
COPY --from=build /package.json /app/package.json

WORKDIR /app

EXPOSE 3000

CMD npm run start:prod

