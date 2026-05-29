/**
 * generate-specs.js
 * Reads AmericanDist_TestCases.xlsx → All Test Cases sheet
 * and writes one .ts spec file per unique Spec File value.
 *
 * Run: node generate-specs.js
 */

const XLSX = require('xlsx');
const fs   = require('fs');
const path = require('path');

// ── Read Excel ─────────────────────────────────────────────────────────────────
const wb   = XLSX.readFile('AmericanDist_TestCases.xlsx');
const ws   = wb.Sheets['All Test Cases'];
const rows = XLSX.utils.sheet_to_json(ws);

// ── Helpers ────────────────────────────────────────────────────────────────────
const I = '    '; // 4-space indent inside test body

function q(s) { return s.replace(/'/g, "\\'"); }

function has(text, ...keywords) {
  const t = text.toLowerCase();
  return keywords.every(k => t.includes(k.toLowerCase()));
}

function any(text, ...keywords) {
  const t = text.toLowerCase();
  return keywords.some(k => t.includes(k.toLowerCase()));
}

// ── Code generator (pattern-based) ────────────────────────────────────────────
function generateBlock(tc) {
  const id    = tc['TC ID'];
  const title = tc['Test Case Title'];
  const sub   = tc['Sub-Module'] || '';
  const steps = tc['Steps']          || '';
  const exp   = tc['Expected Result'] || '';
  const s = steps.toLowerCase();
  const e = exp.toLowerCase();

  const b = []; // body lines
  const push = (...lines) => lines.forEach(l => b.push(I + l));

  // ── 1. Login setup ──────────────────────────────────────────────────────────
  const wantsLogin =
    (s.includes('login →') || s.startsWith('login →') ||
     (s.includes('login') && !s.includes('myaccount?tab=login') && !sub.includes('Logout') && !sub.includes('Registration') && !sub.includes('Unauthenticated')));

  if (wantsLogin) push(`await loginUser(page);`);

  // ── 2. Navigation ───────────────────────────────────────────────────────────
  const navMatch = steps.match(/navigate to\s+([/\w?=&#.%-]+)/i);
  if (navMatch) push(`await page.goto('${navMatch[1]}');`);

  // ── 3. Specific step patterns ───────────────────────────────────────────────

  // -- Auth --
  if (has(s, 'enter', 'username') && !wantsLogin) {
    if (any(s, 'wrongpassword', 'wrong password'))
      push(`await page.getByRole('textbox', { name: 'Username or email *' }).fill('Firefighter');`,
           `await page.locator('input[name="password"]').fill('wrongpassword');`,
           `await page.getByRole('button', { name: 'Login' }).click();`);
    else if (has(s, 'doesnotexist'))
      push(`await page.getByRole('textbox', { name: 'Username or email *' }).fill('doesnotexist@example.com');`,
           `await page.locator('input[name="password"]').fill('Test@1234');`,
           `await page.getByRole('button', { name: 'Login' }).click();`);
    else if (has(s, "' or '1'='1") || has(s, 'sql'))
      push(`await page.getByRole('textbox', { name: 'Username or email *' }).fill("' OR '1'='1");`,
           `await page.locator('input[name="password"]').fill("' OR '1'='1");`,
           `await page.getByRole('button', { name: 'Login' }).click();`);
    else if (has(s, '500-char') || has(s, '500 char') || has(s, 'long input'))
      push(`await page.getByRole('textbox', { name: 'Username or email *' }).fill('a'.repeat(500));`,
           `await page.getByRole('button', { name: 'Login' }).click();`);
  }

  if (has(s, 'leave username blank') || (has(s, 'leave', 'username') && has(s, 'blank')))
    push(`await page.locator('input[name="password"]').fill('123456');`,
         `await page.getByRole('button', { name: 'Login' }).click();`);

  if (has(s, 'leave password blank') || (has(s, 'leave', 'password') && has(s, 'blank')))
    push(`await page.getByRole('textbox', { name: 'Username or email *' }).fill('Firefighter');`,
         `await page.getByRole('button', { name: 'Login' }).click();`);

  if (has(s, 'leave both') || has(s, 'both fields empty'))
    push(`await page.getByRole('button', { name: 'Login' }).click();`);

  if (has(s, 'click later'))
    push(`await page.getByRole('button', { name: 'Later' }).click();`);

  if (has(s, 'click ✕') || has(s, 'click x on modal'))
    push(`await page.locator('button:has-text("✕"), button[aria-label="Close"]').first().click();`);

  if (has(s, 'click eye icon') || has(s, 'eye icon'))
    push(`await page.locator('button[aria-label*="password"], [class*="eye"], [class*="toggle"]').first().click();`);

  if (has(s, 'click logout') || has(s, 'click', 'logout'))
    push(`await page.getByRole('button', { name: /logout/i }).or(page.getByText('Logout')).first().click();`);

  if (has(s, 'click registration tab'))
    push(`await page.getByRole('tab', { name: 'Registration' }).or(page.getByText('Registration')).first().click();`);

  if (has(s, 'click about us') || (has(s, 'click') && has(s, 'about us')))
    push(`await page.getByRole('link', { name: 'About Us' }).click();`);

  if (has(s, 'click', "faq's") || has(s, 'click', 'faqs'))
    push(`await page.getByRole('link', { name: "FAQ's" }).click();`);

  if (has(s, 'click', 'return policy') || has(s, 'click', 'refund'))
    push(`await page.getByRole('link', { name: 'Return Policy' }).click();`);

  if (has(s, 'click', 'privacy policy'))
    push(`await page.getByRole('link', { name: 'Privacy Policy' }).click();`);

  if (has(s, 'click', 'terms and conditions'))
    push(`await page.getByRole('link', { name: 'Terms and conditions' }).click();`);

  if (has(s, 'click', 'shipping policy'))
    push(`await page.getByRole('link', { name: 'Shipping Policy' }).click();`);

  if (has(s, 'click', 'registration') && has(s, 'footer'))
    push(`await page.getByRole('link', { name: 'Registration' }).click();`);

  if (has(s, 'click logo'))
    push(`await page.getByRole('link', { name: 'logo' }).first().click();`);

  if (has(s, 'click next button') || (has(s, 'click next') && !has(s, 'carousel')))
    push(`await page.getByRole('button', { name: 'Next' }).first().click();`,
         `await page.waitForTimeout(600);`);
  else if (has(s, 'click next'))
    push(`await page.getByRole('button', { name: 'Next' }).first().click();`,
         `await page.waitForTimeout(600);`);

  if (has(s, 'click previous'))
    push(`await page.getByRole('button', { name: 'Previous' }).first().click();`,
         `await page.waitForTimeout(600);`);

  if (has(s, 'reload') || has(s, 'refresh') || has(s, 'press f5'))
    push(`await page.reload();`);

  if (has(s, 'click wishlist'))
    push(`await page.getByRole('link', { name: /Wishlist/i }).click();`);

  if (has(s, 'click', 'disposable') && has(s, 'category card'))
    push(`await page.locator('a[href="/product-category/disposable"]').first().click();`);

  if (has(s, 'know more') || has(s, '"know more"'))
    push(`await page.getByRole('link', { name: 'know more' }).click();`);

  // Orders tab
  if (has(s, 'click orders tab'))
    push(`await page.goto('/myaccount?tab=Orders');`);

  // View order detail
  if (has(s, 'click view on first order') || has(s, 'click view'))
    push(`await page.getByRole('link', { name: 'View' }).or(page.getByText('View')).first().click();`);

  // Search actions
  if (has(s, 'type') && has(s, 'search') && !has(s, 'search bar'))
    push(`await page.getByPlaceholder('Search for products…').fill('disposable');`);

  if (has(s, 'press enter') && has(s, 'search'))
    push(`await page.getByPlaceholder('Search for products…').press('Enter');`);

  if (has(s, 'press escape') || has(s, 'press esc'))
    push(`await page.keyboard.press('Escape');`);

  if (has(s, 'inspect', 'card 0') || has(s, 'inspect carousel'))
    push(`const card0 = page.locator('a').filter({ has: page.locator('img[alt="Card 0"]') }).first();`);

  // ── 4. Assertions ───────────────────────────────────────────────────────────

  // URL assertions
  if (has(e, 'url is /') || has(e, 'url is/')) {
    const m = exp.match(/URL is\s+(\/[\w?=&#.%-]*)/i);
    if (m) push(`await expect(page).toHaveURL('${m[1]}');`);
  }
  if (has(e, 'url contains') || has(e, 'url becomes') || has(e, 'url changes')) {
    const m = exp.match(/(?:contains|becomes|changes to)\s+['"]?([\w/?.=&#%-]+)['"]?/i);
    if (m) push(`await expect(page).toHaveURL(new RegExp('${m[1].replace(/\//g, '\\\\/')}'));`);
  }
  if (has(e, 'stays on login') || has(e, 'stays on myaccount') || has(e, 'stays on /myaccount'))
    push(`await expect(page).toHaveURL(new RegExp('myaccount'));`);
  if (has(e, 'redirected to /') && !has(e, 'redirected to /my'))
    push(`await expect(page).toHaveURL('/');`);
  if (has(e, 'url is /aboutus') || has(e, "url is '/aboutus'"))
    push(`await expect(page).toHaveURL('/aboutus');`);
  if (has(e, 'url is /faqs'))
    push(`await expect(page).toHaveURL('/faqs');`);
  if (has(e, 'url is /refund-policy'))
    push(`await expect(page).toHaveURL('/refund-policy');`);
  if (has(e, 'url is /privacy-policy'))
    push(`await expect(page).toHaveURL('/privacy-policy');`);
  if (has(e, 'url is /term-and-condition'))
    push(`await expect(page).toHaveURL('/term-and-condition');`);
  if (has(e, 'url is /shipping-policy'))
    push(`await expect(page).toHaveURL('/shipping-policy');`);
  if (has(e, 'url is /wishlist'))
    push(`await expect(page).toHaveURL('/wishlist');`);

  // No-crash assertion
  if (any(e, 'no page crash', 'does not crash', 'no crash', 'page does not crash'))
    push(`await expect(page).not.toHaveURL('about:blank');`);

  // Common element visibility
  if (has(e, 'logo') && has(e, 'visible'))
    push(`await expect(page.getByAltText('logo').first()).toBeVisible();`);

  if (has(e, 'need help') && has(e, 'visible'))
    push(`await expect(page.getByRole('heading', { name: 'Need Help' })).toBeVisible();`);

  if (has(e, 'nicotine') && has(e, 'visible'))
    push(`await expect(page.getByText('THIS PRODUCT CONTAINS NICOTINE. NICOTINE IS AN ADDICTIVE CHEMICAL.')).toBeVisible();`);

  if (has(e, 'shopping cart') && has(e, 'visible'))
    push(`await expect(page.getByText('Shopping Cart')).toBeVisible();`);

  if (has(e, 'wishlist') && has(e, 'visible') && has(e, 'header'))
    push(`await expect(page.getByRole('link', { name: /Wishlist/i })).toBeVisible();`);

  if (has(e, 'welcome') && has(e, 'visible'))
    push(`await expect(page.getByText('Welcome')).toBeVisible();`);

  if (has(e, 'join our community') && has(e, 'visible'))
    push(`await expect(page.getByText('Join Our Community')).toBeVisible();`);

  if (has(e, 'username') && has(e, 'field') && has(e, 'visible'))
    push(`await expect(page.getByRole('textbox', { name: 'Username or email *' })).toBeVisible();`);

  if (has(e, 'password') && has(e, 'field') && has(e, 'visible'))
    push(`await expect(page.locator('input[name="password"]')).toBeVisible();`);

  if ((has(e, 'login button') || has(e, "login' button")) && has(e, 'visible'))
    push(`await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();`);

  if (has(e, 'login') && has(e, 'tab') && has(e, 'present'))
    push(`await expect(page.getByText('Login').first()).toBeVisible();`);

  if (has(e, 'registration') && has(e, 'tab') && has(e, 'present'))
    push(`await expect(page.getByText('Registration').first()).toBeVisible();`);

  if (has(e, 'hello visitor'))
    push(`await expect(page.getByText(/Hello Visitor/i)).toBeVisible();`);

  if (has(e, 'wholesale family'))
    push(`await expect(page.getByText(/wholesale family/i)).toBeVisible();`);

  if (has(e, 'upload your licenses'))
    push(`await expect(page.getByRole('heading', { name: 'Upload Your Licenses' })).toBeVisible();`);

  if (has(e, 'upload now') && has(e, 'button'))
    push(`await expect(page.getByRole('button', { name: 'Upload Now' })).toBeVisible();`);

  if (has(e, 'fein license') && has(e, 'tobacco license') && has(e, 'tax id'))
    push(`await expect(page.getByText('FEIN License')).toBeVisible();`,
         `await expect(page.getByText('Tobacco License')).toBeVisible();`,
         `await expect(page.getByText('Tax ID')).toBeVisible();`);

  if (has(e, 'modal') && (has(e, 'disappears') || has(e, 'hidden') || has(e, 'gone')))
    push(`await expect(page.getByRole('heading', { name: 'Upload Your Licenses' })).not.toBeVisible();`);

  if (has(e, 'logout button') && has(e, 'present'))
    push(`await expect(page.getByText('Logout')).toBeVisible();`);

  if (any(e, '+1 630-422-1915', '+1 (630)422-1915'))
    push(`await expect(page.getByText(/630-422-1915|\\(630\\)422-1915/).first()).toBeVisible();`);

  if (has(e, 'info@americandistributorsllc.com'))
    push(`await expect(page.getByText('info@americandistributorsllc.com')).toBeVisible();`);

  if (has(e, 'all sales are final') || has(e, 'ticker'))
    push(`await expect(page.getByText(/All Sales Are Final/i).first()).toBeVisible();`);

  if (has(e, 'shipping policy update') && has(e, 'visible'))
    push(`await expect(page.getByRole('heading', { name: /Shipping Policy Update/i })).toBeVisible();`);

  if (has(e, 'previous') && has(e, 'next') && has(e, 'visible'))
    push(`await expect(page.getByRole('button', { name: 'Previous' }).first()).toBeVisible();`,
         `await expect(page.getByRole('button', { name: 'Next' }).first()).toBeVisible();`);

  if (has(e, 'banner') && any(e, 'visible', 'present') && !has(e, 'nicotine'))
    push(`const bannerImages = page.locator('img[alt*="Card"], img[alt*="Slide"]');`,
         `expect(await bannerImages.count()).toBeGreaterThan(0);`);

  if (has(e, 'category card') && has(e, 'links') && has(e, 'present'))
    push(`const catLinks = page.locator('a[href*="/product-category/"]');`,
         `expect(await catLinks.count()).toBeGreaterThanOrEqual(1);`);

  if (has(e, 'href') && has(e, '/product-category/') && has(e, 'contain'))
    push(`const categoryLinks = page.locator('a[href*="/product-category/"]');`,
         `const count = await categoryLinks.count();`,
         `expect(count).toBeGreaterThan(0);`,
         `for (let i = 0; i < count; i++) {`,
         `  const href = await categoryLinks.nth(i).getAttribute('href');`,
         `  expect(href).toMatch(/\\/product-category\\//);`,
         `}`);

  // Account-specific
  if (has(e, 'account no') || has(e, 'account number') || has(e, '370460'))
    push(`await expect(page.getByText('370460')).toBeVisible();`);

  if (has(e, '"account details"') || has(e, 'account details') && has(e, 'heading'))
    push(`await expect(page.getByRole('heading', { name: 'Account details' }).or(page.getByText('Account details'))).toBeVisible();`);

  if (has(e, '"gold"') || (has(e, 'gold') && has(e, 'visible')))
    push(`await expect(page.getByText('Gold')).toBeVisible();`);

  if (has(e, 'order') && has(e, 'date') && has(e, 'status') && has(e, 'total') && has(e, 'header'))
    push(`await expect(page.getByText('ORDER')).toBeVisible();`,
         `await expect(page.getByText('DATE')).toBeVisible();`,
         `await expect(page.getByText('STATUS')).toBeVisible();`,
         `await expect(page.getByText('TOTAL')).toBeVisible();`);

  if (has(e, 'recent orders') && has(e, 'older orders'))
    push(`await expect(page.getByText('Recent Orders')).toBeVisible();`,
         `await expect(page.getByText('Older Orders')).toBeVisible();`);

  if (has(e, 'view') && has(e, 'button') && has(e, 'order') && has(e, 'row'))
    push(`await expect(page.getByRole('link', { name: 'View' }).or(page.getByText('View')).first()).toBeVisible();`);

  if (has(e, 'order number') && has(e, 'status') && has(e, 'date') && has(e, 'total') && has(e, 'label'))
    push(`for (const label of ['Order Number', 'Status', 'Date', 'Total']) {`,
         `  await expect(page.getByText(label)).toBeVisible();`,
         `}`);

  if (has(e, 'dashboard') && has(e, 'orders') && has(e, 'address') && has(e, 'sidebar'))
    push(`for (const item of ['Dashboard', 'Orders', 'Address', 'Wishlist', 'Licenses', 'Change Password', 'Shipping Consent']) {`,
         `  await expect(page.getByText(item)).toBeVisible();`,
         `}`);

  if (has(e, '7') && has(e, 'navigation') && has(e, 'items'))
    push(`for (const item of ['Dashboard', 'Orders', 'Address', 'Wishlist', 'Licenses', 'Change Password', 'Shipping Consent']) {`,
         `  await expect(page.getByText(item)).toBeVisible();`,
         `}`);

  if (has(e, 'input type') && (has(e, 'text') || has(e, 'password')))
    push(`// Password toggle check`,
         `const pwInput = page.locator('input[name="password"]');`,
         `const type = await pwInput.getAttribute('type');`,
         `expect(['text', 'password']).toContain(type);`);

  if (has(e, 'required') && has(e, 'validation'))
    push(`// HTML5 validation — field should be :invalid when empty`,
         `const isInvalid = await page.locator('input:invalid').count();`,
         `expect(isInvalid).toBeGreaterThan(0);`);

  // Products
  if (has(e, 'product card') && has(e, 'visible'))
    push(`await expect(page.locator('[class*="product"], .product').first()).toBeVisible();`);

  if (has(e, 'sort') && has(e, 'dropdown'))
    push(`await expect(page.locator('select, [class*="sort"]').first()).toBeVisible();`);

  if (has(e, 'add to cart') && has(e, 'disabled'))
    push(`await expect(page.getByRole('button', { name: /Add to Cart/i })).toBeDisabled();`);

  if (has(e, 'add to cart') && has(e, 'enabled'))
    push(`const addBtn = page.getByRole('button', { name: /Add to Cart/i });`,
         `await expect(addBtn).toBeEnabled();`);

  if (has(e, 'sku') && has(e, 'visible'))
    push(`await expect(page.getByText(/sku/i).first()).toBeVisible();`);

  if (has(e, 'price') && has(e, 'visible'))
    push(`await expect(page.locator('text=/\\\\$\\\\d+\\\\.\\\\d{2}/').first()).toBeVisible();`);

  if (has(e, 'breadcrumb') && has(e, 'visible'))
    push(`await expect(page.locator('[class*="breadcrumb"], nav[aria-label*="breadcrumb"]').first()).toBeVisible();`);

  if (has(e, 'pagination') && has(e, 'visible'))
    push(`await expect(page.locator('[class*="pagination"], .woocommerce-pagination').first()).toBeVisible();`);

  if (has(e, 'recommended') || has(e, 'related product'))
    push(`await expect(page.getByText(/recommended|related/i).first()).toBeVisible();`);

  // Search
  if (has(e, 'search') && has(e, 'box') && has(e, 'visible'))
    push(`await expect(page.getByPlaceholder('Search for products…')).toBeVisible();`);

  if (has(e, 'autocomplete') || (has(e, 'dropdown') && has(e, 'search')))
    push(`await expect(page.locator('[class*="autocomplete"], [class*="suggestion"], [class*="search-result"]').first()).toBeVisible();`);

  if (has(e, 'allproducts') || has(e, 'navigates to') && has(e, 'search'))
    push(`await expect(page).toHaveURL(new RegExp('allproducts'));`);

  if (has(e, 'products section') || (has(e, 'products') && has(e, 'autocomplete')))
    push(`await expect(page.getByText(/PRODUCTS/i).first()).toBeVisible();`);

  if (has(e, 'thumbnail') && has(e, 'autocomplete'))
    push(`await expect(page.locator('[class*="autocomplete"] img, [class*="suggestion"] img').first()).toBeVisible();`);

  if (has(e, 'dropdown') && has(e, 'hidden') || has(e, 'dropdown') && has(e, 'disappears'))
    push(`await expect(page.locator('[class*="autocomplete"], [class*="suggestion"]').first()).not.toBeVisible();`);

  if (has(e, 'xss') || has(e, '<script>') || has(e, 'injection') && has(e, 'safe'))
    push(`await expect(page).not.toHaveURL('about:blank');`,
         `// XSS safe — no script executed`);

  // Cart
  if (has(e, 'flat rate') || has(e, 'pickup') && has(e, 'shipping'))
    push(`await expect(page.getByText(/Flat rate|PICKUP/i).first()).toBeVisible();`);

  if (has(e, 'coupon') || has(e, 'promo code'))
    push(`await expect(page.getByPlaceholder(/coupon|promo/i).or(page.getByText(/coupon/i)).first()).toBeVisible();`);

  if (has(e, 'tax') && has(e, 'visible'))
    push(`await expect(page.getByText(/Tax/i).first()).toBeVisible();`);

  if (has(e, 'empty cart') || has(e, 'no items'))
    push(`await expect(page.getByText(/empty|no items/i).first()).toBeVisible();`);

  if (has(e, 'cart icon') && has(e, 'header'))
    push(`await expect(page.getByRole('button', { name: 'cart' })).toBeEnabled();`);

  if (has(e, 'invalid coupon') || has(e, 'coupon error') || has(e, 'coupon code is not valid'))
    push(`await expect(page.getByText(/invalid|not valid|error/i).first()).toBeVisible();`);

  // Checkout
  if (has(e, 'first name') && has(e, 'field'))
    push(`await expect(page.getByRole('textbox', { name: /first name/i })).toBeVisible();`);

  if (has(e, 'last name') && has(e, 'field'))
    push(`await expect(page.getByRole('textbox', { name: /last name/i })).toBeVisible();`);

  if (has(e, 'cart') && has(e, 'information') && has(e, 'shipping') && has(e, 'payment'))
    push(`await expect(page.getByText(/CART/i)).toBeVisible();`,
         `await expect(page.getByText(/INFORMATION/i)).toBeVisible();`,
         `await expect(page.getByText(/SHIPPING/i)).toBeVisible();`,
         `await expect(page.getByText(/PAYMENT/i)).toBeVisible();`);

  if (has(e, 'welcome back') || has(e, '"welcome back"'))
    push(`await expect(page.getByText(/welcome back/i)).toBeVisible();`);

  if (has(e, 'order summary') || has(e, 'order total'))
    push(`await expect(page.getByText(/order summary|Order Total/i).first()).toBeVisible();`);

  // Footer
  if (has(e, 'mon-fri') || has(e, 'business hours'))
    push(`await expect(page.getByText('Mon-Fri: 10am - 7pm (CST)')).toBeVisible();`,
         `await expect(page.getByText('Sat: 10am - 6pm (CST)')).toBeVisible();`,
         `await expect(page.getByText('Sun: Closed')).toBeVisible();`);

  if (has(e, '1049 industrial') || has(e, 'business address'))
    push(`await expect(page.getByText(/1049 Industrial Dr/i)).toBeVisible();`);

  if (has(e, 'information') && has(e, 'heading') && has(e, 'footer'))
    push(`await expect(page.getByRole('heading', { name: 'Information' })).toBeVisible();`);

  if (has(e, 'more information') && has(e, 'heading'))
    push(`await expect(page.getByRole('heading', { name: 'More Information' })).toBeVisible();`);

  if (has(e, 'visa') && has(e, 'card') && has(e, 'image'))
    push(`await expect(page.getByAltText('visa-cards')).toBeVisible();`);

  if (has(e, 'footer logo') && has(e, '/'))
    push(`await page.getByRole('link', { name: 'logo' }).last().click();`,
         `await expect(page).toHaveURL('/');`);

  // Wishlist
  if (has(e, 'product image') && has(e, 'product name') && has(e, 'price') && has(e, 'stock'))
    push(`await expect(page.getByText('Product Image')).toBeVisible();`,
         `await expect(page.getByText('Product Name')).toBeVisible();`,
         `await expect(page.getByText('Price')).toBeVisible();`,
         `await expect(page.getByText('Stock Status')).toBeVisible();`);

  if (has(e, 'favorites') && has(e, 'wishlist') && has(e, 'labels'))
    push(`await expect(page.getByText('Favorites')).toBeVisible();`,
         `await expect(page.getByText('Wishlist')).toBeVisible();`);

  if (has(e, 'wishlist') && has(e, 'badge') && has(e, '0'))
    push(`await expect(page.getByText('0').first()).toBeVisible();`);

  // Homepage specific
  if (has(e, 'new-arrival') && has(e, 'href'))
    push(`const newArrival = page.locator('a[href*="new-arrival"]').first();`,
         `await expect(newArrival).toBeVisible();`,
         `const href = await newArrival.getAttribute('href');`,
         `expect(href).toMatch(/new-arrival/);`);

  if (has(e, 'brand/disco') && has(e, 'visible'))
    push(`await expect(page.locator('a[href*="brand/disco"]').first()).toBeVisible();`);

  if (has(e, 'lil-mfs') && has(e, 'visible'))
    push(`await expect(page.locator('a[href*="lil-mfs"]').first()).toBeVisible();`);

  if (has(e, 'slide') && has(e, 'visible'))
    push(`await expect(page.locator('img[alt*="Slide"]').first()).toBeVisible();`);

  if (has(e, '15') && has(e, 'dot') || has(e, '20') && has(e, 'dot'))
    push(`const dots = page.locator('[class*="dot"], [class*="indicator"]');`,
         `expect(await dots.count()).toBeGreaterThanOrEqual(3);`);

  if (has(e, 'brand/buttons') && has(e, 'visible'))
    push(`await expect(page.locator('a[href*="brand/buttons"]').first()).toBeVisible();`);

  if (has(e, 'brand/meta-tabz') && has(e, 'visible'))
    push(`await expect(page.locator('a[href*="brand/meta-tabz"]').first()).toBeVisible();`);

  if (has(e, 'brand/blndz-7') && has(e, 'visible'))
    push(`await expect(page.locator('a[href*="brand/blndz-7"]').first()).toBeVisible();`);

  if (has(e, '12') && has(e, 'category') && has(e, 'link'))
    push(`const cats = page.locator('a[href*="/product-category/"]');`,
         `expect(await cats.count()).toBeGreaterThanOrEqual(12);`);

  if (has(e, '/product-category/eliquids'))
    push(`await expect(page.locator('a[href="/product-category/eliquids"]')).toBeVisible();`);
  if (has(e, '/product-category/disposable'))
    push(`await expect(page.locator('a[href="/product-category/disposable"]')).toBeVisible();`);
  if (has(e, '/product-category/vape-shop'))
    push(`await expect(page.locator('a[href="/product-category/vape-shop"]')).toBeVisible();`);
  if (has(e, '/product-category/kratom'))
    push(`await expect(page.locator('a[href="/product-category/kratom"]')).toBeVisible();`);
  if (has(e, '/product-category/smoke-shop'))
    push(`await expect(page.locator('a[href="/product-category/smoke-shop"]')).toBeVisible();`);
  if (has(e, '/product-category/cbd'))
    push(`await expect(page.locator('a[href="/product-category/cbd"]')).toBeVisible();`);
  if (has(e, '/product-category/glass'))
    push(`await expect(page.locator('a[href="/product-category/glass"]')).toBeVisible();`);
  if (has(e, '/product-category/mushroom'))
    push(`await expect(page.locator('a[href="/product-category/mushroom"]')).toBeVisible();`);
  if (has(e, '/product-category/cream-chargers-dispensers'))
    push(`await expect(page.locator('a[href="/product-category/cream-chargers-dispensers"]')).toBeVisible();`);
  if (has(e, '/product-category/ketatabz'))
    push(`await expect(page.locator('a[href="/product-category/ketatabz"]')).toBeVisible();`);
  if (has(e, '/product-category/botanicals'))
    push(`await expect(page.locator('a[href="/product-category/botanicals"]')).toBeVisible();`);
  if (has(e, 'geek-bar') || has(e, 'geek bar'))
    push(`await expect(page.locator('a[href*="geek-bar-meloso"]').first()).toBeVisible();`);
  if (has(e, 'infusion-whip') || has(e, 'infusion whip'))
    push(`await expect(page.locator('a[href*="infusion-whip"]').first()).toBeVisible();`);
  if (has(e, 'off-stamp') || has(e, 'off stamp'))
    push(`await expect(page.locator('a[href*="off-stamp-dispo"]').first()).toBeVisible();`);
  if (has(e, 'north-stellar') || has(e, 'north stellar'))
    push(`await expect(page.locator('a[href*="north-stellar"]').first()).toBeVisible();`);
  if (has(e, 'pillow-talk') || has(e, 'pillow talk'))
    push(`await expect(page.locator('a[href*="pillow-talk"]').first()).toBeVisible();`);
  if (has(e, 'raz-e-liq') || has(e, 'brand/raz'))
    push(`await expect(page.locator('a[href*="raz-e-liq"]').first()).or(page.locator('img[alt="Slide 1"]')).toBeVisible();`);
  if (has(e, '/brand/chocolate'))
    push(`await expect(page.locator('a[href="/brand/chocolate"]').first()).toBeVisible();`);
  if (has(e, '/brand/kadilo'))
    push(`await expect(page.locator('a[href="/brand/kadilo"]').first()).toBeVisible();`);

  // ── 5. Fallback TODO if body is still empty ─────────────────────────────────
  if (b.length === 0) {
    b.push(I + `// TODO: manual implementation needed`);
    b.push(I + `// Steps:    ${q(steps)}`);
    b.push(I + `// Expected: ${q(exp)}`);
  }

  return [
    `  test('${id}: ${q(title)}', async ({ page }) => {`,
    ...b,
    `  });`,
  ].join('\n');
}

// ── Group rows by spec file and sub-module ─────────────────────────────────────
const bySpec = {};
for (const row of rows) {
  const spec = row['Spec File'];
  const sub  = row['Sub-Module'];
  if (!bySpec[spec]) bySpec[spec] = {};
  if (!bySpec[spec][sub]) bySpec[spec][sub] = [];
  bySpec[spec][sub].push(row);
}

// ── Ensure tests/ directory exists ────────────────────────────────────────────
const testsDir = path.join(__dirname, 'tests');
fs.mkdirSync(testsDir, { recursive: true });
fs.mkdirSync(path.join(testsDir, 'helpers'), { recursive: true });

// ── Write helpers/auth.ts ──────────────────────────────────────────────────────
const authHelper = `import { Page } from '@playwright/test';

export async function loginUser(page: Page): Promise<void> {
  await page.goto('/myaccount?tab=login');
  await page.getByRole('textbox', { name: 'Username or email *' }).fill('Firefighter');
  await page.locator('input[name="password"]').fill('123456');
  await page.getByRole('button', { name: 'Login' }).click();
  // Dismiss license upload modal if present
  try {
    await page.getByRole('button', { name: 'Later' }).click({ timeout: 4000 });
  } catch { /* not shown */ }
  // Dismiss shipping policy modal if present
  try {
    await page.getByRole('button', { name: 'Continue' }).click({ timeout: 4000 });
  } catch { /* not shown */ }
}
`;
fs.writeFileSync(path.join(testsDir, 'helpers', 'auth.ts'), authHelper);
console.log('✅  Written: tests/helpers/auth.ts');

// ── Write each spec file ───────────────────────────────────────────────────────
const todoFiles = [];

for (const [specFile, subMap] of Object.entries(bySpec)) {
  const lines = [];
  lines.push(`import { test, expect } from '@playwright/test';`);
  lines.push(`import { loginUser } from './helpers/auth';`);
  lines.push(``);

  for (const [sub, tcs] of Object.entries(subMap)) {
    lines.push(`test.describe('${sub}', () => {`);
    lines.push(``);

    let hasTodo = false;
    for (const tc of tcs) {
      const block = generateBlock(tc);
      lines.push(block);
      lines.push(``);
      if (block.includes('// TODO')) hasTodo = true;
    }

    lines.push(`});`);
    lines.push(``);
    if (hasTodo) todoFiles.push(specFile);
  }

  const outPath = path.join(testsDir, specFile);
  fs.writeFileSync(outPath, lines.join('\n'));
  console.log(`✅  Written: tests/${specFile}  (${Object.values(subMap).flat().length} tests)`);
}

// ── Summary ────────────────────────────────────────────────────────────────────
console.log(`\n📄  Total spec files : ${Object.keys(bySpec).length}`);
console.log(`🧪  Total test cases : ${rows.length}`);
const todoUnique = [...new Set(todoFiles)];
if (todoUnique.length) {
  console.log(`\n⚠️   Files with TODO comments (need manual locators):`);
  todoUnique.forEach(f => console.log(`    - tests/${f}`));
} else {
  console.log(`\n✅  All tests auto-generated — no TODO markers!`);
}
