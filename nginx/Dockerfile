# Build Stage

FROM node:22 AS builder

WORKDIR /app

COPY package.json .
COPY index.html .
COPY index.js .

RUN npm install -g pnpm && \
pnpm i


#  Runtime stage
FROM node:22-slim

WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/index.html .
COPY --from=builder /app/index.js .


EXPOSE 4000


CMD ["node", "index.js"]