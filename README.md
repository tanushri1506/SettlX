# 💸 Settlx – Smart Group Expense & Settlement App

**Settlx** is a full-stack web application built to streamline group expense tracking, debt settlement, and financial insights. It helps users manage shared spending effortlessly with features like smart settlements, reminders, and monthly analytics.


## Features

- Create and join groups to split expenses
- Add, edit, and delete shared expenses
- Automatic smart settlement suggestions
- Monthly spending insights with interactive charts
- Email reminders for pending payments
- Secure sign-up and login with session handling
- Email notifications for expense activity and summaries
- Realtime database and seamless sync across users
- Fully responsive and clean modern UI


## Tech Stack & Tools

### Frontend
- **Next.js** – React framework for server-side rendering and optimized performance.
- **ShadCN UI** – Accessible, beautifully styled UI components.
- **Recharts** – Data visualization library used to display spending analytics in bar chart format.
- **Tailwind CSS** – Utility-first CSS for rapid and responsive styling.

### Backend & Services
- **Convex DB** – Serverless reactive database for fast, scalable data handling and live sync.
- **Clerk** – Authentication provider with built-in session, user management, and social login support.
- **Inngest** – Event-driven backend for setting up scheduled payment reminders and analytics tracking.
- **SendGrid** – Email service to send reminders, summaries, and notifications.
- **RESTful API (Convex Functions)** – Custom backend logic using Convex’s serverless functions.


## Insights & Analytics

- Monthly Spending Bar Chart – Visualized via Recharts
- Personalized Expense Summary Emails – Sent using SendGrid
- Spending Pattern Reminders – Triggered using Inngest
