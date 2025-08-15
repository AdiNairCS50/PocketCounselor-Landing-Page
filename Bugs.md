# Bugs and Issues

- Issue: Existing spreadsheet may not include the new `School` column
  - Description: The backend now appends a `School` value to each new row and expects an 8th header. If your Google Sheet was initialized before this change, it likely has only 7 headers and no `School` column.
  - Steps to Reproduce:
    1. Use an older sheet created prior to this update.
    2. Run `validateSpreadsheetStructure()` in Apps Script.
    3. Observe header mismatch and missing `School` column.
  - Impact: Submissions will include `School` in column H, but the header will be missing; analytics and verification remain unaffected.
  - Fix/Workaround: Run `setupSpreadsheet()` once to add the `School` header and set column width, or manually add a header `School` in column H.
