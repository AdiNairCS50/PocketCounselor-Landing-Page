# Bugs and Issues

- Issue: Existing spreadsheet may not include the new `School` column

  - Description: The backend now appends a `School` value to each new row and expects an 8th header. If your Google Sheet was initialized before this change, it likely has only 7 headers and no `School` column.
  - Steps to Reproduce:
    1. Use an older sheet created prior to this update.
    2. Run `validateSpreadsheetStructure()` in Apps Script.
    3. Observe header mismatch and missing `School` column.
  - Impact: Submissions will include `School` in column H, but the header will be missing; analytics and verification remain unaffected.
  - Fix/Workaround: Run `setupSpreadsheet()` once to add the `School` header and set column width, or manually add a header `School` in column H.

- Issue: Favicon appears locally but not on production due to hard caching
  - Description: Browsers aggressively cache favicons, so after changing the favicon file or path, production may still show the old/missing icon.
  - Steps to Reproduce:
    1. Update favicon file in `public/` or change its path in `index.html`.
    2. Deploy the change.
    3. Visit the site; browser still shows old/missing favicon.
  - Impact: Inconsistent favicon display between localhost and production.
  - Fix/Workaround:
    - Hard refresh or clear site data/cache.
    - Add a cache-busting query string in `href`, e.g., `/favicon.png?v=2`.
    - Keep favicon at a stable path like `/favicon.png` in `public/`.
