# ABO Wears — Project Documentation

## Overview
ABO Wears online sportswear store built with React + Vite + TypeScript + Tailwind CSS.
Live site: https://abowears.com.ng (Netlify)

## Architecture
- **Frontend**: React 18 + Vite + TypeScript + Tailwind CSS + Wouter (routing) + TanStack Query
- **Backend**: Supabase (PostgreSQL database + Auth)
- **Deployment**: Netlify (user manages GitHub push)
- **Monorepo**: pnpm workspace — artifact lives in `artifacts/abo-wears/`

## Key Files
- `src/App.tsx` — Route definitions (store + admin + promo + dynamic category)
- `src/data/products.ts` — Local product/category data (fallback when Supabase tables empty)
- `src/lib/supabase.ts` — Supabase client + TypeScript types + trackPageView helper
- `src/lib/colors.ts` — 14 color constants (Black, White, Red, Blue, Navy, etc.)
- `src/hooks/useProducts.ts` — useProducts(category?), useAdminProducts(), useCategories()
- `src/hooks/usePromos.ts` — useActivePromos(), usePromo(id), useAllPromos(), usePromoProducts(promoId)
- `src/components/PromoBanner.tsx` — Dismissable top banner for active promos
- `src/components/ColorSwatches.tsx` — Colored circle swatches shown on product cards
- `src/pages/PromoPage.tsx` — Promo page at /promo/:id (price slashes + % off badges)
- `src/pages/admin/AdminPage.tsx` — Admin dashboard shell (auth check + tab routing)
- `src/pages/admin/AdminLogin.tsx` — Sign In / Create Account form (email whitelist enforced)
- `src/pages/admin/ProductsTab.tsx` — Products CRUD with color picker
- `src/pages/admin/CategoriesTab.tsx` — Categories CRUD (new categories auto-create /category/[id])
- `src/pages/admin/PromosTab.tsx` — Promos CRUD + promo items management
- `src/pages/admin/AnalyticsTab.tsx` — Page views chart (recharts) + by-page breakdown
- `supabase-setup.sql` — Complete SQL schema + seed data (user runs once in Supabase SQL Editor)

## Supabase Database Tables
- `categories` — Product types with label, icon, href, sort_order
- `products` — Products with colors TEXT[], badge, active
- `promos` — Promo campaigns with banner_image, active flag
- `promo_products` — Items in a promo with original_price, promo_price
- `page_views` — Analytics: page + viewed_at timestamp

## Environment Variables (shared)
- `VITE_SUPABASE_URL` — Supabase project URL
- `VITE_SUPABASE_ANON_KEY` — Supabase public anon key
- `VITE_ADMIN_EMAILS` — Comma-separated admin email whitelist

## Data Loading Strategy
All hooks try Supabase first, fall back to local data if tables don't exist or return empty.
This means the store works before the SQL is run, and switches to DB data once set up.

## Admin Dashboard
- URL: /admin
- Auth: Supabase Auth email+password, email checked against VITE_ADMIN_EMAILS
- Admin emails: flamingpen1@gmail.com, aboluwasesan62@gmail.com
- Features: Products CRUD, Categories CRUD, Promos CRUD, Analytics

## Routes
- `/` — Homepage (promo banner + dynamic category nav + featured products)
- `/jerseys` — Jerseys page with tabs (club, retro, country, NFL, basketball, baseball)
- `/joggers`, `/shorts`, `/face-caps`, `/gloves` — Category pages
- `/category/:id` — Dynamic category pages (for new admin-created categories)
- `/promo/:id` — Promo page with price slashes
- `/cart` — Shopping cart (WhatsApp checkout with size selection)
- `/about` — About page
- `/admin` — Admin dashboard (login required)

## Analytics Tracking
Every page calls `trackPageView(path)` on mount. Data stored in `page_views` table.
Admin analytics shows views per day (bar chart) + views per page for last 7 or 30 days.

## Netlify Deployment
User pushes `artifacts/abo-wears` to GitHub → Netlify auto-deploys.
Set in Netlify → Site settings → Environment variables:
- VITE_SUPABASE_URL
- VITE_SUPABASE_ANON_KEY
- VITE_ADMIN_EMAILS

## Colors Feature
Products can have 1–14 colors assigned (stored as string[]).
Colors show as small labeled circles on product cards.
Available colors: Black, White, Red, Blue, Navy, Green, Yellow, Orange, Purple, Grey, Brown, Pink, Gold, Maroon.
