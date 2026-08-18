# Architecture Decisions

## Stack Choice: React + Express + MongoDB

**Why this stack:**
- React 19 with Vite: Fast dev experience, hot reload, production builds optimized by Vite
- Express 5: Lightweight, well-documented, perfect for REST APIs
- MongoDB (Mongoose): Flexible schema for evolving config data, Atlas for hosted DB

**Alternatives considered:**
- Next.js: Overkill for this app — we need a static SPA, not SSR/SSG
- PostgreSQL: Config data is document-oriented (nested questions, options arrays), MongoDB fits naturally
- Supabase/Firebase: Adds vendor lock-in, MongoDB Atlas is simpler for this scope

## Pricing Formula (Server-Side Only)

Formula runs on the server in `server/src/services/calculator.js`:

```
Base Material = Area × Rate_per_sqft × (1 + Waste)
Tear-Off = Area × Tearoff_rate
Subtotal = (Base_Material + Tear_Off) × Modifier_Product × Modifier_Size
Mid = Subtotal + Flat Premium
Low = Mid × (1 - Spread)
High = Mid × (1 + Spread)
```

The formula is never exposed to the client. The client sends answer values; the server returns price ranges only.

## Why Questions Are Fetched from the Database

Questions, labels, options, and modifiers are stored in MongoDB via the Config model. This allows the admin to:
- Toggle questions on/off without code changes
- Edit labels and help text
- Adjust pricing rates and modifiers
- Add/remove options for dropdown questions

The frontend has zero hardcoded questions — it renders whatever the API returns via the `QuestionField` component.

## Scope Decisions

**Included:**
- Public multi-step estimator wizard
- Contact capture (name, phone, email)
- Server-side price calculation
- Result page with low/mid/high range
- Admin login with JWT
- Config editor for questions and rates
- Lead management table

**Excluded (intentionally):**
- User accounts / registration (admin only, single owner)
- Payment processing (this is an estimator, not a checkout)
- Email notifications (can be added later)
- PDF export (can be added later)
- Multi-language support (not in scope)
- Mobile app (responsive web is sufficient)

## Seed Data

The seed script (`server/src/config/seed.js`) populates the database with:
- All estimator questions with options and modifiers
- Pricing rates and defaults
- Config version v3

Run `node src/config/seed.js` from the server directory to reset config to defaults.

## Questions for Dale Before Production

1. Should the admin be able to create additional admin accounts?
2. Do we need email notifications when a lead is submitted?
3. Should estimates expire after a certain time period?
4. Do you want PDF export of estimates?

