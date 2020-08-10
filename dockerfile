FROM node

# Create app directory
WORKDIR /usr/src/app

COPY ./src ./src

COPY p*.json ./

RUN npm install \
    && npm install tsc -g

# If you are building your code for production
# RUN npm ci --only=production

RUN tsc => dist

RUN chmod 200 /usr/src/app

EXPOSE 3000

ENV NODE_ENV="docker" 

CMD [ "node", "dist/index.js" ]

#crear la imagen
#docker build --pull --rm -f "dockerfile" -t creepsoftluceille:latest "."

#crear contendor
#docker run -p 3000 --name luceille -d creepsoftluceille:latest
