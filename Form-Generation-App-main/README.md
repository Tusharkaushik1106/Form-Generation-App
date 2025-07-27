Form-Generation-App

A full-stack web application inspired by Google Forms, built with Next.js (App Router), React, MongoDB, and TailwindCSS.

## Features
- Form builder with multiple question types
- User authentication (NextAuth.js)
- Role-based access (Admin/User)
- Form management dashboard
- Sharable public form links
- Response dashboard with CSV export and charts
- Modern, responsive UI with dark/light mode

## Tech Stack
- **Frontend:** Next.js (App Router), React, TailwindCSS, Zustand
- **Backend:** Next.js API Routes/Server Actions, MongoDB (Mongoose)
- **Auth:** NextAuth.js
- **Database:** MongoDB Atlas

## Project Structure
```
/src
  /app         # App Router pages
  /components  # Reusable UI components
  /lib         # DB and utility functions
  /models      # Mongoose schemas
  /middleware  # Auth and role middleware
/public        # Static assets
```

## Getting Started
1. Clone the repo and install dependencies:
   ```bash
   npm install
   ```
2. Set up your `.env` file (see below).
3. Run the development server:
   ```bash
   npm run dev
   ```

## Environment Variables
- `MONGODB_URI` - MongoDB Atlas connection string
- `NEXTAUTH_SECRET` - Secret for NextAuth.js
- `NEXTAUTH_URL` - Your app URL (e.g., http://localhost:3000)

---

This project is a work in progress. Contributions welcome! 
