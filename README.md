# Library Management System Frontend

## Table of Contents
- [Introduction](#introduction)
- [Features](#features)
- [Requirements](#requirements)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [Contact](#contact)

## Introduction
The Library Management System Frontend is a web application designed to interact with the Library Management System Server. It provides a user-friendly interface for library operations, including searching for books, managing user accounts, and tracking borrowed books.

## Features
- User registration and login
- Search and browse books
- View book details
- Borrow and return books
- User profile management
- Admin interface for managing books and users

## Requirements
- Node.js (v14 or later)
- npm (v6 or later)

## Installation

1. **Clone the repository:**
   ```sh
   git clone https://github.com/yourusername/LMS_CLIENT.git
   cd LMS_CLIENT

2. **Install dependencies:**
   ```sh
   npm install

3. **Start the server:**   
   ```sh
   npm run dev

## Configuration
- **API URL:** Ensure the api_url in the src/redux/store file points to your backend server API. Infact it is linked to the cloud uploaded API but for the development purpose it is suggested to run the backend in the localhost (https://github.com/Subham-hyna/LMS_SERVER)

## Usage
Once the development server is running, you can access the application at http://localhost:5173.

## Contact
For questions or support, please contact [subhamdutta460@gmail.com](mailto:subhamdutta460@gmail.com).