# SHORS

SHORS is a premium fashion apparel and accessories brand platform, featuring bold, culturally expressive canvas tote bags rooted in Indian heritage. Unapologetic, loud, and confident.

## Repository Purpose
This monorepo contains the complete platform for SHORS, including the customer-facing frontend, the administrative dashboard, and the backend API server. It is structured to allow independent development and deployment of each component while maintaining a unified codebase for version control.

## Folder Structure
```
/
├── shors-frontend/  # Customer-facing storefront (Next.js App Router)
├── shors-admin/     # Admin dashboard for managing products, preorders, and site content (Next.js App Router)
└── shors-backend/   # REST API server and database management (Node.js, Express, Prisma)
```

## Tech Stack
- **Frontend**: Next.js (React), Tailwind CSS, Framer Motion
- **Admin**: Next.js (React), Tailwind CSS, React Hook Form, Zod
- **Backend**: Node.js, Express, Prisma ORM, PostgreSQL (via Neon or similar)
- **Deployment**: Vercel (Frontend & Admin), DOMAINZ/Node.js hosting (Backend)

## Basic Setup Instructions

### Prerequisites
- Node.js (v18+)
- PostgreSQL database
- Package manager (`npm`, `yarn`, or `pnpm`)

### 1. Database & Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd shors-backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up your environment variables:
   Copy `.env.example` to `.env` and update the `DATABASE_URL` and `JWT_SECRET`.
4. Initialize the database schema:
   ```bash
   npx prisma generate
   npx prisma db push
   ```
5. Start the backend development server:
   ```bash
   npm run dev
   ```

### 2. Frontend Setup
1. Open a new terminal and navigate to the frontend directory:
   ```bash
   cd shors-frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Copy `.env.example` to `.env.local` and set `NEXT_PUBLIC_API_URL` to point to your local backend.
4. Start the frontend development server:
   ```bash
   npm run dev
   ```

### 3. Admin Setup
1. Open a new terminal and navigate to the admin directory:
   ```bash
   cd shors-admin
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Copy `.env.example` to `.env.local` and set `NEXT_PUBLIC_API_URL` to point to your local backend.
4. Start the admin development server:
   ```bash
   npm run dev
   ```

## Development Workflow
- All code changes should be staged from the root of the repository.
- A unified `.gitignore` at the root ensures that no sensitive files (like `.env` or `dev.db`), caches, or build artifacts are ever committed.
- Ensure that the backend is running before testing API-dependent features in the frontend or admin panel.
