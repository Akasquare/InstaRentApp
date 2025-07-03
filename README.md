# InstaRentApp 🏠

A simple rental listing web application built using **Node.js**, **Express**, **MongoDB**, and **EJS**.

## 🚀 Features

- Create, read, update, and delete rental property listings
- RESTful routing
- EJS templating for dynamic views
- MongoDB for data storage
- Bootstrap for styling

## 📁 Project Structure

InstaRentApp/
│
├── models/ # Mongoose schemas
├── routes/ # Express route handlers
├── views/ # EJS templates and partials
├── public/ # Static assets (CSS, JS, Images)
├── utils/ # Helper utilities
├── schema.js # Mongoose DB setup (optional)
├── app.js # Main Express server file
├── package.json # Project dependencies and scripts

 

## ⚙️ Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Akasquare/InstaRentApp.git
   cd InstaRentApp

   npm install
Set up environment variables:
Create a .env file in the root directory and add:
   ```bash
   MONGO_URI=mongodb://localhost:27017/instarent

   ```



PORT=3000

Start the development server:
```bash
npm start
```
Open your browser and visit:
 ```bash
http://localhost:3000
```

Routes Overview
| Method | Route            | Description                      |
| ------ | ---------------- | -------------------------------- |
| GET    | `/`              | View all rental listings         |
| GET    | `/rent/new`      | Form to create a new listing     |
| POST   | `/rent`          | Create a new rental listing      |
| GET    | `/rent/:id`      | View details of a single listing |
| GET    | `/rent/:id/edit` | Form to edit a listing           |
| PUT    | `/rent/:id`      | Update a listing                 |
| DELETE | `/rent/:id`      | Delete a listing                 |




📌 Technologies Used
Node.js

Express.js

MongoDB + Mongoose

EJS

Bootstrap 5

📦 Future Improvements
✅ Authentication (Login/Signup)

✅ Role-based access (User, Contributor, Admin)

⬜ Image uploads via Cloudinary

⬜ Search and filter functionality

⬜ Pagination and category filters

🙌 Author
Made with ❤️ by Akash Kushwaha

📄 License
This project is open-source and available under the MIT License.
 

