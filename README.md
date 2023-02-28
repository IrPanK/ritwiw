# ritwiw
- lakukan clone repo
- masuk ke folder client lalu lakukan yarn install
- masuk ke folder server lalu lakukan yarn install
- masukkan buat file .env pada client dan server
- jalankan perintah yarn dev pada folder client untuk menjalankan bagian FE
- jalankan perintah yarn start:dev pada folder server untuk menjalankan bagian BE

-----------------------------------------------------------------------

.env pada client (FE)
NEXT_PUBLIC_SERVER_ENDPOINT=http://localhost:5000

NEXT_PUBLIC_API_KEY=AIzaSyAvTGvtoNSj0P-9agP_1VxWQv8llH2RI3U
NEXT_PUBLIC_AUTH_DOMAIN=ritwiw-bd48c.firebaseapp.com
NEXT_PUBLIC_PROJECT_ID=ritwiw-bd48c
NEXT_PUBLIC_STORAGE_BUCKET=ritwiw-bd48c.appspot.com
NEXT_PUBLIC_MESSAGING_SENDER_ID=337966245099
NEXT_PUBLIC_APP_ID=1:337966245099:web:ce635e5616dd16cb570aae

-----------------------------------------------------------------------

.env pada server (BE)
APP_WHITELIST=http://localhost:3000

DATABASE_URL="mongodb+srv://irfannkamill:leGDdyrPYGM6jWQX@ritwiw.ni09zgx.mongodb.net/Ritwiw?retryWrites=true&w=majority"

TOKEN_EXPIRED="1h"
SECRET_KEY="RitwiwKiw"
