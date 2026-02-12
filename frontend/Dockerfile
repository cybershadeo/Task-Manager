FROM node:22-alpine

#Current sub-directory
WORKDIR /app

#copy package file
COPY package*.json ./

#install dependencies
RUN npm install

#copy application code
COPY . .

#Expose port
EXPOSE 5173

#start development server
CMD [ "npm", "run", "dev", "--", "--host"]