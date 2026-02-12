FROM node:22.20.0-alpine3.21

#Current sub-directory
WORKDIR /app

#copy package file
COPY package*.json ./

#install dependencies
RUN npm install

#copy application code
COPY . .

#Expose port
EXPOSE 5002

CMD [ "npm", "run", "dev" ]