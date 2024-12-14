# Menggunakan Node.js versi 22 berbasis Alpine
FROM node:22-alpine AS BUILD_IMAGE

# Menentukan direktori kerja dalam container
WORKDIR /app/choice

# Menyalin file package.json dan package-lock.json
COPY package*.json .

# Install dependencies
RUN npm install

# Menyalin semua file proyek
COPY . .

RUN npm run build

# multistage

FROM node:22-alpine AS PRODUCTION_IMAGE
WORKDIR /app/choice

COPY --from=BUILD_IMAGE /app/choice/dist/ /app/choice/dist/

COPY package.json .
COPY vite.config.js .

# Ekspos port untuk Vite (default: 4173)
EXPOSE 4173

# Menjalankan development server
CMD ["npm", "run", "preview"]