# RoofQuote — Roofing Estimator for Northline Roofing & Exteriors

A full-stack web application that provides instant roofing estimates to homeowners and gives the business owner a panel to manage configuration and view leads.

## Live Demo

**URL**: [Coming after deployment]

## Tech Stack

| Layer    | Technology                |
|----------|---------------------------|
| Frontend | React 19, Vite, Tailwind CSS v4 |
| Backend  | Express 5, Node.js        |
| Database | MongoDB (Mongoose ODM)    |
| Auth     | JWT (jsonwebtoken)        |

## Project Structure

```
roof-estimator/
├── client/               # React SPA
│   ├── src/
│   │   ├── components/   # UI components (estimator, common, owner)
│   │   ├── context/      # React Context (EstimatorContext, AuthContext)
│   │   ├── pages/        # Route pages (Home, Estimator, EstimateResult, admin/)
│   │   ├── services/     # API service (axios)
│   │   └── App.jsx       # Router setup
│   └── vite.config.js
├── server/               # Express API
│   ├── src/
│   │   ├── config/       # DB connection, seed script
│   │   ├── controllers/  # Route handlers
│   │   ├── middleware/    # JWT auth middleware
│   │   ├── models/       # Mongoose schemas (Config, Lead)
│   │   ├── routes/       # Express routers
│   │   └── services/     # Calculator logic
│   └── .env              # Environment variables (not committed)
├── DECISIONS.md          # Architecture decisions
├── AI_LOG.md             # AI tool usage documentation
└── README.md
```

## Local Setup

### Prerequisites

- Node.js 18+
- MongoDB Atlas account (or local MongoDB)

### 1. Clone the repo

```bash
git clone <repo-url>
cd roof-estimator
```

### 2. Install dependencies

```bash
cd server && npm install
cd ../client && npm install
```

### 3. Configure environment variables

Create `server/.env`:

```env
MONGODB_URI=mongodb+srv://<user>:<pass>@cluster.mongodb.net/roof-estimator
JWT_SECRET=<any-random-string>
ADMIN_USER=admin
ADMIN_PASS=roofing2026!
PORT=5000
```

### 4. Seed the database

```bash
cd server
node src/config/seed.js
```

### 5. Start the servers

```bash
# Terminal 1 — API server (port 5000)
cd server
npm run dev

# Terminal 2 — Vite dev server (port 5173)
cd client
npm run dev
```

### 6. Open in browser

- **Public estimator**: http://localhost:5173
- **Admin login**: http://localhost:5173/admin/login

## Admin Test Credentials

| Field    | Value         |
|----------|---------------|
| Username | `admin`       |
| Password | `roofing2026!` |

## Core Flow

1. **Public user** visits the estimator, answers questions across 3 steps
2. Captures contact info (name, phone, email)
3. Submits — server calculates price range using the formula in `calculator.js`
4. Result page shows Low / Mid / High estimate
5. **Admin** logs in, edits config (questions, rates, toggles), and views all leads

## API Endpoints

| Method | Endpoint              | Auth     | Description            |
|--------|-----------------------|----------|------------------------|
| GET    | `/api/config`         | Public   | Get estimator config   |
| POST   | `/api/estimate`       | Public   | Submit answers, get price |
| POST   | `/api/auth/login`     | Public   | Login, receive JWT     |
| GET    | `/api/admin/leads`    | JWT      | List all leads         |
| PUT    | `/api/admin/config`   | JWT      | Update config          |

## Deployment

### Frontend (Vercel/Netlify)

```bash
cd client
npm run build
# Deploy the dist/ folder
```

Set `VITE_API_URL` environment variable to your deployed API URL.

### Backend (Render/Railway)

Set environment variables in the hosting dashboard:
- `MONGODB_URI`
- `JWT_SECRET`
- `ADMIN_USER`
- `ADMIN_PASS`
- `PORT` (hosting providers usually set this automatically)

## License

Private — Northline Roofing & Exteriors
