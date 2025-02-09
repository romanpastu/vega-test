FROM node:22-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# Define build argument and environment variable
ARG VITE_API_URL=http://backend:1234
ENV VITE_API_URL=${VITE_API_URL}

# Debug: Show environment variables
RUN echo "VITE_API_URL during build: $VITE_API_URL"

RUN npm run build

# Install serve to run the built app
RUN npm install -g serve

EXPOSE 5000

# Pass environment variable to runtime as well
ENV VITE_API_URL=${VITE_API_URL}

CMD ["serve", "-s", "dist", "-l", "5000"] 