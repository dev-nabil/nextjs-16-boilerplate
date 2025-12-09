# Local Setup Guide

This guide will help you set up the project on your local machine.

## Prerequisites

- Node.js 18.17 or higher
- npm, yarn, or pnpm package manager

## Installation Steps

### 1. Install Dependencies

\`\`\`bash
npm install
# or
yarn install
# or
pnpm install
\`\`\`

### 2. Start Development Server

\`\`\`bash
npm run dev
# or
yarn dev
# or
pnpm dev
\`\`\`

The application will be available at [http://localhost:3000](http://localhost:3000)

## Build for Production

\`\`\`bash
npm run build
npm run start
\`\`\`

## Project Structure

\`\`\`
├── app/                    # Next.js app directory
│   ├── page.tsx           # Home page
│   ├── layout.tsx         # Root layout
│   ├── globals.css        # Global styles with Tailwind v4
│   ├── examples/          # Example pages
│   └── api/               # API routes
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   └── examples/         # Example components
├── lib/                  # Utility functions
│   ├── utils.ts          # cn() and helpers
│   ├── cva.ts            # Class variance authority
│   └── actions/          # Server actions
└── hooks/                # Custom React hooks
\`\`\`

## Technology Stack

- **Next.js 16** - React framework with App Router
- **React 19** - Latest React with Server Components
- **Tailwind CSS v4** - Utility-first CSS framework
- **TypeScript** - Type safety
- **shadcn/ui** - High-quality React components
- **React Hook Form** - Form management
- **Zod** - Schema validation
- **React Hot Toast** - Toast notifications
- **Radix UI** - Accessible component primitives
- **Lucide React** - Icon library

## Features

- ✅ Server Components & Server Actions
- ✅ Form validation with Zod
- ✅ Dark mode support
- ✅ Responsive design
- ✅ Accessible components
- ✅ Type-safe API routes
- ✅ Advanced table with filters
- ✅ Multi-step forms
- ✅ File uploads
- ✅ Real-time toasts

## Available Examples

Visit `/examples` to see all available demos:

- **Forms**: Simple, Advanced, Multi-step, File Upload
- **Data Fetching**: Server Components, Route Handlers, Streaming
- **Components**: Buttons, Cards, Tables, Dialogs
- **Patterns**: Error Handling, Loading States

## Troubleshooting

### Styles not loading

Make sure you have the `postcss.config.mjs` file in the root directory:

\`\`\`javascript
export default {
  plugins: {
    '@tailwindcss/postcss': {},
  },
}
\`\`\`

### Port already in use

Change the port by running:
\`\`\`bash
PORT=3001 npm run dev
\`\`\`

### Type errors

Run type checking:
\`\`\`bash
npx tsc --noEmit
\`\`\`

## Environment Variables

Create a `.env.local` file for environment variables:

\`\`\`env
# Add your environment variables here
NEXT_PUBLIC_APP_URL=http://localhost:3000
\`\`\`

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS v4](https://tailwindcss.com/docs)
- [shadcn/ui](https://ui.shadcn.com)
- [React Hook Form](https://react-hook-form.com)
