FROM node:12-alpine as BUILD_IMAGE

# Create app directory
WORKDIR app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm ci --only=production

# Bundle app source
COPY . .

FROM node:12-alpine as RUNNING_IMAGE

WORKDIR app
COPY package*.json ./
# copy from build image
COPY --from=BUILD_IMAGE /app/node_modules ./node_modules
COPY --from=BUILD_IMAGE /app/src ./src
COPY --from=BUILD_IMAGE /app/config.json ./config.json
COPY --from=BUILD_IMAGE /app/tmp ./tmp

EXPOSE 80
CMD [ "npm", "start" ]
