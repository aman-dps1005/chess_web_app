FROM node:16-alpine

RUN npm install -g typescript

WORKDIR /app

COPY package.json yarn.lock tsconfig.json .gitignore ./

RUN yarn install 

COPY ./src ./src

RUN tsc -b

CMD ["node","dist/index.js"]




