FROM node:10.5.0

# Set /app as workdir
RUN mkdir /app
ADD . /app
WORKDIR /app

COPY package.json .
COPY package-lock.json .

RUN npm i

COPY . .

