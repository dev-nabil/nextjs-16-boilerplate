# Next.js 16 Production Boilerplate

A comprehensive, production-ready Next.js 16 starter template with TypeScript, Tailwind CSS v4, and modern React patterns.

## Features

- ⚡ **Next.js 16** - Latest App Router with React 19.2
- 🎨 **Tailwind CSS v4** - Properly configured with design tokens
- 🔷 **TypeScript** - Strict type checking enabled
- 🎯 **shadcn/ui** - Beautiful, accessible component library
- 📝 **Server Actions** - Modern data mutations without API routes
- 🔄 **Route Handlers** - RESTful API endpoints
- ✅ **Form Validation** - Zod schema validation
- 🌓 **Dark Mode** - Theme switching with next-themes
- ♿ **Accessibility** - WCAG compliant components
- 📱 **Responsive** - Mobile-first design approach

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, or pnpm

### Installation

\`\`\`bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
\`\`\`

Open [http://localhost:3000](http://localhost:3000) to see your application.

## Project Structure

\`\`\`
├── app/                      # Next.js App Router
│   ├── api/                 # API Route Handlers
│   ├── examples/            # Comprehensive examples
│   ├── docs/                # Documentation pages
│   ├── layout.tsx           # Root layout
│   ├── page.tsx             # Home page
│   └── globals.css          # Global styles
├── components/              # React components
│   ├── ui/                  # shadcn/ui components
│   ├── examples/            # Example components
│   └── theme-provider.tsx   # Theme context
├── lib/                     # Utilities and helpers
│   ├── actions/             # Server Actions
│   └── utils.ts             # Utility functions
├── hooks/                   # Custom React hooks
└── public/                  # Static assets
\`\`\`

## Examples Included

### Forms
- ✅ Simple contact form with validation
- ✅ Advanced forms with React Hook Form
- ✅ Multi-step forms with progress tracking
- ✅ File upload with preview

### Data Fetching
- ✅ Server Components with async data
- ✅ Route Handlers (GET, POST, PUT, DELETE)
- ✅ Streaming with Suspense
- ✅ Server Actions with mutations

### UI Components
- ✅ All shadcn/ui components
- ✅ Button variants and states
- ✅ Cards and layouts
- ✅ Dialogs and modals
- ✅ Data tables with sorting/filtering
- ✅ Charts and visualizations

### Patterns
- ✅ Error handling with error boundaries
- ✅ Loading states with Suspense
- ✅ Protected routes with middleware
- ✅ Optimistic UI updates

## Tech Stack

### Core
- **Next.js 16** - React framework
- **React 19.2** - UI library with Compiler support
- **TypeScript 5+** - Type safety

### Styling
- **Tailwind CSS v4** - Utility-first CSS
- **shadcn/ui** - Component library
- **Lucide React** - Icon library

### Data & Forms
- **Zod** - Schema validation
- **Server Actions** - Data mutations
- **Route Handlers** - API endpoints

### Tools
- **ESLint** - Code linting
- **next-themes** - Theme management

## Configuration

### Environment Variables

Create a `.env.local` file:

\`\`\`env
# Add your environment variables here
NEXT_PUBLIC_APP_URL=http://localhost:3000
\`\`\`

### Tailwind Configuration

Tailwind CSS v4 is configured in `app/globals.css` with design tokens for consistent theming.

### TypeScript

Strict mode is enabled in `tsconfig.json` for maximum type safety.

## Scripts

\`\`\`bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript compiler
\`\`\`

## Best Practices

### Server Components
- Use Server Components by default
- Only add "use client" when needed for interactivity
- Fetch data directly in Server Components

### Forms
- Use Server Actions for form submissions
- Validate with Zod schemas
- Show loading and error states

### Styling
- Use Tailwind utility classes
- Follow the spacing scale (p-4, gap-6, etc.)
- Use semantic color tokens (bg-background, text-foreground)

### Type Safety
- Define interfaces for all data structures
- Use Zod for runtime validation
- Enable TypeScript strict mode

## Deployment

### Vercel (Recommended)

\`\`\`bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
\`\`\`

### Docker

\`\`\`dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
CMD ["npm", "start"]
\`\`\`

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)

## License

MIT License - feel free to use this template for any project.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

---

Built with ❤️ using Next.js 16
