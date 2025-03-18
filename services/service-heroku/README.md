# GrafMesh Backend Service

The backend service manages annotation data using MongoDB and provides APIs for the frontend and extensions.

---

## Features

- Annotation storage in MongoDB.
- RESTful API for managing annotations.
- Dockerized deployment.

---

## Development Setup

1. Install dependencies:

   ```bash
   yarn
   ```

2. Start the service:

   ```bash
   yarn dev
   ```

3. Use Docker Compose to start the service with MongoDB:
   ```bash
   docker-compose up
   ```

---

## API Endpoints

- **POST /annotations**: Add a new annotation.
- **GET /annotations**: Retrieve annotations by URL.
- **DELETE /annotations**: Delete an annotation by selector.
