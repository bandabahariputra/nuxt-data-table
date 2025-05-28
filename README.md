# Nuxt Data Table

A Nuxt 3 application with a powerful DataTable component.

## Tech Stack

- **Framework:** [Nuxt.js](https://nuxt.com)
- **Styling:** [Tailwind CSS](https://tailwindcss.com)
- **UI Components:** [nuxt/ui](https://ui.nuxt.com)
- **Table package:** [TanStack/vue-table](https://tanstack.com/table/latest)
- **ORM:** [Prisma ORM](https://prisma.io)
- **Database:** [Supabase](https://supabase.com)

## Features

- [x] Server-side pagination
- [x] Customizable columns

## Running Locally

1. Clone the repository

   ```bash
   git clone https://github.com/bandabahariputra/nuxt-data-table
   ```

2. Install dependencies using pnpm

   ```bash
   pnpm install
   ```

3. Copy the `.env.example` to `.env` and update the variables.

   ```bash
   cp .env.example .env
   ```

4. (Optional) Run database using docker-compose.yml file

   ```bash
   docker compose up
   ```

5. Push the database schema

   ```bash
   pnpm run db:push
   ```

6. Seed the database

   ```bash
   pnpm run db:seed
   ```

7. Start the development server

   ```bash
   pnpm run dev
   ```
