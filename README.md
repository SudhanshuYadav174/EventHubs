# EventHub

EventHub is a full-stack event management platform built with React, TypeScript, Tailwind CSS, shadcn UI, and Supabase. It allows users to browse, create, and register for events with authentication, real-time updates, and email confirmations.

## Features

- Responsive UI for desktop and mobile
- Event creation and registration
- Supabase authentication and database
- Creator/Attendee mode toggle
- Email confirmation on registration (via Supabase Edge Function + Resend)
- Accessible modals and forms
- Sidebar navigation and dashboard

## Prerequisites

- [Node.js](https://nodejs.org/) (v16+ recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [Supabase account](https://supabase.com/)
- [Resend account](https://resend.com/) (for email confirmations)

## Getting Started

### 1. Clone the Repository

```sh
git clone <your-repo-url>
cd engage-spark-explore-main
```

### 2. Install Dependencies

```sh
npm install
# or
yarn install
```

### 3. Set Up Environment Variables

Create a `.env.local` file in the root directory and add your Supabase credentials:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. Supabase Setup

- Create a new project in Supabase.
- Set up the following tables: `events`, `registrations`, `profiles` (see your codebase for schema).
- Enable Row Level Security (RLS) and add appropriate policies.
- [Optional] Enable Realtime for live updates.

### 5. Running the App Locally

```sh
npm run dev
# or
yarn dev
```

Visit [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

- **Create an account** or log in.
- **Browse events** on the dashboard.
- **Create events** (as a creator) from the sidebar or Create Event page.
- **Register for events** as an attendee. You will receive a confirmation email.
- **Toggle between Creator/Attendee mode** using the sidebar switch.

## Deployment

- Deploy your frontend (Vercel, Netlify, etc.)
- Deploy your Supabase Edge Functions from the Supabase dashboard.
- Set all environment variables in your deployment platform.

## License

MIT
