# Obraz bazowy
FROM node

# Utwórz katalog roboczy w kontenerze
WORKDIR /app

# Skopiuj pliki package.json i package-lock.json
COPY package*.json ./


# Zainstaluj zależności
RUN npm install yarn
RUN yarn install

# Skopiuj kod aplikacji
COPY . .

# Otwórz port przekazywania
EXPOSE 3000

VOLUME ["/app"]

# Określ polecenie startowe
CMD ["npm","start"]

