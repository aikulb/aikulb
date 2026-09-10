# aikulb — Premium NFC Smart Business & Digital Identity Platform

<p align="center">
  <strong style="color: #FF3838;">aikulb</strong> is a next-generation smart networking platform offering NFC-enabled digital business cards, aerospace metal cards, natural wood cards, waterproof PVC cards, Google Review NFC cards, countertop NFC standees, digital identity profiles, lead capture engine, and instant vCard (VCF) contact saving.
</p>

---

## 🌟 Key Features

- **Smart Hardware E-Commerce**:
  - Aerospace Grade Matte Metal NFC Cards (Stainless Steel, 24K Gold Plated, Silver).
  - Eco-Friendly Natural Bamboo & Wood NFC Cards.
  - Waterproof PVC Smart Business Cards.
  - Countertop NFC Standees & Google Review Boosters.
- **Interactive Card Customizer**: Real-time visual customizer to adjust card colors, custom laser engraving names, design previews, and instant order additions.
- **Digital Profile & Identity Engine**: Dynamic `/profile/:username` web identity page with bio, quick action contact buttons (Call, WhatsApp, Email, VCF download), social channels, custom document links, and service showcase.
- **Lead Capture System**: Connect & share contact details directly from public digital profiles, saved directly to the database.
- **VCF Contact Generator**: One-click vCard (.vcf) download to instantly save contacts to smartphone address books without manual typing.
- **Shopping Cart & Checkout**: Interactive sliding cart drawer, real-time total calculation, stock management, and complete checkout experience.
- **Super Admin Panel**: Live platform metrics (total revenue, total orders, active users, active profiles) and hardware product catalog management.
- **Turso Cloud DB Integration**: Distributed cloud database sync powered by `@libsql/client`.

---

## 🛠️ Technology Stack

- **Frontend**:
  - [React](https://react.dev/) + [Vite](https://vitejs.dev/)
  - [Tailwind CSS](https://tailwindcss.com/) (Custom Premium White & Dark themes)
  - [Lucide React](https://lucide.dev/) (Modern SVG Icons)
  - [QRCode.react](https://github.com/zpao/qrcode.react) (Dynamic SVG QR Code generation)
  - [React Router DOM](https://reactrouter.com/) (Client-side routing)
- **Backend**:
  - [Node.js](https://nodejs.org/) + [Express](https://expressjs.com/)
  - [LibSQL Client](https://github.com/tursodatabase/libsql-client-ts) (Turso Cloud DB SQL driver)
  - RESTful APIs with CORS & JSON body parsing

---

## 📁 Repository Structure

```text
AICLUB/
├── backend/
│   ├── src/
│   │   ├── config/          # Turso DB client connection setup
│   │   ├── routes/          # Express API route handlers
│   │   └── services/        # Database initialization & seeding scripts
│   ├── .env.example         # Template environment configuration
│   ├── package.json         # Backend node dependencies
│   └── server.js            # Node/Express server entry point
├── frontend/
│   ├── src/
│   │   ├── components/      # Navbar, Footer, CartDrawer, Visual Cards, etc.
│   │   ├── context/         # AuthContext, CartContext, WishlistContext
│   │   ├── pages/           # Store, ProductDetail, PublicProfile, Admin, Auth, etc.
│   │   ├── services/        # API client HTTP handlers
│   │   ├── App.jsx          # Router & Route declarations
│   │   └── index.css        # Global CSS & Tailwind imports
│   ├── index.html           # Main HTML entry point
│   ├── package.json         # Frontend node dependencies
│   └── vite.config.js       # Vite build setup
├── .gitignore               # Master repository git ignore rules
└── README.md                # Project documentation
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v18.0.0 or higher)
- **npm** or **yarn**

---

### 1. Backend Setup

Navigate to the `backend` directory, install dependencies, configure environment variables, and start the server:

```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` directory (refer to `.env.example`):

```env
PORT=5000
TURSO_DATABASE_URL=libsql://aikulb-aikulb.aws-ap-south-1.turso.io
TURSO_AUTH_TOKEN=your_turso_auth_token_here
```

Start the backend server:

```bash
node server.js
```

The backend server will run at `http://localhost:5000`.

---

### 2. Frontend Setup

In a separate terminal, navigate to the `frontend` directory, install dependencies, and start the Vite development server:

```bash
cd frontend
npm install
npm run dev
```

The frontend application will run at `http://localhost:5173`.

---

## 🌐 API Endpoints Overview

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/products` | Fetch all hardware products (supports `category`, `search`, `sort` query params) |
| `GET` | `/api/products/:id` | Fetch single product details |
| `GET` | `/api/categories` | Fetch hardware categories |
| `GET` | `/api/profile/:username` | Fetch public digital identity profile data |
| `POST` | `/api/lead` | Capture & save lead details from public profile |
| `GET` | `/api/profile/vcf/:username` | Download dynamic vCard (.vcf) for instant contact saving |
| `POST` | `/api/orders` | Create hardware purchase order |
| `GET` | `/api/admin/stats` | Fetch platform administration metrics |
| `POST` | `/api/admin/products` | Add new hardware product (Admin) |

---

## 🎨 Design System & Branding

- **Brand Name**: `aikulb` (Strictly lowercase)
- **Primary Brand Color**: Coral Red `#FF3838`
- **Subpage Theme**: Premium White (`#FFFFFF`) with high-contrast typography
- **Homepage Theme**: Pitch Dark (`#000000`) with sleek glowing micro-animations
- **Typography**: Google Fonts (Manrope, Inter, Outfit)

---

## 📄 License

Copyright © 2026 **aikulb**. All rights reserved.
