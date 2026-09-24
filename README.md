# PokéDex MVP (Front End Developer Site Build)

A technical assignment for the Front End Developer interview at Miroma Project Factory. This project allows users to search for Pokemon from the [PokeAPI](https://pokeapi.co/), favorite them, and group them using local storage for persistence.

## 🚀 How to Run Locally

### Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher (or `yarn` / `pnpm`)

### Installation & Setup

1. **Navigate to the project directory:**
   ```bash
   cd web-excercise
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```
   *Dependencies include: `react`, `react-dom`, `react-router-dom`, `zustand`, `lucide-react`.*

3. **Run the development server:**
   ```bash
   npm run dev
   ```
   The app will run at `http://localhost:5173`.

4. **Build for production:**
   ```bash
   npm run build
   ```

## 🌍 Live Deployment (Vercel)

This project is fully ready to be deployed on Vercel without any environment variables needed:
1. Push this repository to your GitHub/GitLab account.
2. Log in to [Vercel](https://vercel.com).
3. Click **Add New** > **Project** and import your Git repository.
4. Leave the Framework Preset as `Vite`.
5. Click **Deploy**. The app will be built and live within a minute.

## 🧪 Automated Testing (CI/CD)

This project includes **End-to-End (E2E) testing** powered by [Playwright](https://playwright.dev/). A GitHub Actions workflow is fully configured to run these tests automatically on every push or pull request to the `main` branch.

**To run tests locally:**
```bash
# Install browsers (first time only)
npx playwright install

# Run the E2E test suite
npm run test:e2e
```
The test suite covers:
1. Fetching default Pokemon, searching for a specific Pokemon, and rendering correct results.
2. The user flow of favoriting a Pokemon and ensuring it correctly appears in the "Favorites" tab.

## 🏗️ Architectural Decisions & Trade-offs

Given the **2-hour time limit** and the requirement for a functional MVP, I chose the **"Quick MVP"** approach over a strict Clean Architecture:

- **Framework**: **React + Vite + TypeScript**. Vite provides lightning-fast HMR and build times compared to CRA/Webpack, while React is the industry standard for component-based UIs. TypeScript ensures data contracts (especially for API responses) are strictly typed.
- **State Management**: **Zustand**. Chosen for its minimal boilerplate compared to Redux Toolkit. The `persist` middleware was used to automatically sync the user's favorites and groups to `localStorage`, fulfilling the persistence requirement without needing a backend.
- **Data Fetching**: Used the native **Fetch API**. While a library like `TanStack Query (React Query)` would be ideal for production (to handle caching, retries, and pagination seamlessly), standard fetch with basic local React state (`useState`/`useEffect`) was faster to implement and sufficient for this test scope.
- **Styling**: Used inline styles and a globally reset `index.css`. This avoids the setup overhead of Tailwind CSS or Styled Components and keeps the project very flat.

### Trade-offs Made
- **No Complex Pagination**: To save time, the home page only fetches the first 20 Pokemon. Search acts as a direct detail-fetch instead of a full client-side filter of 1000+ entities.
- **No Global Error Boundary/Toast**: Errors are shown simply as text within components rather than using a sophisticated toast notification system.
- **Flat Architecture**: Services (`api/`), Types (`types/`), and State (`store/`) are extracted, but UI components are slightly coupled with logic to maximize delivery speed.

## 🔮 Future Improvements (Given More Time)

If I had more time (beyond 2 hours), I would implement the following refactors and features:

1. **TanStack Query Integration**: Replace native fetch with React Query for robust server-state management, caching the Pokemon lists, and enabling smooth infinite-scroll pagination.
2. **Design System & CSS Framework**: Integrate Tailwind CSS or a headless UI library (like Radix or Shadcn UI) to improve aesthetics, consistency, and accessibility (A11y).
3. **Advanced State Handling**: Allow drag-and-drop (e.g., `dnd-kit`) to move Pokemon effortlessly between groups instead of using dropdowns.
4. **Testing Strategy**: Implement E2E tests using **Playwright** or **Cypress**, and unit tests for the Zustand store / custom hooks using **Vitest**.
5. **Mobile Optimization**: While responsive, the UI could benefit from mobile-first micro-interactions (e.g., bottom sheet navigation instead of top navbar on small screens).
