# PPT Pilot

PPT Pilot is an AI-powered presentation generator. Describe a topic, paste your notes, or pick a template, and PPT Pilot turns it into a full slide deck — titles, content, speaker notes, and illustrative images — generated in the background so you can keep working while it builds.

## Features

- **AI slide generation** — Google Gemini (`gemini-2.5-flash` via the [AI SDK](https://ai-sdk.dev/)) turns a prompt into a structured deck: title slide, content slides, and a closing/summary slide.
- **Customizable output** — choose slide count (3–20), style (Minimal, Professional, Creative, Bold), tone (Formal, Casual, Persuasive, Informative), and layout (Text Heavy, Visual Focus, Balanced, Bullet Points).
- **Ready-made templates** — jump-start generation with prompt templates instead of starting from a blank page.
- **Background generation with Inngest** — generation runs as a durable, retryable background job (`generate-presentation`), so the UI shows live status (Draft → Generating → Completed/Failed) without blocking the request.
- **AI-generated slide imagery** — each slide gets an illustration prompt and a rendered image via ImageKit.
- **Slideshow viewer** — review generated decks slide-by-slide with a fullscreen presentation mode.
- **Authentication** — sign in with GitHub or Google via [better-auth](https://www.better-auth.com/).
- **Persistence** — presentations, slides, users, and sessions are stored in Postgres via [Prisma](https://www.prisma.io/).

## Tech Stack

- [TanStack Start](https://tanstack.com/start) (React 19, file-based routing via [TanStack Router](https://tanstack.com/router), SSR via Nitro)
- [TanStack Query](https://tanstack.com/query) for data fetching/caching
- [Prisma](https://www.prisma.io/) + PostgreSQL
- [better-auth](https://www.better-auth.com/) for authentication (GitHub & Google OAuth)
- [Inngest](https://www.inngest.com/) for background/durable presentation generation
- [AI SDK](https://ai-sdk.dev/) + [Google Gemini](https://ai.google.dev/) for content generation
- [ImageKit](https://imagekit.io/) for AI slide image rendering
- [Tailwind CSS](https://tailwindcss.com/) + [Radix UI](https://www.radix-ui.com/) / shadcn-style components

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

Create a `.env` file in the project root with:

```bash
DATABASE_URL=                    # Postgres connection string
GITHUB_CLIENT_ID=                # GitHub OAuth app
GITHUB_CLIENT_SECRET=
GOOGLE_CLIENT_ID=                # Google OAuth app
GOOGLE_CLIENT_SECRET=
GOOGLE_GENERATIVE_AI_API_KEY=    # Gemini API key
INNGEST_DEV=                     # e.g. 1, to run against the local Inngest dev server
IMAGEKIT_URL=                    # ImageKit URL endpoint used to render slide images
IMAGEKIT_PUBLIC_KEY=
IMAGEKIT_PRIVATE_KEY=
```

### 3. Set up the database

```bash
npx prisma generate
npx prisma db push
```

(`npx create-db` can provision a free hosted Postgres instance if you don't have one.)

### 4. Run the app

```bash
npm run dev
```

The app runs at `http://localhost:3000`. Background jobs are handled by the Inngest function at `src/routes/api/inngest.ts`; run `npx inngest-cli dev` alongside `npm run dev` to process presentation generation locally.

## Building For Production

```bash
npm run build
npm run start
```

## Testing

This project uses [Vitest](https://vitest.dev/):

```bash
npm run test
```

## Linting & Formatting

This project uses [eslint](https://eslint.org/) and [prettier](https://prettier.io/) (via [tanstack/eslint-config](https://tanstack.com/config/latest/docs/eslint)):

```bash
npm run lint
npm run format
npm run check
```

## Project Structure

```
src/
  routes/                 # File-based routes (TanStack Router)
    index.tsx             # Home page — prompt form + presentation list
    presentations.$presentationId.tsx   # Presentation detail / slideshow
    _auth/                # Auth routes (login)
    api/                  # API routes (auth, inngest webhook)
  features/presentation/  # Presentation domain logic
    actions/              # Server functions (create/list presentations)
    components/           # Slide cards, previews, slideshow modal, status
    constant/              # Style/tone/layout options, templates
    hooks/                # Query keys, fullscreen hook, detail hook
  integrations/tanstack-query/inngest/  # Inngest client + generation function
  lib/                   # auth, db (Prisma client), utils
  components/ui/         # Reusable UI primitives (shadcn/Radix-based)
prisma/schema.prisma      # Database schema (User, Session, Presentation, Slide, ...)
```

## Deploy to Railway

This project ships with `nixpacks.toml` so Railway detects the build automatically:

1. Push this repo to GitHub
2. Visit https://railway.com/new and create a project from your repo
3. In the **Variables** tab, add the environment variables listed above with their production values
4. Railway runs `vite build` and serves from `dist/client`

Need a database? Click **+ New** in your project to provision Postgres directly into the same environment — the connection string is auto-injected as `DATABASE_URL`.

## Learn More

- [TanStack Start documentation](https://tanstack.com/start)
- [TanStack documentation](https://tanstack.com)
