# frontend/Dockerfile
FROM node:23-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Build args with fallback values
ARG NEXT_PUBLIC_API_URL
ARG NEXT_PUBLIC_node_URL
ARG EXT_PUBLIC_STRIPE_PUBLISHABLE_KEY

# Inject build-time variables into environment
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_node_URL=$NEXT_PUBLIC_node_URL
ENV EXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=$EXT_PUBLIC_STRIPE_PUBLISHABLE_KEY

RUN npm run build

CMD ["npm", "start"]
