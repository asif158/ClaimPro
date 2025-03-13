# Insurance Claims Management System - Frontend

This repository contains the frontend application for an Insurance Claims Management System. It provides a user interface for patients to submit claims and for insurers to review them.

## Technologies Used

* React
* TypeScript
* Material UI
* React Router
* Axios

## Features

* **User Authentication:**
    * Login and registration forms.
    * Role-based navigation.
* **Patient Dashboard:**
    * View a list of submitted claims.
    * Submit new claims with document uploads.
* **Insurer Dashboard:**
    * View a list of all claims.
    * Filter claims by status, submission date, and claim amount.
    * Review individual claims.
    * Update claim statuses and approved amounts.
    * Download uploaded documents.
* **Responsive Design:**
    * The application is designed to work on various screen sizes.

## Setup

1.  **Clone the repository:**

    ```bash
    git clone <your-repository-url>
    cd insurance-claims-frontend
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    * Create a `.env` file in the root directory.
    * Add the following variables:

    ```
    VITE_BACKEND=http://localhost:5000
    ```
    * Adjust the API base url to your backend url.

4.  **Start the development server:**

    ```bash
    npm run dev
    ```

## Project Structure

* `src/components`: Contains React components.
* `src/services`: Contains API service functions.
* `src/types`: Contains TypeScript type definitions.
* `src/App.tsx`: Main application component.
* `src/main.tsx`: Entry point of the application.

## API Service

* The `src/services/api.ts` file contains functions for making API requests to the backend.
* Axios is used to handle HTTP requests.

## Routing

* React Router is used for client-side routing.
* Routes are defined in `src/App.tsx`.

## Contributing

* Feel free to contribute by submitting pull requests or reporting issues.