# Use Node.js LTS
FROM node:20-alpine

# Create app directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the entire project
COPY . .

# Disable TypeScript & ESLint blocking on build
ENV NEXT_TELEMETRY_DISABLED=1

# Optional: Ignore TS build errors
ENV NEXT_DISABLE_ESLINT=true

# Generate Prisma client
RUN npx prisma generate

# Build Next.js
RUN npm run build

# Expose default Next.js port
EXPOSE 3000

# Start the app
CMD ["npm", "start"]
