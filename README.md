# Vrund Kasodariya Portfolio

A modern personal portfolio for Vrund Kasodariya, focused on backend engineering, first-principles learning, scalable systems, APIs, authentication, distributed architecture, and problem solving.

## Stack

- Next.js
- TypeScript
- Tailwind CSS
- Framer Motion
- Lucide React icons
- Vercel-ready deployment

## Local Setup

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open `http://localhost:3000`.

## Build

Create a production build:

```bash
npm run build
```

Run the production server:

```bash
npm start
```

## Resume

The resume download button points to:

```text
/resume.pdf
```

Replace `public/resume.pdf` with the final resume file before publishing.

## Deployment

Deploy on Vercel:

1. Push this project to GitHub.
2. Import the repository in Vercel.
3. Use the default Next.js settings.
4. Deploy.

No custom server configuration is required.

## Coding Stats Cache

The `/api/coding-stats` route fetches Codolio first, then falls back to the
previous successful stats response, then to an emergency exact snapshot.

For a persistent production cache across cold starts, add Vercel KV or Upstash
Redis REST variables:

```text
KV_REST_API_URL
KV_REST_API_TOKEN
```

The route also supports:

```text
UPSTASH_REDIS_REST_URL
UPSTASH_REDIS_REST_TOKEN
```
