# Build stage
FROM node:20-slim AS builder
WORKDIR /app
COPY package.json package-lock.json* pnpm-lock.yaml* yarn.lock* .npmrc* ./ 2>/dev/null || true
COPY . .
RUN npm install --no-audit --no-fund
RUN npm run prisma:generate
RUN npm run build

# Run stage
FROM node:20-slim
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app .
EXPOSE 3000
CMD ["npm", "start"]
