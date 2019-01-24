FROM node:9.10.0
RUN mkdir /mainApp
WORKDIR /mainApp
COPY . /mainApp
RUN npm install
CMD [ "yarn", "start" ]