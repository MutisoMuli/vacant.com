# Vacant.com

Vacant.com is an innovative application designed to help tenants effortlessly find vacant houses in their vicinity. By simply enabling their location, users can access a comprehensive list of available properties near them, streamlining the house-hunting process and saving valuable time.

![Vacant.com Screenshot 1](https://res.cloudinary.com/dhbztjzkr/image/upload/v1724702039/Screenshot_2024-08-26_225218_jjtlwy.png)

![Vacant.com Screenshot 2](https://res.cloudinary.com/dhbztjzkr/image/upload/v1724702165/Screenshot_2024-08-26_225539_wzk5yu.png)

[Watch our demo video](https://youtu.be/-8Ewx1yFTo8)

## Tech Stack

- Frontend: JavaScript, React
- Backend: Node.js
- Database: PostgreSQL

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14 or later)
- npm (v6 or later)
- PostgreSQL (v12 or later)

## Installation

1. Clone the repository:

2. Install dependencies:

3. Set up the database:
- Create a PostgreSQL database named `vacant_db`:
  ```
  createdb vacant_db
  ```
- Update the database connection details in `config/database.js`

4. Set up environment variables:
- Create a `.env` file in the root directory:
  ```
  touch .env
  ```
- Add necessary environment variables (e.g., DATABASE_URL, API_KEY) to the `.env` file:
  ```
  echo "DATABASE_URL=postgresql://username:password@localhost:5432/vacant_db" >> .env
  echo "API_KEY=your_api_key_here" >> .env
  ```

## Running the Application

1. Start the backend server:

2. In a new terminal, start the frontend development server:

3. Open your browser and navigate to `http://localhost:3000`

## Development

- To run both frontend and backend concurrently:

- To run tests:

## Building for Production

To create a production build:

This will generate optimized files in the `build` directory.

To serve the production build:

## Database Management

- To create a new migration:

- To run migrations:

- To undo the last migration:

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## Author
---
© **MutisoMuli**