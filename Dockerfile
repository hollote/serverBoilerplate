FROM node:10

RUN curl -o- -L https://yarnpkg.com/install.sh | bash

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json yarn.lock ./
RUN yarn install

# Copy app source code
COPY . .

#Expose port and start application
EXPOSE 3000
CMD [ "npm", "start" ]