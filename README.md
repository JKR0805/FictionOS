# FictionOS

FictionOS is a modern, full-stack web application tailored for authors of serial fiction and their readers. It provides professional-grade tools for authors to manage their story bibles, draft chapters, and track lore consistency, while offering readers a stunning, highly-customizable reading experience to follow their favorite novels.

## Features

- **Author Dashboard**: Professional tooling to create novels, draft chapters, and eventually manage AI-assisted lore and character codices.
- **Reader Hub**: Discover new serials, follow favorites, and track reading progress cleanly.
- **Immersive Reader**: Distraction-free chapter reader with customizable fonts, themes, and layouts.
- **Dynamic Novel Covers**: Custom-uploaded book covers with built-in fallbacks to generated gradients based on IDs.
- **Automated Bookmarking**: Instantly continue reading exactly from where you left off.

## Tech Stack

- **Frontend**: React (Vite)
- **Styling**: Vanilla CSS (CSS Modules & Custom Properties) with modern aesthetic choices (Glassmorphism, Dark Mode)
- **Backend**: Express / Node.js
- **Database**: PostgreSQL (pg)
- **Authentication**: Firebase Auth

## Getting Started

### Prerequisites

- Node.js (v18+)
- PostgreSQL installed and running locally
- A Firebase project set up for Authentication

### Environment Variables

1. Navigate to the `client/` folder and copy `.env.example` to `.env`. Fill in your Firebase configuration keys.
2. Navigate to the `server/` folder and copy `.env.example` to `.env`. Provide your database connection string and matching Firebase configuration.

### Installation

1. Install backend dependencies:
   ```bash
   cd server
   npm install
   ```
2. Install frontend dependencies:
   ```bash
   cd client
   npm install
   ```

### Running the App Locally

The database tables will automatically initialize when you start the server for the first time.

1. **Start the Backend**
   ```bash
   cd server
   npm run dev
   ```

2. **Start the Frontend**
   ```bash
   cd client
   npm run dev
   ```

The frontend will be available at `http://localhost:5173` and it will automatically communicate with the backend running on `http://localhost:3001`.

## Database Schema

The application utilizes a rich PostgreSQL schema initialized automatically by the backend. The foundational tables include:
- `users`: Core user accounts syncing with Firebase.
- `novels`: Books and serials authored by users.
- `chapters`: The content nodes belonging to novels.
- `reading_progress`: Tracks reader engagement on a per-chapter basis.
- `novel_followers`: Users tracking specific ongoing works.
- *AI Foundation Tables* (`characters`, `locations`, `timeline_entries`, etc.) are pre-provisioned for future generative codex features.

## License

All Rights Reserved.
