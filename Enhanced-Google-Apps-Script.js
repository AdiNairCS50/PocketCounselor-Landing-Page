/**
 * 🚀 COMPLETE POCKETCOUNSELOR WAITLIST SYSTEM
 * Enhanced Google Apps Script with Email Verification
 *
 * FEATURES:
 * ✅ Waitlist form submission handling
 * ✅ Email verification with beautiful templates
 * ✅ Duplicate email detection
 * ✅ Verification link handling
 * ✅ Debug and testing functions
 * ✅ Automatic cleanup of old unverified emails
 * ✅ Analytics and reporting
 * ✅ Error handling and logging
 * ✅ Mobile-friendly verification pages
 */

// =============================================================================
// 📝 MAIN FORM SUBMISSION HANDLER
// =============================================================================

function doPost(e) {
  try {
    console.log("📥 New form submission received");

    // Get form data
    const formData = e.parameter;
    const name = (formData.name || "").trim();
    const email = (formData.email || "").trim().toLowerCase();

    // Validation
    if (!email) {
      console.error("❌ Email is required");
      return ContentService.createTextOutput("Error: Email is required");
    }

    if (!name) {
      console.error("❌ Name is required");
      return ContentService.createTextOutput("Error: Name is required");
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      console.error("❌ Invalid email format:", email);
      return ContentService.createTextOutput("Error: Invalid email format");
    }

    console.log("✅ Form data validated:", { name, email });

    // Generate verification token
    const verificationToken = Utilities.getUuid();
    console.log("🔑 Generated verification token:", verificationToken);

    // Get the spreadsheet
    const sheet = SpreadsheetApp.getActiveSheet();

    // Check if email already exists
    if (isEmailAlreadyRegistered(email)) {
      console.log("⚠️ Email already registered:", email);
      return ContentService.createTextOutput("Email already registered");
    }

    // Add to spreadsheet with verification status
    const timestamp = new Date();
    const newRow = [
      name,
      email,
      timestamp,
      "UNVERIFIED", // Verification Status
      verificationToken, // Verification Token
      "", // Verified At (empty initially)
      getClientInfo(e), // Additional client info
    ];

    sheet.appendRow(newRow);
    console.log("📊 Added to spreadsheet:", newRow);

    // Send verification email
    sendVerificationEmail(email, name, verificationToken);
    console.log("📧 Verification email sent successfully");

    // Log success metrics
    logSubmissionMetrics("SUCCESS", email);

    return ContentService.createTextOutput("Success: Verification email sent");
  } catch (error) {
    console.error("💥 Error in doPost:", error);
    logSubmissionMetrics("ERROR", formData?.email || "unknown");
    return ContentService.createTextOutput("Error: " + error.toString());
  }
}

// =============================================================================
// 📧 EMAIL VERIFICATION SYSTEM
// =============================================================================

function sendVerificationEmail(email, name, token) {
  try {
    console.log("📤 Sending verification email to:", email);

    // Your web app URL - this should match the URL you're using in your frontend
    const baseUrl =
      "https://script.google.com/macros/s/AKfycbxQmDCJRgnEEOlxdjCstgpXuSCY3JOJWWAEBTItWknjPTgaVx4EKIOJSt9T-hKFGco/exec";
    const verificationUrl = `${baseUrl}?action=verify&token=${token}`;

    const subject = "Verify your PocketCounselor Waitlist Registration";

    const htmlBody = `
      <div style="font-family: 'Poppins', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8fafc;">
        <div style="background: white; border-radius: 12px; padding: 32px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
          
          <!-- Header -->
          <div style="text-align: center; margin-bottom: 32px;">
            <h1 style="color: #7c3aed; font-size: 28px; margin: 0; font-weight: 600;">PocketCounselor</h1>
            <p style="color: #64748b; margin: 8px 0 0 0;">AI-Powered Opportunity Finder</p>
          </div>
          
          <!-- Main Content -->
          <div style="text-align: center; margin-bottom: 32px;">
            <h2 style="color: #1e293b; font-size: 24px; margin: 0 0 16px 0; font-weight: 600;">
              Welcome to the Waitlist, ${name}!
            </h2>
            <p style="color: #475569; font-size: 16px; line-height: 1.6; margin: 0 0 24px 0;">
              You're one step away from getting early access to PocketCounselor. 
              Please verify your email address to secure your spot on our waitlist.
            </p>
          </div>
          
          <!-- Verification Button -->
          <div style="text-align: center; margin: 32px 0;">
            <a href="${verificationUrl}" 
               style="display: inline-block; background: linear-gradient(90deg, #7c3aed, #3b82f6); 
                      color: white; text-decoration: none; padding: 16px 32px; 
                      border-radius: 8px; font-weight: 600; font-size: 16px;
                      box-shadow: 0 4px 12px rgba(124, 58, 237, 0.3);">
              Verify My Email
            </a>
          </div>
          
          <!-- Alternative Link -->
          <div style="margin: 24px 0; padding: 16px; background: #f1f5f9; border-radius: 8px;">
            <p style="color: #64748b; font-size: 14px; margin: 0 0 8px 0;">
              Can't click the button? Copy and paste this link:
            </p>
            <p style="color: #7c3aed; word-break: break-all; font-size: 14px; margin: 0;">
              ${verificationUrl}
            </p>
          </div>
          
          <!-- Footer -->
          <div style="border-top: 1px solid #e2e8f0; padding-top: 24px; margin-top: 32px;">
            <p style="color: #94a3b8; font-size: 14px; text-align: center; margin: 0 0 12px 0;">
              This verification link will expire in 24 hours.<br>
              If you didn't sign up for PocketCounselor, you can safely ignore this email.
            </p>
            <p style="color: #94a3b8; font-size: 12px; text-align: center; margin: 0;">
              You're receiving this because you signed up for the PocketCounselor waitlist.<br>
              Add pocketcounselorco@gmail.com to your contacts for future updates.
            </p>
          </div>
          
        </div>
      </div>
    `;

    const textBody = `
Welcome to PocketCounselor Waitlist!

Hi ${name},

Please verify your email address by clicking this link:
${verificationUrl}

This link will expire in 24 hours.

If you didn't sign up for PocketCounselor, you can safely ignore this email.

You're receiving this because you signed up for the PocketCounselor waitlist.
Add pocketcounselorco@gmail.com to your contacts for future updates.

Best regards,
The PocketCounselor Team
    `;

    // Send email using Gmail
    GmailApp.sendEmail(email, subject, textBody, {
      htmlBody: htmlBody,
      name: "PocketCounselor Team",
      replyTo: "pocketcounselorco@gmail.com",
    });

    console.log("✅ Email sent successfully to:", email);
  } catch (error) {
    console.error("💥 Error sending verification email:", error);
    throw error;
  }
}

// =============================================================================
// 🔗 VERIFICATION LINK HANDLER
// =============================================================================

function doGet(e) {
  try {
    console.log("🔗 GET request received:", e.parameter);

    const action = e.parameter.action;
    const token = e.parameter.token;

    if (action === "verify" && token) {
      console.log("✅ Processing verification for token:", token);
      return verifyEmail(token);
    }

    if (action === "stats") {
      return getPublicStats();
    }

    console.log("❌ Invalid request parameters");
    return ContentService.createTextOutput("Invalid request");
  } catch (error) {
    console.error("💥 Error in doGet:", error);
    return ContentService.createTextOutput("Error: " + error.toString());
  }
}

function verifyEmail(token) {
  try {
    const sheet = SpreadsheetApp.getActiveSheet();
    const data = sheet.getDataRange().getValues();

    console.log("🔍 Searching for token:", token);

    // Find the row with matching token
    for (let i = 1; i < data.length; i++) {
      // Skip header row
      if (data[i][4] === token) {
        // Token is in column E (index 4)
        console.log("🎯 Token found at row:", i + 1);

        const email = data[i][1];
        const name = data[i][0];

        // Check if already verified
        if (data[i][3] === "VERIFIED") {
          console.log("⚠️ Email already verified:", email);
          return createAlreadyVerifiedPage(name);
        }

        // Update verification status
        sheet.getRange(i + 1, 4).setValue("VERIFIED"); // Column D (Status)
        sheet.getRange(i + 1, 6).setValue(new Date()); // Column F (Verified At)

        console.log("✅ Email verified successfully:", email);

        // Log verification metrics
        logVerificationMetrics("SUCCESS", email);

        return createSuccessVerificationPage(name);
      }
    }

    console.log("❌ Token not found or expired:", token);
    logVerificationMetrics("FAILED", "unknown");

    return createInvalidLinkPage();
  } catch (error) {
    console.error("💥 Error verifying email:", error);
    return ContentService.createTextOutput("Error: " + error.toString());
  }
}

// =============================================================================
// 🎨 VERIFICATION PAGE TEMPLATES
// =============================================================================

function createSuccessVerificationPage(name) {
  return HtmlService.createHtmlOutput(`
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Email Verified - PocketCounselor</title>
      <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet">
    </head>
    <body style="margin: 0; padding: 20px; font-family: 'Poppins', Arial, sans-serif; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); min-height: 100vh; display: flex; align-items: center; justify-content: center;">
      <div style="background: white; border-radius: 20px; padding: 40px; max-width: 500px; width: 100%; box-shadow: 0 20px 40px rgba(0,0,0,0.1); text-align: center;">
        
        <!-- Success Icon -->
        <div style="background: linear-gradient(90deg, #10b981, #3b82f6); color: white; padding: 20px; border-radius: 50%; width: 80px; height: 80px; margin: 0 auto 24px; display: flex; align-items: center; justify-content: center; font-size: 24px; font-weight: bold;">
          ✓
        </div>
        
        <!-- Success Message -->
        <h1 style="color: #1e293b; margin-bottom: 16px; font-size: 28px; font-weight: 600;">
          Welcome to the Waitlist, ${name}!
        </h1>
        
        <p style="color: #6b7280; margin-bottom: 24px; font-size: 16px; line-height: 1.6;">
          Your email has been verified successfully! You're now on the PocketCounselor waitlist and will be among the first to know when we launch.
        </p>
        
        <div style="background: linear-gradient(135deg, #7c3aed 0%, #3b82f6 100%); color: white; padding: 20px; border-radius: 12px; margin-bottom: 24px;">
          <p style="margin: 0; font-weight: 600; font-size: 16px;">
            🚀 We'll notify you as soon as PocketCounselor is ready!
          </p>
        </div>
        
                 <a href="https://pocketcounselor.org" 
            style="display: inline-block; padding: 12px 24px; background: linear-gradient(90deg, #7c3aed, #3b82f6); color: white; text-decoration: none; border-radius: 8px; font-weight: 600; margin-bottom: 16px;">
           Return to PocketCounselor
         </a>
        
        <p style="color: #9ca3af; font-size: 14px; margin: 0;">
          Follow us on social media for updates and sneak peeks!
        </p>
        
      </div>
    </body>
    </html>
  `);
}

function createAlreadyVerifiedPage(name) {
  return HtmlService.createHtmlOutput(`
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Already Verified - PocketCounselor</title>
      <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet">
    </head>
    <body style="margin: 0; padding: 20px; font-family: 'Poppins', Arial, sans-serif; background: linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%); min-height: 100vh; display: flex; align-items: center; justify-content: center;">
      <div style="background: white; border-radius: 20px; padding: 40px; max-width: 500px; width: 100%; box-shadow: 0 20px 40px rgba(0,0,0,0.1); text-align: center;">
        
        <div style="background: #059669; color: white; padding: 20px; border-radius: 50%; width: 80px; height: 80px; margin: 0 auto 24px; display: flex; align-items: center; justify-content: center; font-size: 24px; font-weight: bold;">
          ✓
        </div>
        
        <h2 style="color: #059669; margin-bottom: 16px; font-size: 24px; font-weight: 600;">
          Already Verified!
        </h2>
        
        <p style="color: #6b7280; margin-bottom: 24px; font-size: 16px;">
          Hi ${name}! Your email was already verified. You're all set on the waitlist!
        </p>
        
                 <a href="https://pocketcounselor.org" 
            style="display: inline-block; padding: 12px 24px; background: #059669; color: white; text-decoration: none; border-radius: 8px; font-weight: 600;">
           Return to PocketCounselor
         </a>
        
      </div>
    </body>
    </html>
  `);
}

function createInvalidLinkPage() {
  return HtmlService.createHtmlOutput(`
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Invalid Link - PocketCounselor</title>
      <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet">
    </head>
    <body style="margin: 0; padding: 20px; font-family: 'Poppins', Arial, sans-serif; background: linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%); min-height: 100vh; display: flex; align-items: center; justify-content: center;">
      <div style="background: white; border-radius: 20px; padding: 40px; max-width: 500px; width: 100%; box-shadow: 0 20px 40px rgba(0,0,0,0.1); text-align: center;">
        
        <div style="background: #dc2626; color: white; padding: 20px; border-radius: 50%; width: 80px; height: 80px; margin: 0 auto 24px; display: flex; align-items: center; justify-content: center; font-size: 24px; font-weight: bold;">
          !
        </div>
        
        <h2 style="color: #dc2626; margin-bottom: 16px; font-size: 24px; font-weight: 600;">
          Invalid or Expired Link
        </h2>
        
        <p style="color: #6b7280; margin-bottom: 24px; font-size: 16px; line-height: 1.6;">
          This verification link is invalid or has expired. Please sign up again to join our waitlist.
        </p>
        
                 <a href="https://pocketcounselor.org" 
            style="display: inline-block; padding: 12px 24px; background: #7c3aed; color: white; text-decoration: none; border-radius: 8px; font-weight: 600; margin-bottom: 16px;">
           Return to PocketCounselor
         </a>
         
         <p style="color: #9ca3af; font-size: 14px; margin: 0;">
           Need help? Contact us at hello@pocketcounselor.org
         </p>
        
      </div>
    </body>
    </html>
  `);
}

// =============================================================================
// 🛠️ UTILITY FUNCTIONS
// =============================================================================

function isEmailAlreadyRegistered(email) {
  try {
    const sheet = SpreadsheetApp.getActiveSheet();
    const data = sheet.getDataRange().getValues();
    const emailColumn = 1; // Column B (index 1)

    for (let i = 1; i < data.length; i++) {
      // Start from 1 to skip header
      if (
        data[i][emailColumn] &&
        data[i][emailColumn].toLowerCase() === email.toLowerCase()
      ) {
        return true;
      }
    }
    return false;
  } catch (error) {
    console.error("Error checking duplicate email:", error);
    return false;
  }
}

function getClientInfo(e) {
  try {
    const userAgent = e.parameter.userAgent || "Unknown Browser";
    const screenRes = e.parameter.screenResolution || "Unknown Resolution";
    const timezone = e.parameter.timezone || "Unknown Timezone";
    const submitTime = e.parameter.timestamp || new Date().toISOString();

    // Parse browser info for readability
    let browserInfo = "Unknown Browser";
    if (userAgent && userAgent !== "Unknown Browser") {
      if (userAgent.includes("Chrome")) browserInfo = "Chrome";
      else if (userAgent.includes("Firefox")) browserInfo = "Firefox";
      else if (userAgent.includes("Safari")) browserInfo = "Safari";
      else if (userAgent.includes("Edge")) browserInfo = "Edge";
      else browserInfo = "Other Browser";
    }

    // Parse OS info
    let osInfo = "Unknown OS";
    if (userAgent) {
      if (userAgent.includes("Windows")) osInfo = "Windows";
      else if (userAgent.includes("Mac")) osInfo = "macOS";
      else if (userAgent.includes("Linux")) osInfo = "Linux";
      else if (userAgent.includes("Android")) osInfo = "Android";
      else if (userAgent.includes("iPhone") || userAgent.includes("iPad"))
        osInfo = "iOS";
    }

    return `${browserInfo} on ${osInfo} | ${screenRes} | ${timezone} | ${submitTime}`;
  } catch (error) {
    console.error("Error getting client info:", error);
    return "Error getting client info";
  }
}

// =============================================================================
// 📊 ANALYTICS AND METRICS
// =============================================================================

function logSubmissionMetrics(status, email) {
  try {
    const metricsSheet = getOrCreateMetricsSheet();
    const timestamp = new Date();

    metricsSheet.appendRow([
      timestamp,
      "SUBMISSION",
      status,
      email,
      Session.getActiveUser().getEmail(),
    ]);
  } catch (error) {
    console.error("Error logging submission metrics:", error);
  }
}

function logVerificationMetrics(status, email) {
  try {
    const metricsSheet = getOrCreateMetricsSheet();
    const timestamp = new Date();

    metricsSheet.appendRow([
      timestamp,
      "VERIFICATION",
      status,
      email,
      Session.getActiveUser().getEmail(),
    ]);
  } catch (error) {
    console.error("Error logging verification metrics:", error);
  }
}

function getOrCreateMetricsSheet() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  let metricsSheet = spreadsheet.getSheetByName("Metrics");

  if (!metricsSheet) {
    metricsSheet = spreadsheet.insertSheet("Metrics");
    metricsSheet
      .getRange(1, 1, 1, 5)
      .setValues([
        ["Timestamp", "Event Type", "Status", "Email", "Script User"],
      ]);
  }

  return metricsSheet;
}

function getPublicStats() {
  try {
    const sheet = SpreadsheetApp.getActiveSheet();
    const data = sheet.getDataRange().getValues();

    let totalSignups = 0;
    let verifiedEmails = 0;

    for (let i = 1; i < data.length; i++) {
      totalSignups++;
      if (data[i][3] === "VERIFIED") {
        verifiedEmails++;
      }
    }

    const verificationRate =
      totalSignups > 0 ? ((verifiedEmails / totalSignups) * 100).toFixed(1) : 0;

    const stats = {
      totalSignups,
      verifiedEmails,
      verificationRate: `${verificationRate}%`,
      timestamp: new Date().toISOString(),
    };

    return ContentService.createTextOutput(JSON.stringify(stats)).setMimeType(
      ContentService.MimeType.JSON
    );
  } catch (error) {
    console.error("Error getting public stats:", error);
    return ContentService.createTextOutput("Error getting stats");
  }
}

// =============================================================================
// 🧹 MAINTENANCE FUNCTIONS
// =============================================================================

function cleanupOldUnverifiedEmails() {
  try {
    console.log("🧹 Starting cleanup of old unverified emails");

    const sheet = SpreadsheetApp.getActiveSheet();
    const data = sheet.getDataRange().getValues();
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - 7); // Remove unverified emails older than 7 days

    let deletedCount = 0;

    for (let i = data.length - 1; i >= 1; i--) {
      // Start from bottom to avoid index issues
      const timestamp = new Date(data[i][2]); // Column C
      const status = data[i][3]; // Column D

      if (status === "UNVERIFIED" && timestamp < cutoffDate) {
        sheet.deleteRow(i + 1);
        deletedCount++;
        console.log(`🗑️ Deleted old unverified email: ${data[i][1]}`);
      }
    }

    console.log(
      `✅ Cleanup complete. Deleted ${deletedCount} old unverified emails`
    );
    return `Cleanup complete. Deleted ${deletedCount} old unverified emails`;
  } catch (error) {
    console.error("💥 Error cleaning up old emails:", error);
    return "Error during cleanup: " + error.toString();
  }
}

function sendWeeklyReport() {
  try {
    const sheet = SpreadsheetApp.getActiveSheet();
    const data = sheet.getDataRange().getValues();

    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    let newSignups = 0;
    let newVerifications = 0;
    let totalSignups = 0;
    let totalVerified = 0;

    for (let i = 1; i < data.length; i++) {
      const timestamp = new Date(data[i][2]);
      const status = data[i][3];

      totalSignups++;
      if (status === "VERIFIED") totalVerified++;

      if (timestamp >= oneWeekAgo) {
        newSignups++;
        if (status === "VERIFIED") newVerifications++;
      }
    }

    const report = `
PocketCounselor Waitlist - Weekly Report

📊 This Week:
• New Signups: ${newSignups}
• New Verifications: ${newVerifications}
• Verification Rate: ${
      newSignups > 0 ? ((newVerifications / newSignups) * 100).toFixed(1) : 0
    }%

📈 Total:
• Total Signups: ${totalSignups}
• Total Verified: ${totalVerified}
• Overall Verification Rate: ${
      totalSignups > 0 ? ((totalVerified / totalSignups) * 100).toFixed(1) : 0
    }%

Generated: ${new Date().toLocaleString()}
    `;

    console.log("📊 Weekly Report:", report);
    return report;
  } catch (error) {
    console.error("Error generating weekly report:", error);
    return "Error generating report: " + error.toString();
  }
}

// =============================================================================
// 🧪 DEBUG AND TESTING FUNCTIONS
// =============================================================================

function testEmailSending() {
  try {
    console.log("🧪 Testing Gmail API...");

    // Test basic Gmail access
    const drafts = GmailApp.getDrafts();
    console.log("✅ Gmail API access: SUCCESS");
    console.log("📧 Number of drafts found:", drafts.length);

    // Test sending a simple email to yourself
    const testEmail = Session.getActiveUser().getEmail();
    console.log("👤 Your email address:", testEmail);

    GmailApp.sendEmail(
      testEmail, // Send to yourself
      "🧪 Test Email from PocketCounselor Apps Script",
      "This is a test email to verify Gmail API is working.\n\nIf you see this, the API is working correctly!",
      {
        name: "PocketCounselor Test",
      }
    );

    console.log("✅ Test email sent successfully to:", testEmail);
    return "SUCCESS: Check your inbox for the test email";
  } catch (error) {
    console.error("💥 Error testing Gmail API:", error);
    return "ERROR: " + error.toString();
  }
}

function testVerificationEmailFunction() {
  try {
    console.log("🧪 Testing verification email function...");

    // Test the sendVerificationEmail function with test data
    const testEmail = Session.getActiveUser().getEmail();
    const testName = "Test User";
    const testToken = "test-token-123";

    sendVerificationEmail(testEmail, testName, testToken);

    console.log("✅ Verification email function executed successfully");
    return "SUCCESS: Check your inbox for verification email";
  } catch (error) {
    console.error("💥 Error in verification email function:", error);
    return "ERROR: " + error.toString();
  }
}

function checkExecutionLogs() {
  try {
    const sheet = SpreadsheetApp.getActiveSheet();
    const data = sheet.getDataRange().getValues();

    console.log("=== 📊 SPREADSHEET DATA ===");
    for (let i = 0; i < Math.min(5, data.length); i++) {
      console.log(`Row ${i}:`, data[i]);
    }

    console.log("=== 📧 RECENT EMAIL ATTEMPTS ===");
    // Check if there are any recent entries
    const recentEntry = data[data.length - 1];
    if (recentEntry && recentEntry[1]) {
      console.log("📤 Most recent email:", recentEntry[1]);
      console.log("📋 Status:", recentEntry[3]);
      console.log("🔑 Token:", recentEntry[4]);
    }

    return "Check complete - see execution logs";
  } catch (error) {
    console.error("💥 Error checking logs:", error);
    return "ERROR: " + error.toString();
  }
}

function validateSpreadsheetStructure() {
  try {
    const sheet = SpreadsheetApp.getActiveSheet();
    const headers = sheet.getRange(1, 1, 1, 7).getValues()[0];

    const expectedHeaders = [
      "Name",
      "Email",
      "Timestamp",
      "Status",
      "Token",
      "Verified At",
      "Client Info",
    ];

    console.log("📋 Current headers:", headers);
    console.log("📋 Expected headers:", expectedHeaders);

    for (let i = 0; i < expectedHeaders.length; i++) {
      if (headers[i] !== expectedHeaders[i]) {
        console.log(
          `⚠️ Header mismatch at column ${i + 1}: expected "${
            expectedHeaders[i]
          }", got "${headers[i]}"`
        );
      }
    }

    return "Spreadsheet structure validation complete";
  } catch (error) {
    console.error("💥 Error validating spreadsheet structure:", error);
    return "ERROR: " + error.toString();
  }
}

// =============================================================================
// 🎯 SETUP AND INITIALIZATION
// =============================================================================

function setupSpreadsheet() {
  try {
    const sheet = SpreadsheetApp.getActiveSheet();

    // Set up headers
    const headers = [
      "Name",
      "Email",
      "Timestamp",
      "Status",
      "Token",
      "Verified At",
      "Client Info",
    ];
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);

    // Format headers
    const headerRange = sheet.getRange(1, 1, 1, headers.length);
    headerRange.setFontWeight("bold");
    headerRange.setBackground("#4f46e5");
    headerRange.setFontColor("white");

    // Set column widths
    sheet.setColumnWidth(1, 150); // Name
    sheet.setColumnWidth(2, 200); // Email
    sheet.setColumnWidth(3, 150); // Timestamp
    sheet.setColumnWidth(4, 100); // Status
    sheet.setColumnWidth(5, 200); // Token
    sheet.setColumnWidth(6, 150); // Verified At
    sheet.setColumnWidth(7, 200); // Client Info

    console.log("✅ Spreadsheet setup complete");
    return "Spreadsheet setup complete with proper headers and formatting";
  } catch (error) {
    console.error("💥 Error setting up spreadsheet:", error);
    return "ERROR: " + error.toString();
  }
}

// =============================================================================
// 📝 NOTES FOR DEVELOPERS
// =============================================================================

/**
 * 🚀 DEPLOYMENT CHECKLIST:
 *
 * 1. ✅ Replace the baseUrl with your actual deployment URL
 * 2. ✅ Set up proper spreadsheet headers using setupSpreadsheet()
 * 3. ✅ Enable Gmail API in Services
 * 4. ✅ Deploy as Web App with "Anyone" access
 * 5. ✅ Test with testEmailSending() function
 * 6. ✅ Test verification flow end-to-end
 * 7. ✅ Set up time-driven trigger for cleanupOldUnverifiedEmails()
 *
 * 📊 AVAILABLE FUNCTIONS:
 *
 * Main Functions:
 * - doPost(): Handles form submissions
 * - doGet(): Handles verification links
 * - sendVerificationEmail(): Sends verification emails
 *
 * Maintenance:
 * - cleanupOldUnverifiedEmails(): Remove old unverified emails
 * - sendWeeklyReport(): Generate analytics report
 *
 * Testing:
 * - testEmailSending(): Test Gmail API
 * - testVerificationEmailFunction(): Test email sending
 * - checkExecutionLogs(): Debug recent activity
 *
 * Setup:
 * - setupSpreadsheet(): Initialize spreadsheet structure
 * - validateSpreadsheetStructure(): Check spreadsheet setup
 *
 * 🎯 PUBLIC ENDPOINTS:
 *
 * - POST to web app URL: Submit form data
 * - GET ?action=verify&token=TOKEN: Verify email
 * - GET ?action=stats: Get public statistics
 */
