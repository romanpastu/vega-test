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
docker compose down
```

## Ports
- Development:
  - Backend: 3000
  - Frontend: 5173
- Docker:
  - Backend: 1234
  - Frontend: 5000 