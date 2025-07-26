# 📧 Email Verification Setup Guide

## Overview

This guide walks you through setting up **completely free** email verification for your waitlist using Google Apps Script and Gmail.

## 🚀 Step 1: Update Your Google Spreadsheet

First, update your spreadsheet to include the new columns:

### Add These Headers (Row 1):

```
A: Name | B: Email | C: Timestamp | D: Status | E: Token | F: Verified At
```

### Example Data:

```
John Doe | john@email.com | 2024-01-15 10:30:00 | VERIFIED | abc-123-def | 2024-01-15 10:32:15
Jane Smith | jane@email.com | 2024-01-15 11:00:00 | UNVERIFIED | xyz-789-ghi |
```

## 🔧 Step 2: Replace Google Apps Script Code

1. **Open Google Apps Script**: https://script.google.com
2. **Find your existing project** (or create new if needed)
3. **Replace ALL code** with the contents from `Enhanced-Google-Apps-Script.js`
4. **Verify the deployment URL**: The baseUrl should match your web app deployment URL

   ```javascript
   const baseUrl = "https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec";
   ```

   ✅ **If you're using the provided Enhanced-Google-Apps-Script.js file, this is already correctly configured!**

## 📝 Step 3: Enable Gmail API

1. **In Apps Script**, click **Services** (+ icon)
2. **Add Gmail API**:
   - Library ID: `Gmail API v1`
   - Version: Latest
   - Identifier: `Gmail`
3. **Save the script**

## 🌐 Step 4: Deploy as Web App

1. **Click Deploy** → **New Deployment**
2. **Settings**:
   - Type: **Web app**
   - Execute as: **Me**
   - Who has access: **Anyone**
3. **Deploy** and **copy the web app URL**
4. **Test the deployment**

## 🔗 Step 5: Update Frontend URL

Update your `WaitlistModal.tsx` with the new URL:

```javascript
// Replace this URL with your new deployment URL
const response = await fetch(
  "https://script.google.com/macros/s/YOUR_NEW_DEPLOYMENT_ID/exec",
  {
    method: "POST",
    body: formData,
  }
);
```

## ✅ Step 6: Test Email Verification

### Test Process:

1. **Submit waitlist form** with a real email you can access
2. **Check console** for "Success: Verification email sent"
3. **Check email inbox** (and spam folder)
4. **Click verification link** in email
5. **Confirm "VERIFIED" status** in your spreadsheet

### Expected Email Content:

- **Subject**: 🚀 Verify your PocketCounselor Waitlist Registration
- **Styled email** with verification button
- **Verification link** that marks email as verified

## 🛠️ Step 7: Optional Enhancements

### Auto-cleanup Old Unverified Emails:

Set up a time-driven trigger to run `cleanupOldUnverifiedEmails()` daily:

1. **In Apps Script**: Triggers → Add Trigger
2. **Function**: `cleanupOldUnverifiedEmails`
3. **Event source**: Time-driven
4. **Type**: Day timer
5. **Time**: Daily at 3 AM

### Monitor Verification Rates:

```javascript
// Add this function to track conversion rates
function getVerificationStats() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const data = sheet.getDataRange().getValues();

  let total = 0,
    verified = 0;

  for (let i = 1; i < data.length; i++) {
    total++;
    if (data[i][3] === "VERIFIED") verified++;
  }

  const rate = ((verified / total) * 100).toFixed(1);
  console.log(`Verification Rate: ${verified}/${total} (${rate}%)`);
}
```

## 🎯 Expected User Flow

1. **User enters email** → Clicks "Join Waitlist"
2. **Modal shows**: "Check Your Email!"
3. **User receives email** with verification link
4. **User clicks link** → Sees success page
5. **Email marked as VERIFIED** in spreadsheet

## 🆓 Why This is Completely Free

- **Google Apps Script**: Free up to 6 hours runtime/day
- **Gmail API**: Free up to 250 quota units/user/100 seconds
- **Google Sheets**: Free for personal use
- **No external services** or paid APIs required

## 🔧 Troubleshooting

### Common Issues:

1. **Email not sent**:

   - Check Gmail API is enabled
   - Verify script permissions
   - Check execution logs in Apps Script

2. **Verification link doesn't work**:

   - Confirm `baseUrl` has correct script ID
   - Check if `doGet` function handles verification
   - Verify web app deployment settings

3. **Emails go to spam**:
   - This is normal for new domains
   - Advise users to check spam folder
   - Gmail reputation improves with usage

### Debug Steps:

1. **Check Apps Script logs**: View → Logs
2. **Test individual functions** in Apps Script editor
3. **Monitor spreadsheet updates** in real-time
4. **Use browser dev tools** to check frontend requests

## 📊 Success Metrics

Track these in your spreadsheet:

- **Total signups**: Count of all rows
- **Verified emails**: Count where Status = "VERIFIED"
- **Verification rate**: Verified / Total \* 100
- **Time to verify**: Compare Timestamp vs Verified At

---

## 🎉 You're All Set!

Your waitlist now has professional email verification that:

- ✅ Filters out fake emails
- ✅ Sends beautiful branded emails
- ✅ Provides smooth user experience
- ✅ Costs absolutely nothing
- ✅ Scales automatically with Google's infrastructure

**Need help?** Check the Apps Script execution logs or test each function individually.
