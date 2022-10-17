#Creates a layer from node:alpine image.
FROM node:alpine

#Creates directories
# RUN mkdir -p /usr/src/app
WORKDIR /app

#Sets an environment variable
# ENV PORT 3000

#Sets the working directory for any RUN, CMD, ENTRYPOINT, COPY, and ADD commands
# WORKDIR /usr/src/app

#Copy new files or directories into the filesystem of the container
COPY package.json yarn.lock ./

#Execute commands in a new layer on top of the current image and commit the results
RUN yarn install

##Copy new files or directories into the filesystem of the container
# COPY . /usr/src/app
COPY next.config.js ./next.config.js ./
COPY public ./public
COPY src ./src 

#Execute commands in a new layer on top of the current image and commit the results
# RUN yarn run build

#Informs container runtime that the container listens on the specified network ports at runtime
EXPOSE 3031

#Allows you to configure a container that will run as an executable
CMD ["yarn", "dev"]