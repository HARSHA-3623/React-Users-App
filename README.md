# React Users App

A React application for managing users with authentication, search, and filtering capabilities.

## Features

- User authentication (Login)
- User list with pagination
- Search and filter users
- Edit user details
- Delete users
- Responsive design

## Technologies Used

- React
- React Router
- Tailwind CSS
- Vite
- Axios

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## Deployment

The application is deployed on Vercel. You can access the live version at:
[https://react-users-app-mu.vercel.app/](https://react-users-app-mu.vercel.app/)

### Deployment Steps

1. Create a Vercel account
2. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```
3. Login to Vercel:
   ```bash
   vercel login
   ```
4. Deploy the application:
   ```bash
   vercel
   ```

## API Integration

The application uses the ReqRes API for user data:
- Base URL: https://reqres.in/api
- Endpoints:
  - Login: POST /login
  - Get Users: GET /users?page={page}
  - Update User: PUT /users/{id}
  - Delete User: DELETE /users/{id}

## Environment Variables

Create a `.env` file in the root directory with the following variables:
```
VITE_API_BASE_URL=https://reqres.in/api
```

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## Default Login Credentials

Use these credentials to log in to the app:
- Email: eve.holt@reqres.in
- Password: cityslicka

## How the App Works

### Login
- Enter your email and password
- After successful login, you'll see the users list

### Users List
- Shows all users with their details
- Use the pagination buttons to see more users
- Click the edit button to change user details
- Click the delete button to remove a user

### Edit User
- Change the user's first name, last name, or email
- Click Update to save changes
- Click Cancel to go back

## Common Issues

### If the app won't start:
- Try clearing npm cache: `npm cache clean --force`
- Delete the `node_modules` folder and `package-lock.json`
- Run `npm install` again

### If you can't connect to the API:
- Check if the API URL in `.env` file is correct
- Make sure your internet is working
- Verify that the API server is running

### If login isn't working:
- Clear your browser's localStorage
- Check if the API is responding
- Make sure you're using the correct login details

## Need Help?

If you have any questions or run into problems:
1. Check the issues section
2. Create a new issue if needed
3. We'll help you out!

## License

This project is open source and free to use under the MIT License. 