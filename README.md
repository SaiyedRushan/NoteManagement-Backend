# EXPRESS REST API BACKEND

## Project Overview

This project implements a secure and scalable RESTful API for managing notes. Users can perform CRUD operations on their notes, share notes with other users, and search notes based on keywords. The API includes authentication endpoints to handle user registration and login.

## Technical Choices

### Framework

- **Express**: Chosen for its simplicity, robust middleware support, and widespread use in building Node.js applications. Express allows for quick setup of RESTful APIs and integrates well with MongoDB through Mongoose.

### Database

- **MongoDB**: Selected for its flexibility and scalability, MongoDB is a NoSQL document database that stores data in JSON-like documents. This schema-less nature is beneficial for managing unstructured data like notes, providing faster access for read-heavy operations and allowing for easy scalability.

### Authentication

- **JWT (JSON Web Token)**: Used for authentication due to its stateless nature and ability to securely transmit information between parties. JWT tokens are issued upon successful login and used to authenticate subsequent API requests.

### Rate Limiting and Throttling

- **Express Rate Limit**: Middleware used for rate limiting requests to the API to prevent abuse and ensure fair usage.

### Search Functionality

- **MongoDB Full-Text Search**: Utilized for efficient keyword-based searching within notes. MongoDB's text indexing capabilities provide fast search results, enhancing performance for search queries.

### Testing Framework

- **Jest**: Chosen for unit and integration testing due to its simplicity and integration with Express and MongoDB testing utilities (`supertest`, `mongodb-memory-server`).

### API Documentation

- Swagger/OpenAPI documentation can be accessed at the `/api-docs` endpoint.

### CICD pipeline

- **GitHub Actions**: Used for continuous integration and deployment. The workflow includes automated tests, builds, and deployment.

## Setup Instructions

### Prerequisites

- Node.js and npm installed
- MongoDB installed and running locally or a MongoDB instance (e.g., Atlas) configured

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/SaiyedRushan/NoteManagement-Backend.git
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set environment variables:
   Create a `.env` file in the root directory and specify the following variables:
   Example .env file:

   ```plaintext
   PORT=8080
   MONGODB_URI=mongodb://localhost:27017/notesdb
   JWT_SECRET=your_jwt_secret_key
   ```

4. Start the server:
   ```bash
   npm start
   ```

### Running Tests

1. Run unit tests:

   ```bash
   npm test
   ```
