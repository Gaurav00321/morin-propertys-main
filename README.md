# Maruti Developers — Industrial Real Estate Platform

> Full-stack Next.js 14 + Supabase website with admin panel, lead management, property listings, blog CMS, and WhatsApp/email lead delivery.

![Maruti Developers](https://img.shields.io/badge/Next.js-14-black) ![Supabase](https://img.shields.io/badge/Supabase-Database-green) ![TypeScript](https://img.shields.io/badge/TypeScript-5-blue) ![Tailwind](https://img.shields.io/badge/Tailwind-3.4-06B6D4)

---

## 🚀 Quick Start

### Prerequisites
- Node.js 20+
- A [Supabase](https://supabase.com) account (free tier works)
- A [Resend](https://resend.com) account (for emails — free tier: 3,000/month)
- A [Vercel](https://vercel.com) account (for deployment — free tier works)

### 1. Clone & Install

```bash
git clone https://github.com/YOUR_USERNAME/maruti-developers.git
cd maruti-developers
npm install
```

### 2. Set Up Supabase

1. Go to [supabase.com](https://supabase.com) → New Project
2. Name: `maruti-developers` | Region: `ap-south-1` (Mumbai)
3. Once created: Go to **SQL Editor** → paste contents of `supabase/schema.sql` → Run
4. Go to **Settings → API** → Copy:
   - Project URL → `NEXT_PUBLIC_SUPABASE_URL`
   - anon public key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - service_role key → `SUPABASE_SERVICE_ROLE_KEY`
5. Go to **Authentication → Users** → Add user with your admin email + password
6. Go to **Storage** → Create buckets:
   - `property-images` (public)
   - `blog-images` (public)
   - `property-documents` (private)

### 3. Set Up Resend Email

1. Go to [resend.com](https://resend.com) → API Keys → Create key
2. Add your domain (marutilanddevelopers.com) for professional from-address
3. Copy API key → `RESEND_API_KEY`

### 4. Environment Variables

```bash
cp .env.example .env.local
```

Edit `.env.local` and fill in all values (see `.env.example` for reference).

**Minimum required:**
```
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...
RESEND_API_KEY=re_...
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXX
```

### 5. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

Admin panel: [http://localhost:3000/admin](http://localhost:3000/admin)

---

## 📁 Project Structure

```
maruti-developers/
├── src/
│   ├── app/
│   │   ├── page.tsx              # Home (Landing Page)
│   │   ├── layout.tsx            # Root layout + GA4
│   │   ├── globals.css           # Design system CSS
│   │   ├── sitemap.ts            # Auto-generated sitemap
│   │   ├── robots.ts             # SEO robots
│   │   ├── about/page.tsx        # About page
│   │   ├── contact/page.tsx      # Contact page
│   │   ├── properties/
│   │   │   ├── page.tsx          # Property listings
│   │   │   ├── PropertiesClient.tsx  # Filter + grid
│   │   │   └── [id]/page.tsx     # Property detail
│   │   ├── blog/
│   │   │   ├── page.tsx          # Blog index
│   │   │   └── [slug]/page.tsx   # Blog post
│   │   ├── admin/
│   │   │   ├── layout.tsx        # Admin layout
│   │   │   ├── login/page.tsx    # Admin login
│   │   │   ├── page.tsx          # Dashboard
│   │   │   ├── leads/page.tsx    # Lead management
│   │   │   ├── properties/       # Property CRUD
│   │   │   ├── blog/             # Blog CMS
│   │   │   └── settings/page.tsx # Site settings
│   │   └── api/
│   │       ├── leads/route.ts    # Lead API (POST→Supabase+Email+WA)
│   │       ├── leads/[id]/route.ts
│   │       ├── properties/route.ts
│   │       └── blog/route.ts
│   ├── components/
│   │   ├── LeadMagnetPopup.tsx   # THE key conversion component
│   │   ├── WhatsAppBubble.tsx    # Floating WA button
│   │   ├── layout/               # Navbar, Footer
│   │   ├── home/                 # All landing page sections
│   │   └── admin/                # Admin UI components
│   ├── lib/
│   │   └── supabase.ts           # DB client + types
│   └── middleware.ts             # Admin route protection
├── supabase/
│   └── schema.sql                # Database schema
├── .github/workflows/
│   └── deploy.yml                # CI/CD to Vercel
├── .env.example                  # Environment template
└── ARD.html                      # Architecture document
```

---

## 🗄️ Database Tables

| Table | Purpose |
|-------|---------|
| `leads` | All form submissions (popup, hero, contact, footer, property) |
| `properties` | Industrial property listings with full metadata |
| `blog_posts` | Blog CMS with Tiptap HTML content |
| `settings` | Site-wide config (WhatsApp number, popup delay, etc.) |
| `property_inquiries` | Links leads to specific properties |

---

## 🚦 Lead Flow

```
User fills form → POST /api/leads → Supabase INSERT
                                  → Resend email to admin
                                  → Resend confirmation to lead
                                  → WhatsApp wa.me deep link shown
                                  → GA4 event tracked
Admin sees lead → /admin/leads → clicks WhatsApp button → contacts lead
```

---

## 🔐 Admin Access

1. Go to `/admin/login`
2. Email: `marutideveloper78@gmail.com`
3. Password: Set in Supabase Auth dashboard

**To reset password:**
- Supabase Dashboard → Authentication → Users → find user → Send reset email

---

## 🚀 Deploy to Vercel

### Option A: GitHub Integration (Recommended)

1. Push code to GitHub: `git push origin main`
2. Go to [vercel.com](https://vercel.com) → New Project → Import from GitHub
3. Select `maruti-developers` repo
4. Add all environment variables from `.env.local`
5. Deploy!

**Auto-deploy:** Every push to `main` triggers a new deployment.

### Option B: Vercel CLI

```bash
npm i -g vercel
vercel login
vercel --prod
```

### GitHub Actions CI/CD

Add these secrets to GitHub repo → Settings → Secrets:
- `VERCEL_TOKEN` — from vercel.com/account/tokens
- `VERCEL_ORG_ID` — from `.vercel/project.json` after first deploy
- `VERCEL_PROJECT_ID` — same file

---

## 🎨 Design System

**Colors:**
- Primary Green: `#22c55e` (brand-green-light)
- Dark Green: `#16a34a` (brand-green)  
- Gold: `#d97706` (accents, "Since 1998")
- Dark BG: `#050A05`

**Fonts:**
- Display: `Syne` (headings, font-weight 700–800)
- Body: `DM Sans`
- Mono: `JetBrains Mono` (prices, sizes)

---

## 📱 Lead Magnet Popup

The popup fires on whichever trigger comes first:
1. **30 seconds** on page
2. **60% scroll depth**
3. **Exit intent** (mouse leaves viewport top)

Once shown, stores timestamp in `localStorage`. Re-shows after 7 days.
Mobile: full-screen bottom drawer.
Desktop: centered modal with spring animation.

---

## 🔍 Property Filters

URL-syncable filters at `/properties`:
- `?state=Gujarat` — filter by state
- `?type=warehouse` — filter by type
- `?transaction=lease` — sale/lease/rent
- `?estate=GIDC` — industrial estate
- `?railway_siding=true` — infrastructure filter

---

## 📊 Google Analytics Events

| Event | Trigger |
|-------|---------|
| `lead_submit` | Any form submission |
| `whatsapp_click` | Any WhatsApp button click |
| `popup_shown` | Lead magnet popup appears |
| `property_view` | Property detail page load |
| `filter_applied` | Property filter change |
| `blog_read` | Blog post scroll depth |

---

## 🛡️ Security

- Admin routes protected by Supabase Auth session check (middleware.ts)
- API rate limiting: 5 requests/minute per IP
- Row Level Security on all Supabase tables
- XSS prevention: DOMPurify + React JSX escaping
- Secrets: Vercel environment variables only, never in code

---

## 📞 Support

**Vinod Jaiswal** — Maruti Developers  
📱 +91 98986 10678  
📧 marutideveloper78@gmail.com  
🌐 www.marutilanddevelopers.com  
📍 Atlantic K-10, Office No. 225, Vadodara, Gujarat 390023

---

*Built with ❤️ for Maruti Developers. All transactions white-money. RERA-compliant.*
