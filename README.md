# Bonigut — FIFA World Cup 2026 Sticker Album

Personal mobile-web sticker album tracker. Built with React + Vite + Supabase.

## Setup

### 1. Create a Supabase project

1. Go to [supabase.com](https://supabase.com) and create a new project.
2. In the **SQL Editor**, run the contents of `seed.sql` — this creates the `stickers` table and seeds all 980 stickers with `quantity = 0`.
3. Go to **Settings → API** and copy your `Project URL` and `anon public` key.

### 2. Configure environment

```bash
cp .env.example .env
```

Edit `.env` and fill in your values:

```
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

### 3. Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:5173` on your phone or browser.

---

## Deploy to Render (static site)

1. Push this repo to GitHub.
2. In [Render](https://render.com), click **New → Static Site**.
3. Connect your GitHub repo.
4. Set build settings:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
5. Add environment variables:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
6. Click **Create Static Site**.

---

## Sticker counts

| Collection | Stickers |
|------------|---------|
| FWC (especiales FIFA) | 10 |
| CC (Colección Clásica) | 10 |
| Cada selección (×48) | 20 |
| **Total** | **980** |

## Countries

FWC CC MEX RSA KOR CZE CAN BIH QAT SUI BRA MAR HAI SCO USA PAR AUS TUR GER CUW CIV ECU NED JPN SWE TUN BEL EGV IRN NZL ESP CPV KSA URU FRA SEN IRQ NOR ARG ALG AUT JOR POR COD UZB COL ENG CRO GHA PAN
