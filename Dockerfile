# Frontend staged build
FROM node:alpine as frontend
WORKDIR /home/frontend
RUN apk add --no-cache --update bash
ADD frontend/package*.json /tmp/
RUN cd /tmp && npm install
RUN cp -a /tmp/node_modules .
COPY frontend .
RUN REACT_APP_BASE_URL=${REACT_APP_BASE_URL} npm run build

# Backend staged build
FROM node:alpine as backend
ENV NODE_ENV=development
WORKDIR /home/backend
RUN apk add --no-cache --update bash
ADD backend/package*.json /tmp/
RUN cd /tmp && npm install
RUN cp -a /tmp/node_modules .
COPY backend .
RUN ["npm", "run", "build"]

# [PROD] Express Server with API endpoints
FROM node:alpine
MAINTAINER Vidhu "bhatnagar.sh@husky.neu.edu"
ENV NODE_ENV=production
WORKDIR /home/app

# Copy build artifacts
COPY --from=frontend /home/frontend/build ./static
COPY --from=backend /home/backend/build ./build

# Install packages
RUN apk add --no-cache --update bash supervisor
ADD backend/package*.json ./
ADD backend/package*.json /tmp/
ADD backend/*.sh ./
ADD backend/cli.js ./
RUN cd /tmp && npm install
RUN cp -a /tmp/node_modules .
RUN npm link

# Run Application
ENTRYPOINT ["./init.sh"]
CMD ["npm", "run", "start"]

EXPOSE 5000