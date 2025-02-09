# Vega Test Project

## Project Structure
- `back/`: Express.js backend server
- `front/`: Vite React frontend application

## Development (Local)

### Backend
```bash
cd back
npm install
npm run dev
```
The backend will run on `http://localhost:3000`

### Frontend
```bash
cd front
npm install
npm run dev
```
The frontend will run on `http://localhost:5173`

## Docker

To run the entire application using Docker:

```bash
docker compose up -d
```

This will start:
- Backend: accessible on `http://localhost:1234`
- Frontend: accessible on `http://localhost:5000`

To rebuild the containers:
```bash
docker compose up -d --build
```

To stop the containers:
```bash
docker compose down -v
```

## Ports
- Development:
  - Backend: 3000
  - Frontend: 5173
- Docker:
  - Backend: 1234
  - Frontend: 5000

## Login Information
Any username and password combination will work for login, except for:
- username: "error"
- password: "error"

These specific credentials are hardcoded to trigger an error response for testing purposes. 

## Personal thoughts and notes
- **Repo Structure**: Obviously this is not an ideal repo structure, but since the mail mentioned to send one Repo this is how I am sending it.
- **Docker**: For ease and consistency I have attached a docker compose setup.
- **Tailwind CSS**: Long time not using it on my side, but once I remembered it was quite fun, its a good solution for big projects since it forces a standard.
- **Routing**: I used TankStack Router, as a big fan of Remix , im still baffled at how was the whole process of integrating Remix into React Router handled, plus the breaking changes between versions are always painful, thats why I usually default to TankStack nowadays, in this case I used a code instead of file based routing because in my opinion long term it allows more flexibility for potential edge cases.
- **API**: In theory the API requirements asked for filtering params, since I have done a really basic api it doesn't handle them per se, but in the frontend I do send the filtering query params along the request to simulate a real life scenario.
- **Style**: Im not using prettier because I didn't want to spend so much time setting up more things, but in a real case scenario, the whole team should have standarized linter and prettier which should be applied as a pre-commit hook. 
- **Error Handling**: The error handling is done by trankstack-router that is able to process global boundaries.
- **Auth**: The auth is attached as Bearer token but obviously it is a "mock".
- **Test**: The test coverage is not 100% but I did test what I consider the vital parts of the application. (Login, show elements, navigation, etc....)
- **React**: I did use some "modern react" features like suspense or lazy because the build was too big, but regarding hooks like useOptimistic I didnt really see a scenario to apply it there, and hooks like useActionState are mostly integrated in react-query and this is client side rendered so no need to use it.
- **Global State**: I didnt use global state, in my opinion most of the times it can be avoided with a combination of hooks + url params + specific contexts, but it depends on the architecture of the app. In one hand it enforces some sort of structure but in the other hand it implies writting more code (albeit with modern implementations its not that bad). Another way to avoid using global states is to rely on URL params which also persists the data that way. Personally in my current work I do use redux in one project in which it makes sense, and in the other we rely in URL params and sometimes context which for this case also makes sense. But nowadays I would use zustand if needed.
- **React Query**: has a lot of features like auto refetch, caching, etc... but that should be discussed in a bigger context, in this case I simply used the cache once for assets because its usually good enough for the session.
- **Commit structure**: I went a bit YOLO with the commits in smaller chunks, but in a real world scenario obviously they would be feature based and reviewed (or at least thats what I expect)