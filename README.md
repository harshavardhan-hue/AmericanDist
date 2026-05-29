# AmericanDist – Playwright E2E Test Suite

Automated end-to-end tests for [American Distributors LLC](http://93.127.217.17:3002)  
Built with **Playwright 1.60** · **TypeScript** · **Page Object Model**

---

## Project Structure

```
AmericanDist/
├── Auth/                        ← POM: Login page object + AuthManager
├── TestData/                    ← JSON test data (credentials, etc.)
├── tests/
│   ├── helpers/
│   │   └── auth.ts              ← Shared login helper (loginUser)
│   ├── auth.spec.ts             ← 28 Authentication tests
│   ├── account.spec.ts          ← 48 My Account tests
│   ├── products.spec.ts         ← 38 Products tests
│   ├── search.spec.ts           ← 25 Search tests
│   ├── cart.spec.ts             ← 31 Cart tests
│   ├── checkout.spec.ts         ← 28 Checkout tests
│   ├── wishlist.spec.ts         ← 13 Wishlist tests
│   ├── navigation.spec.ts       ← 36 Navigation & UI tests
│   ├── static-pages.spec.ts     ← 21 Static Pages tests
│   └── homepage.spec.ts         ← 48 Homepage Banner tests
├── playwright.config.ts
├── package.json
├── tsconfig.json
└── AmericanDist_TestCases.xlsx  ← Source of truth (316 test cases)
```

**Total: 316 automated test cases across 10 spec files**

---

## Installation

```bash
# 1. Clone the repository
git clone https://github.com/harshavardhan-hue/AmericanDist.git
cd AmericanDist

# 2. Install dependencies
npm install

# 3. Install Playwright browsers
npx playwright install
```

---

## Running Tests

### Run all 316 tests
```bash
npm test
```

### Run a specific module
```bash
npx playwright test tests/auth.spec.ts
npx playwright test tests/account.spec.ts
npx playwright test tests/products.spec.ts
npx playwright test tests/search.spec.ts
npx playwright test tests/cart.spec.ts
npx playwright test tests/checkout.spec.ts
npx playwright test tests/wishlist.spec.ts
npx playwright test tests/navigation.spec.ts
npx playwright test tests/static-pages.spec.ts
npx playwright test tests/homepage.spec.ts
```

### Run in headed mode (see the browser)
```bash
npx playwright test --headed
```

### Run with Playwright UI (interactive)
```bash
npx playwright test --ui
```

### Run in debug mode
```bash
npx playwright test --debug
```

---

## Viewing Reports

### Playwright HTML Report
```bash
npm run report
# Opens http://localhost:9323 with full test results, screenshots, videos & traces
```

### Allure Report
```bash
npm run allure:generate   # Generate report from allure-results/
npm run allure:open       # Open the generated report
# OR
npm run allure:serve      # One command: generate + serve
```

---

## Configuration

| Setting | Value |
|---------|-------|
| Base URL | `http://93.127.217.17:3002` |
| Browser | Chrome (maximized / fullscreen) |
| Headless | `false` (headed by default) |
| Retries | 1 (local) / 2 (CI) |
| Workers | 1 (sequential) |
| Action timeout | 15 seconds |
| Navigation timeout | 30 seconds |

---

## Test Credentials

| Field | Value |
|-------|-------|
| Username | `Firefighter` |
| Password | `123456` |

Stored in `TestData/AuthData.json` and used by `tests/helpers/auth.ts`.

---

## Regenerating Spec Files

If the Excel test case sheet is updated, regenerate all spec files:

```bash
node generate-specs.js
```

This reads `AmericanDist_TestCases.xlsx → All Test Cases` sheet and rewrites all 10 spec files.
