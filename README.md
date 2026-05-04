# MedApp

A pharmacy/medical store management app with **React + TypeScript** frontend and **Go** backend.

## Stack

### Frontend (`src/`)

- [Vite](https://vitejs.dev/) — dev server + bundler
- [React 18](https://react.dev/) + TypeScript
- [React Router v6](https://reactrouter.com/) — routing
- [React Context + useReducer](./src/context/AuthContext.tsx) — auth state (replaces Vuex)
- [Tailwind CSS](https://tailwindcss.com/) + shadcn/ui-style primitives (replaces Vuetify)
- [Radix UI](https://www.radix-ui.com/) — accessible dialog/select/dropdown/accordion
- [lucide-react](https://lucide.dev/) — icon set (replaces MDI)
- [axios](https://axios-http.com/) — HTTP client
- [react-apexcharts](https://apexcharts.com/docs/react-charts/) — charts
- [papaparse](https://www.papaparse.com/) — CSV export
- [sonner](https://sonner.emilkowal.ski/) — toast notifications (replaces `v-snackbar`)

### Backend (`medic/`)

Plain Go `net/http` server on **port 29092**, unchanged from the original. See `medic/main.go` for the route table.

## Project setup

### Frontend

```bash
npm install
```

### Development (hot-reload)

```bash
npm run dev
```

Vite serves the app on [http://localhost:8080](http://localhost:8080).

### Production build

```bash
npm run build
npm run preview
```

### Backend

```bash
cd medic
go run main.go
```

Starts the API server on [http://localhost:29092](http://localhost:29092).

## Project layout

```
med-app/
├── medic/                    # Go backend (unchanged)
├── public/                   # favicon + static assets
├── src/
│   ├── App.tsx               # Root layout (Menubar + routes + bottom sheet)
│   ├── main.tsx              # React entry point
│   ├── index.css             # Tailwind base + design tokens
│   ├── assets/               # images (logo, pharmacy.jpg)
│   ├── DB/                   # seed CSVs for reference
│   ├── components/
│   │   ├── ui/               # shadcn/ui primitives (button, card, dialog, table, combobox, ...)
│   │   └── *.tsx             # feature components (Menubar, Login, Dashboards, Charts, ...)
│   ├── context/
│   │   └── AuthContext.tsx   # auth state via React Context + useReducer
│   ├── lib/
│   │   └── utils.ts          # cn() helper for Tailwind
│   ├── router/
│   │   └── routes.tsx        # React Router v6 route map
│   ├── services/
│   │   └── eventService.ts   # axios wrapper → Go API
│   ├── types/
│   │   └── index.ts          # shared TS types
│   └── views/                # page-level components for each route
├── index.html                # Vite HTML entry
├── package.json
├── tsconfig.json
├── tailwind.config.js
├── postcss.config.js
└── vite.config.ts
```

## Role → route matrix

| Role      | Accessible pages                                          |
| --------- | --------------------------------------------------------- |
| biller    | Dashboard, Stock View, Bill Entry                         |
| manager   | Dashboard, Stock View, Stock Entry, Sales Report          |
| admin     | Dashboard, Add User, Login History                        |
| inventory | Dashboard, Stock View, Stock Entry                        |

## Migration notes (Vue 2 → React + TS)

- **Vuetify → Tailwind + shadcn/ui primitives.** `v-card`, `v-btn`, `v-dialog`, `v-data-table`, `v-autocomplete`, `v-bottom-sheet`, `v-snackbar`, `v-expansion-panels`, `v-menu` were each replaced by a dedicated shadcn-style component under `src/components/ui/`.
- **Vuex → React Context + useReducer.** The only global state was the logged-in user (`user_id`, `username`, `role`); the new `AuthContext` exposes `useAuth()` returning `{ user, setUser, clearUser }`.
- **Vue Router → React Router v6.** Route map lives in `src/router/routes.tsx`.
- **MDI icons → lucide-react.**
- **EventServices.js → eventService.ts.** Same axios instance and same `baseURL: http://localhost:29092`, plus request/response interceptors. Method names and signatures match 1:1 so Go handlers are unchanged.
- **`v-snackbar` → `sonner` toasts.** Global `<Toaster>` is mounted in `main.tsx`.

## Database link (unchanged)

```bash
sudo snap install dbeaver-ce
```
