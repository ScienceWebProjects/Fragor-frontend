# Obraz bazowy
FROM node:20-slim

# Utwórz katalog roboczy w kontenerze
WORKDIR /app

# Skopiuj pliki package.json i package-lock.json
COPY package*.json yarn.lock ./

# Zainstaluj zależności
RUN npm install yarn
RUN yarn install

# Skopiuj kod aplikacji
COPY . .

# kopiowanie potrzebnych plików
RUN true
RUN mkdir -p ./src/JSONs/
RUN true
COPY src/JSONs/ ../endpoints-and-translations/en.json
RUN true
COPY src/JSONs/ ../endpoints-and-translations/endpoints.json
RUN true
COPY src/JSONs/ ../endpoints-and-translations/pl.json
RUN true
COPY src/JSONs/ ../endpoints-and-translations/quotes.json


# Otwórz port przekazywania
EXPOSE 3000

VOLUME ["/app"]

# Określ polecenie startowe
CMD ["yarn","start"]

