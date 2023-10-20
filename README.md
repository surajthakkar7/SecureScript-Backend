# SecureScript - Backend

The backend of SecureScript is responsible for handling API requests, user authentication, and data management for the SecureScript MERN Note-Taking App. It ensures data security and privacy for all users.

## Technologies Used

- **Node.js**: The runtime environment for the server.
- **Express.js**: Used to build the backend API.
- **MongoDB**: The primary database solution.
- **JWT (JSON Web Tokens)**: Employed for user authentication and authorization.
- **Bcrypt**: Utilized for password hashing and security.
- **Mongoose**: An ODM (Object Data Modeling) library for MongoDB.

## Installation and Setup

1. Clone the repository.
2. Navigate to the `backend` directory.
3. Run `npm install` to install the required dependencies.
4. Create a `.env` file to store configuration values, including your MongoDB connection string and JWT secret key.
5. Run the server locally with `npm start`.

## API Endpoints

The backend of SecureScript provides the following API endpoints:

- `/api/auth/createuser`: Create a new user account.
- `/api/auth/login`: Authenticate and log in a user.
- `/api/notes/getusernotes`: Get all notes for the authenticated user.
- `/api/notes/addnote`: Create a new note.
- `/api/notes/updatenote/:id`: Update an existing note by ID.
- `/api/notes/deletenote/:id`: Delete a note by ID.

## Usage

The backend API is used by the frontend to provide user authentication and manage user notes. Follow the instructions in the frontend README for a complete overview of how to use SecureScript.

## Contribution Guidelines

If you'd like to contribute to the SecureScript backend, please follow these guidelines:

- Fork the repository.
- Create a new branch for your feature or fix.
- Make your changes and test thoroughly.
- Submit a pull request, explaining the changes and their purpose.

## License

This project is licensed under the [MIT License](LICENSE).

## Acknowledgments

- Special thanks to our contributors who have helped make SecureScript better.

## Contact

For any questions or inquiries related to the backend, please contact me at surajthakkar30@gmail.com



Thank you for helping us keep SecureScript secure and efficient!
