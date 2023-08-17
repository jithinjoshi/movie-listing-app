# movie-listing-app

User Registration and Authentication System

## Table of Contents

- [Description](#description)
- [Features](#features)
- [Installation](#installation)

## Description

This project aims to create a comprehensive User Registration and Authentication system with movie listing, including API endpoints for registration, login, data retrieval, and more. It provides both backend APIs and frontend components using React.

## Features

- User Registration and Authentication API
  - API endpoint for user registration
  - Secure storage of user data in the database
  - JWT-based authentication for login

- Data Retrieval and Filtering API
  - API endpoint to retrieve movie data from the database
  - Filtering, sorting, and pagination for data

- Authorization Middleware
  - Middleware to check user roles and permissions
  - Protection of sensitive routes


- Frontend
  - User Registration and Login Forms
    - User registration form using React components
    - Login form interacting with the backend API
  - Dashboard Component
    - Dashboard displaying data from the backend
    - Visualization of data using charts
  - Data Listing and Filtering UI
    - UI to display and filter data retrieved from the backend API
    - Sorting and pagination of data

- State Management
  - Setup of Redux for managing global application state

- Form Validation
  - Form validation for user input in registration and login forms

- Styling and Responsiveness
  - Tailwind CSS for visually appealing and responsive user interface

## Installation

1. Clone the repository: `git clone https://github.com/jithinjoshi/movie-listing-app`
2. Install dependencies for both the backend and frontend:
3. Create a `.env` file in the `backend` directory and add the following environment variables:
 ```env
DB=your_database_connection_string
ACCESSTOKEN_SECRET=your_jwt_access_token
REFRESHTOKEN_SECRET=your_jwt_refresh_token
PORT=port_for_the_project
