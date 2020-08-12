FROM node:10-alpine

# Create app directory
WORKDIR /usr/src/app

RUN npm -v
RUN node -v

COPY ./src ./src

COPY *.json ./

RUN npm install \
    && npm install typescript

# If you are building your code for production
# RUN npm ci --only=production

RUN tsc -p tsconfig.json

RUN chmod -x /usr/src/app

EXPOSE 3000

ENV NODE_ENV="docker" 

CMD [ "node", "dist/index.js" ]

#crear la imagen
#docker build --pull --rm -f "dockerfile" -t creepsoftluceille:latest "." --no-cache

#crear contendor
#docker run -p 3000 --name luceille -d creepsoftluceille:latest --no-cache
