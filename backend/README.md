# Penn Selavu Tracker API

Java Spring Boot backend for OTP login, MongoDB persistence, expenses, and user settings.

## Endpoints

- `POST /api/auth/request-otp`
- `POST /api/auth/verify-otp`
- `GET /api/settings`
- `PUT /api/settings`
- `GET /api/expenses`
- `POST /api/expenses`
- `DELETE /api/expenses/{id}`

Protected endpoints require:

```txt
Authorization: Bearer <token>
```

## Dev

Run MongoDB and API without installing Java/Maven locally:

```sh
cd ..
docker compose -f docker-compose.dev.yml up api
```

Or, if Java 17+ and Maven are installed locally:

```sh
cd backend
SPRING_PROFILES_ACTIVE=dev mvn spring-boot:run
```

In `dev`, OTP values are returned in the response as `devOtp` and printed to the server log.

## Prod

Set environment variables:

```sh
SPRING_PROFILES_ACTIVE=prod
MONGODB_URI=mongodb+srv://...
CORS_ALLOWED_ORIGINS=https://your-app-domain.com
OTP_DEV_MODE=false
```

The current OTP sender is a dev stub. For production, plug SMS/email providers into `AuthService.requestOtp` where the OTP is generated.
