FROM alpine

RUN apk add --no-cache \
    chromium \
    nss \
    freetype \
    harfbuzz \
    ca-certificates \
    ttf-freefont \
    nodejs \
    npm

ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser
ENV HTML2PDF_NO_SANDBOX=true

WORKDIR /app
COPY ["package.json", "./"]
RUN npm install
COPY . .
CMD ["npm", "start"]
