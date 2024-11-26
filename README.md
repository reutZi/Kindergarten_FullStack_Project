# Kindergarten Management System - Preventing Forgotten Children in Cars

A full-stack project designed to streamline operations between kindergarten staff and parents while ensuring the safety of children.

## Table of Contents
- [About the Project](#about-the-project)
- [Features](#features)
  - [Kindergarten Staff](#kindergarten-staff)
  - [Parents](#parents)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
  - [Installation](#installation)
  - [Usage](#usage)

---

## About the Project

This system serves as a comprehensive management tool for kindergartens, emphasizing child safety by preventing children from being forgotten in cars. It supports attendance tracking, real-time notifications, photo uploads, event reminders, and more to enhance communication between staff and parents.

---

## Features

### Kindergarten Staff
- **Attendance Tracking**: Mark attendance and record late arrivals.
- **Real-Time Notifications**: Notify parents if a child is not marked present and no report has been submitted.
- **Photo Gallery**: Upload recent photos for parents to view.
- **Event Reminders**: Add and manage reminders for upcoming events.

### Parents
- **View Updates**: Access photos, announcements, and reminders from staff.
- **Attendance Management**: Check attendance history and update future attendance.
- **Real-Time Alerts**: Receive notifications if their child hasn’t been marked present.

---

## Technologies Used

- **Frontend**: React (React Router, Hooks, Forms)
- **Backend**: Node.js (Express)
- **Databases**:
  - **MySQL**: Structured data (e.g., attendance records)
  - **MongoDB**: Unstructured data (e.g., photos)
- **API Communication**: Axios
- **Notifications**: Integrated phone notifications
- **Local Server**: For development and testing

---

## Getting Started

### Installation

1. Clone the repository:
   ```bash
   https://github.com/reutZi/Kindergarten_FullStack_Project.git

2. Navigate to the project directory:
   ```bash
   cd kindergarten-management-system

3. Install frontend dependencies:
    ```bash
    cd frontend
    npm install

4. Install backend dependencies:
    ```bash
    cd ../backend
    npm install

5. Configure environment variables:
Create a .env file in the backend directory with your MySQL, MongoDB, and notification service credentials.

### Usage

1. Start the backend server:
   ```bash
   cd backend
   node server.js

2. Start the frontend development server:
   ```bash
   cd frontend
   npm start

3. Access the application in your browser at http://localhost:3000.



   
