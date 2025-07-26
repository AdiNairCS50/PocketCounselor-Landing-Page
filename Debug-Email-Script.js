/**
 * Debug script to test Gmail API functionality
 * Copy this into your Google Apps Script and run it manually
 */

function testEmailSending() {
  try {
    console.log("Testing Gmail API...");

    // Test basic Gmail access
    const drafts = GmailApp.getDrafts();
    console.log("Gmail API access: SUCCESS");
    console.log("Number of drafts found:", drafts.length);

    // Test sending a simple email to yourself
    const testEmail = Session.getActiveUser().getEmail();
    console.log("Your email address:", testEmail);

    GmailApp.sendEmail(
      testEmail, // Send to yourself
      "🧪 Test Email from Apps Script",
      "This is a test email to verify Gmail API is working.\n\nIf you see this, the API is working correctly!",
      {
        name: "PocketCounselor Test",
      }
    );

    console.log("Test email sent successfully to:", testEmail);
    return "SUCCESS: Check your inbox for the test email";
  } catch (error) {
    console.error("Error testing Gmail API:", error);
    return "ERROR: " + error.toString();
  }
}

function testVerificationEmailFunction() {
  try {
    console.log("Testing verification email function...");

    // Test the sendVerificationEmail function with test data
    const testEmail = Session.getActiveUser().getEmail();
    const testName = "Test User";
    const testToken = "test-token-123";

    sendVerificationEmail(testEmail, testName, testToken);

    console.log("Verification email function executed successfully");
    return "SUCCESS: Check your inbox for verification email";
  } catch (error) {
    console.error("Error in verification email function:", error);
    return "ERROR: " + error.toString();
  }
}

// Add this function to your existing script
function checkExecutionLogs() {
  try {
    const sheet = SpreadsheetApp.getActiveSheet();
    const data = sheet.getDataRange().getValues();

    console.log("=== SPREADSHEET DATA ===");
    for (let i = 0; i < Math.min(5, data.length); i++) {
      console.log(`Row ${i}:`, data[i]);
    }

    console.log("=== RECENT EMAIL ATTEMPTS ===");
    // Check if there are any recent entries
    const recentEntry = data[data.length - 1];
    if (recentEntry && recentEntry[1]) {
      console.log("Most recent email:", recentEntry[1]);
      console.log("Status:", recentEntry[3]);
      console.log("Token:", recentEntry[4]);
    }
  } catch (error) {
    console.error("Error checking logs:", error);
  }
}
