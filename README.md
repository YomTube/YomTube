## youtube - släng dig i väggen

Man behöver sätta sina egna saker i `.env` filen.  
Tro mig, det funkar bara.


### `.env` filen ska se ut såhär
```
PORT=
JWT_SECRET=
MONGODB_URL=mongodb://localhost:27017/yomtube
ROOT_DIR=
```
Tänker inte includa den längre för vi har alla olika settings ¯\\\_(ツ)\_/¯  
Nu kan man köra `npm run dev:local` och `npm run dev:public`, men man får själv gå in och ändra på vad `BASE_URL` ska vara i `package.json`