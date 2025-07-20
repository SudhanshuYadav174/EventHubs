# EventHub Project Report

---

## Title Page

**Project:** EventHub  
**Type:** Full-Stack Event Management Platform  
**Tech Stack:** React, TypeScript, Tailwind CSS, shadcn UI, Supabase, Resend

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Features](#features)
3. [Architecture Diagram](#architecture-diagram)
4. [Setup Instructions](#setup-instructions)
5. [Usage](#usage)
6. [Email Confirmation Flow](#email-confirmation-flow)
7. [Screenshots](#screenshots)
8. [Credits](#credits)

---

## Project Overview

EventHub is a modern, responsive event management platform. Users can browse, create, and register for events. The platform supports authentication, creator/attendee modes, and sends email confirmations for event registrations using Supabase Edge Functions and Resend.

---

## Features

- Responsive UI for desktop and mobile
- Event creation and registration
- Supabase authentication and database
- Creator/Attendee mode toggle
- Email confirmation on registration (via Edge Function + Resend)
- Accessible modals and forms
- Sidebar navigation and dashboard

---

## Architecture Diagram

```
[User] <-> [React Frontend (Vite, shadcn UI, Tailwind)] <-> [Supabase Backend]
    |                                                        |
    |-- Registration --> [Supabase Edge Function: resend-email] --(API)--> [Resend]
    |<------------------- Email Confirmation -----------------------------|
```

---

## Setup Instructions

### Prerequisites

- Node.js (v16+)
- npm or yarn
- Supabase account
- Resend account (for email confirmations)

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

Create a `.env.local` file:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. Supabase Setup

- Create tables: `events`, `registrations`, `profiles` (see code for schema)
- Enable RLS and add policies

### 5. Edge Function for Email Confirmation

- Create a Resend account and verify your sender domain
- In Supabase, create an Edge Function (e.g., `resend-email`)
- Add your Resend API key as a secret named `RESEND_API_KEY`
- Use this code:

```ts
import "jsr:@supabase/functions-js/edge-runtime.d.ts";
const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
Deno.serve(async (req) => {
  const { to, subject, html } = await req.json();
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${RESEND_API_KEY}`,
    },
    body: JSON.stringify({
      from: "noreply@yourdomain.com",
      to,
      subject,
      html,
    }),
  });
  const data = await res.json();
  return new Response(JSON.stringify(data), {
    headers: {
      "Content-Type": "application/json",
    },
    status: res.ok ? 200 : 500,
  });
});
```

### 6. Running the App Locally

```sh
npm run dev
# or
yarn dev
```

Visit [http://localhost:3000](http://localhost:3000)

---

## Usage

- Create an account or log in
- Browse events
- Create events (as a creator)
- Register for events (as an attendee)
- Toggle between Creator/Attendee mode
- Receive email confirmation after registration

---

## Email Confirmation Flow

1. User registers for an event
2. Registration is saved in Supabase
3. Frontend calls the Edge Function `/resend-email` with user email and event info
4. Edge Function sends email via Resend
5. User receives confirmation email

---

## Screenshots

> _Add screenshots here for UI, registration, and email confirmation_

---

## Credits

- Developed by: [Your Name/Team]
- Powered by: React, Supabase, Resend, Tailwind CSS, shadcn UI
- Special thanks to open source contributors
