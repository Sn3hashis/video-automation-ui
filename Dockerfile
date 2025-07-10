# Use official Node.js LTS image
FROM node:20-alpine AS base

# Set working directory
WORKDIR /app

# Install dependencies first (for better caching)
COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm && pnpm install --frozen-lockfile

# Copy the rest of the application code
COPY . .

# Build the Next.js app
RUN pnpm run build

# Expose the port Next.js runs on
EXPOSE 3000

# Start the Next.js production server
CMD ["pnpm", "start"]
# Use a multi-stage build to reduce image size
FROM base AS production 
# Set environment variables for production
ENV NODE_ENV=production 
# Copy only the necessary files for production
COPY --from=base /app/.next .next
COPY --from=base /app/public public
COPY --from=base /app/package.json package.json
COPY --from=base /app/pnpm-lock.yaml pnpm-lock.yaml
# Install only production dependencies
RUN pnpm install --prod --frozen-lockfile
# Start the Next.js production server
CMD ["pnpm", "start"]
# Use a multi-stage build to reduce image size

