# Insurance Claims Management System - Backend

This repository contains the backend API for an Insurance Claims Management System. It provides endpoints for managing insurance claims, handling user authentication, and serving uploaded documents.

## Technologies Used

* Node.js
* Express.js
* MongoDB (Mongoose)
* JSON Web Tokens (JWT)
* Multer (for file uploads)
* Bcrypt (for password hashing)
* Dotenv (for environment variables)

## Features

* **User Authentication:**
    * User registration and login.
    * Role-based access control (Insurer, Patient).
* **Claims Management:**
    * Patients can submit new claims with document uploads.
    * Insurers can view all claims.
    * Insurers can review and update claim statuses and approved amounts.
    * Patients can view only their claims.
* **File Uploads:**
    * Claims can include supporting documents.
    * Uploaded documents are stored in the `uploads/` directory.
* **Filtering:**
    * Insurers can filter claims based on status, submission date, and claim amount.

## Setup

1.  **Clone the repository:**

    ```bash
    git clone <your-repository-url>
    cd insurance-claims-backend
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    * Create a `.env` file in the root directory.
    * Add the following variables:

    ```
    PORT=5000
    MONGODB_URI=<your-mongodb-connection-string>
    JWT_SECRET=<your-jwt-secret-key>
    ```

4.  **Start the server:**

    ```bash
    npm start
    ```

## API Endpoints

* `POST /api/users/register`: Register a new user.
* `POST /api/users/login`: Log in a user and get a JWT token.
* `POST /api/claims/submit`: Submit a new claim (requires authentication).
* `GET /api/claims`: Get all claims for a patient, or all claims for an insurer (requires authentication).
* `GET /api/claims/all`: Get all claims for an insurer.
* `GET /api/claims/:id`: Get a specific claim by ID (requires authentication).
* `PUT /api/claims/:id`: Update a claim (requires authentication, insurer role).
* `/uploads/*` : Serves uploaded documents.

## Authentication

* All protected endpoints require a JWT token in the `Authorization` header.
* The token should be in the format `Bearer <token>`.

## File Uploads

* Uploaded files are stored in the `uploads/` directory.
* The `document` field in the claim object stores the filename.

## Database

* MongoDB is used to store user and claim data.

## Deployment

* This backend can be deployed to platforms like Heroku, AWS, or Google Cloud.

## Contributing

* Feel free to contribute by submitting pull requests or reporting issues.