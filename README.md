# RealEstate AI

A full-stack real estate listing platform with AI-powered property recommendations,
built on Next.js and Supabase. Instead of matching listings by exact filters,
the app uses OpenAI embeddings and vector similarity search to recommend
properties based on semantic meaning — so "2BHK near metro" and "apartment
close to subway" are correctly identified as similar.

## Features

- **AI Recommendations** — Semantic similarity search using OpenAI embeddings
  and pgvector, surfacing related listings on every property page
- **Search & Filters** — Server-side filtering by location, price, and property
  type with shareable URL-based query parameters
- **Authentication** — Email/password auth with Supabase, session management
  via SSR cookies, and row-level security on all user data
- **Listing Management** — Create, edit, and delete listings with automatic
  embedding regeneration on content changes
- **Image Uploads** — Property photos stored via Supabase Storage
- **Map View** — Interactive map with custom price markers using Leaflet
- **Favourites** — Save and revisit listings, scoped per user
- **Enquiry System** — Lead capture form connecting buyers to listing owners
- **Dashboard** — Per-user analytics on views, saves, and enquiries received
- **View Tracking** — Per-listing view counts with duplicate-view prevention

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 14 (App Router), TypeScript, Tailwind CSS |
| Backend | Next.js API Routes |
| Database | Supabase (PostgreSQL) |
| Vector Search | pgvector |
| AI | OpenAI Embeddings API (text-embedding-3-small) |
| Auth | Supabase Auth (SSR) |
| Storage | Supabase Storage |
| Maps | Leaflet |
| Icons | Lucide React |

## How the Recommendation Engine Works

1. Each listing's title, description, location, price, and amenities are
   combined into a single text representation
2. OpenAI's embedding model converts this text into a 1,536-dimension vector
3. The vector is stored in a `vector` column via the pgvector extension
4. A PostgreSQL function (`match_listings`) calculates cosine similarity
   between vectors using the `<=>` operator and returns the closest matches
5. Embeddings are generated once at write-time, not per request — keeping
   recommendation queries fast and API costs low

## Project Structure

```
app/
  page.tsx                        Home page — listings grid + search
  listings/[id]/page.tsx          Listing detail page
  listings/[id]/edit/page.tsx     Edit listing
  listings/new/page.tsx           Create listing
  dashboard/page.tsx              User dashboard — listings, enquiries, stats
  saved/page.tsx                  Saved / favourited listings
  login/page.tsx                 Login
  signup/page.tsx                Signup
  api/
    listings/route.ts             Create listing + generate embedding
    listings/[id]/route.ts        Update / delete listing
    listings/[id]/view/route.ts   Increment view count
    similar-listings/route.ts     Vector similarity search
    favourites/route.ts           Toggle favourite
    enquiries/route.ts            Submit enquiry

components/
  ListingCard.tsx                 Property card
  SimilarListingsSidebar.tsx      Sidebar recommendations
  SearchFilters.tsx               Search + filter bar
  MapView.tsx                     Leaflet map with custom markers
  NewListingForm.tsx               Create listing form
  EditListingForm.tsx              Edit listing form
  EnquiryForm.tsx                  Lead capture form
  FavouriteButton.tsx              Save/unsave toggle
  Navbar.tsx / NavbarClient.tsx    Navigation + auth state

lib/
  supabase.ts                     Browser Supabase client
  supabase-server.ts               Server Supabase client (SSR)
```

## Getting Started

```bash
git clone https://github.com/vinay-sh87/realestate-ai.git
cd realestate-ai
npm install
```

Create a `.env.local` file:

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
OPENAI_API_KEY=
```

Run the development server:

```bash
npm run dev
```

Visit `http://localhost:3000`.

## Database Setup

Run the following in the Supabase SQL Editor, in order:

1. Enable the `vector` extension
2. Create the `listings`, `favourites`, and `enquiries` tables
3. Enable row-level security and add policies for read/insert/update/delete
4. Create the `match_listings` and `increment_views` SQL functions
5. (Optional, for scale) Add an HNSW index on the `embedding` column

Full SQL is available in the project's setup notes.

## Deployment

The app deploys cleanly to Vercel. Add the same environment variables from
`.env.local` to the Vercel project settings, then deploy — no additional
configuration is required for the Next.js build.

## License

MIT
