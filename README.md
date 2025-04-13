# React Users App

A simple React application for managing users. You can view, edit, and delete user profiles after logging in.

## What's Inside

- Login page to access the app
- List of users with pagination
- Edit user details
- Delete users
- Works on all devices (mobile, tablet, desktop)

## Getting Started

### What You Need

- Node.js (version 14 or newer)
- npm (version 6 or newer)

### How to Install

1. Download the project:
```bash
git clone https://github.com/HARSHA-3623/React-Users-App.git
cd react-users-app
```

2. Install the required packages:
```bash
npm install
```


### How to Run

1. Start the app:
```bash
npm run dev
```

2. Open your browser and go to:
```
http://localhost:5173
```

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