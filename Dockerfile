# 1. pull node js docker image
FROM node:24-slim

# 2. set working directory inside the container
WORKDIR /usr/src/app

# 3. copy package.json and package-lock.json first 
COPY package*.json ./

# 4. install dependencies
RUN npm install --omit=dev

# 5. copy the rest of the application code
COPY . .

# 6. Set environment to production
ENV NODE_ENV=production

# 7. Expose the port (Render automatically injects the PORT env variable)
EXPOSE 3000

CMD ["node", "index.js"]