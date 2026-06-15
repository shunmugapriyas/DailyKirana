# Penn Selavu Tracker

Full-stack expense tracker with:

- React Native Expo mobile app in `expenses-app`
- Java Spring Boot API in `backend`
- MongoDB persistence
- OTP login through phone number or email
- Separate dev/prod environment configuration

## Local Dev

Run MongoDB and the Java API with Docker:

```sh
docker compose -f docker-compose.dev.yml up api
```

This uses a Maven Docker image, so your Mac does not need local `mvn`.

If Java 17+ and Maven are installed locally, you can instead run:

```sh
cd backend
SPRING_PROFILES_ACTIVE=dev mvn spring-boot:run
```

Run mobile app:

```sh
cd expenses-app
cp .env.example .env
nvm exec 20.19.4 npm run start -- --localhost --port 8081
```

For Android emulator, set:

```txt
EXPO_PUBLIC_API_URL=http://10.0.2.2:8080/api
```

For a physical phone, use your computer LAN IP.

## Prod Environment

Backend:

```txt
SPRING_PROFILES_ACTIVE=prod
MONGODB_URI=mongodb+srv://...
CORS_ALLOWED_ORIGINS=https://your-mobile-web-host.example
OTP_DEV_MODE=false
```

Mobile:

```txt
EXPO_PUBLIC_API_URL=https://api.pennselavu.com/api
```
