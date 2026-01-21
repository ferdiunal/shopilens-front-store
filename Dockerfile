# ============================================
# Multi-Stage Production Dockerfile
# Next.js 16 + Standalone Output
# ============================================

# Stage 1: Dependencies
FROM node:20-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Package dosyalarını kopyala
COPY package.json package-lock.json* ./

# Dependencies yükle
RUN npm ci --only=production

# ============================================
# Stage 2: Builder
FROM node:20-alpine AS builder
WORKDIR /app

# Dependencies'i kopyala
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Environment variables (build time)
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production

# Build
RUN npm run build

# ============================================
# Stage 3: Runner (Production)
FROM node:20-alpine AS runner
WORKDIR /app

# Production environment
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Non-root user oluştur (güvenlik)
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Public assets
COPY --from=builder /app/public ./public

# Standalone output
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Non-root user'a geç
USER nextjs

# Port
EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Start
CMD ["node", "server.js"]
