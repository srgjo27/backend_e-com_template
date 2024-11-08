# Backend Project

## Description
This is a simple backend project using Node.js and Nest.js to create a RESTful API for managing

## Getting Started

### 1. Clone the Repository
   ```sh
   git clone https://github.com/srgjo27/backend_e-com_template.git
   cd backend
   ```

### 2. Install Depedencies
   ```sh
   npm install
   ```

### 3. Create Enviroment Variables
Copy .env.example to .env and configure the necessary enviroment variables.

### 4. Generate JWT Random Secret Certificates
Generate private.pem and public.pem files:
   ```sh
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   ```

### 5. Run the project
For development
   ```sh
   npm run start:dev
   ```
For prod
   ```sh
   npm run start
   ```

### 6. Access API Documentation
Open your browser and navigate to http://localhost:3000/api-docs to view the API documentation.