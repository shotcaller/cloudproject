# **Ticket/Bug Tracking System - Frontend**

This is the **frontend** of the Ticket/Bug Tracking System, developed using **React** and **Vite**. The application allows users to interact with the backend APIs to manage tickets efficiently, providing role-based access and real-time updates.

---

## **Table of Contents**
1. [Features](#features)
2. [Tech Stack](#tech-stack)
3. [Getting Started](#getting-started)
4. [Testing](#testing)
5. [Deployment](#deployment)
6. [Contributing](#contributing)
7. [License](#license)

---

## **Features**
- User Authentication:
  - Login and registration for Customers and Customer Support.
- Ticket Management:
  - Create, update, and view tickets.
  - Role-based functionality: Customers create tickets, while Customer Support assigns and resolves them.
- Real-Time Updates:
  - Ensure updated ticket data is reflected seamlessly.
- Secure Communication:
  - REST APIs for frontend-backend communication with proper CORS settings.

---

## **Tech Stack**
- **Frontend Framework**: React (via Vite for build tools and optimization)
- **Backend Communication**: REST APIs (hosted on AWS API Gateway)
- **Hosting**: AWS Amplify

---

## **Getting Started**

### **Prerequisites**
- **Node.js** (>=16.0.0)
- **npm** or **yarn**
- Backend APIs running and accessible (configure API base URL in the environment variables).

### **Clone the Repository**
```bash
git clone https://github.com/your-username/ticket-tracking-frontend.git
cd ticket-tracking-frontend
```

### **Install Dependencies**
```bash
npm install
```

### **Start the Development Server**
```bash
npm run dev
```
The app will be available at `http://localhost:5173/`.

### **Environment Variables**
Create a `.env` file in the project root with the following variables:
```env
VITE_API_BASE_URL=https://your-api-gateway-url.amazonaws.com/production
```

---

## **Testing**

### **Unit Testing**
For frontend testing, ensure you have tools like **Jest** or **React Testing Library** installed (if applicable).

Run unit tests:
```bash
npm run test
```

### **End-to-End Testing**
1. Start the development server:
   ```bash
   npm run dev
   ```
2. Use **Postman** or a browser to manually test the application:
   - Verify login and registration workflows.
   - Test ticket creation, updates, and role-based access.

---

## **Deployment**

### **Steps to Deploy on AWS Amplify**
1. Log in to your AWS Management Console and navigate to **Amplify**.
2. Create a new app and connect your GitHub repository.
3. Choose the **main branch** for deployment.
4. Configure the build settings:
   - Use the default **Vite** build command:
     ```bash
     npm run build
     ```
   - Output directory: `dist`
5. Deploy the app.

### **Post-Deployment**
Ensure the backend API URL in your `.env` file matches the deployed backend API Gateway URL.

---

## **Contributing**

1. Fork the repository.
2. Create your feature branch:
   ```bash
   git checkout -b feature/your-feature
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add your message here"
   ```
4. Push to the branch:
   ```bash
   git push origin feature/your-feature
   ```
5. Open a pull request.

---

## **License**
This project is licensed under the [MIT License](LICENSE).

---

Let me know if you'd like to customize it further! 😊
