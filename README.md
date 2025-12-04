# Review Funnel Generator & Feedback Web App

A web app that lets businesses generate shareable review links for customers. Customers can leave ratings (1–5 stars) and feedback. Businesses can view and edit all data in an admin dashboard.

Built with **Vue 3**, **Vite**, **TypeScript**, **Nuxt UI**, and **Firebase**.

## Features

- Create businesses with name, email, and Google profile link
- Shareable funnel links for customers
- 1–5 star rating system
- Conditional redirect:
  - 3–5 stars → Redirect to Google Profile
  - 1–2 stars → Show feedback form
- Feedback collected and saved in Firebase
- Admin dashboard to view/edit businesses and copy funnel links
- Responsive UI using Nuxt UI

## Tech Stack

- Vue 3 + TypeScript
- Vite
- Nuxt UI
- Firebase Firestore
- Vue Router