FROM node

# Create app directory
WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

COPY ./dist /usr/src/app

#RUN chmod 200 /usr/src/app

EXPOSE 3000

ENV NODE_ENV="docker" 

CMD [ "node", "index.js" ]

#crear la imagen
#docker build --pull --rm -f "dockerfile" -t creepsoftluceille:latest "."

#crear contendor
#docker run -p 3000 --name luceille -d creepsoftluceille:latest
