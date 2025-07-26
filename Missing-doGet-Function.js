/**
 * MISSING doGet FUNCTION - ADD THIS TO YOUR GOOGLE APPS SCRIPT
 * This function handles verification link clicks
 */

function doGet(e) {
  try {
    const action = e.parameter.action;
    const token = e.parameter.token;

    if (action === "verify" && token) {
      return verifyEmail(token);
    }

    return ContentService.createTextOutput("Invalid request");
  } catch (error) {
    console.error("Error in doGet:", error);
    return ContentService.createTextOutput("Error: " + error.toString());
  }
}

function verifyEmail(token) {
  try {
    const sheet = SpreadsheetApp.getActiveSheet();
    const data = sheet.getDataRange().getValues();

    // Find the row with matching token
    for (let i = 1; i < data.length; i++) {
      // Skip header row
      if (data[i][4] === token) {
        // Token is in column E (index 4)

        // Check if already verified
        if (data[i][3] === "VERIFIED") {
          return HtmlService.createHtmlOutput(`
            <div style="font-family: 'Poppins', Arial, sans-serif; text-align: center; padding: 40px; max-width: 500px; margin: 50px auto;">
              <h2 style="color: #059669;">Already Verified!</h2>
              <p style="color: #6b7280;">Your email was already verified. You're all set on the waitlist!</p>
              <a href="https://pocketcounselor.com" style="display: inline-block; margin-top: 20px; padding: 12px 24px; background: #7c3aed; color: white; text-decoration: none; border-radius: 6px;">Return to PocketCounselor</a>
            </div>
          `);
        }

        // Update verification status
        sheet.getRange(i + 1, 4).setValue("VERIFIED"); // Column D
        sheet.getRange(i + 1, 6).setValue(new Date()); // Add verification timestamp in column F

        return HtmlService.createHtmlOutput(`
          <div style="font-family: 'Poppins', Arial, sans-serif; text-align: center; padding: 40px; max-width: 500px; margin: 50px auto; background: white; box-shadow: 0 4px 12px rgba(0,0,0,0.1); border-radius: 12px;">
            <div style="background: linear-gradient(90deg, #10b981, #3b82f6); color: white; padding: 20px; border-radius: 50%; width: 80px; height: 80px; margin: 0 auto 20px; display: flex; align-items: center; justify-content: center; font-size: 24px; font-weight: bold;">
              ✓
            </div>
            <h2 style="color: #1e293b; margin-bottom: 16px;">Email Verified Successfully!</h2>
            <p style="color: #6b7280; margin-bottom: 24px;">
              Welcome to the PocketCounselor waitlist! You'll be among the first to know when we launch.
            </p>
            <p style="color: #7c3aed; font-weight: 600; margin-bottom: 24px;">
              We'll notify you as soon as PocketCounselor is ready!
            </p>
            <a href="https://pocketcounselor.com" style="display: inline-block; padding: 12px 24px; background: linear-gradient(90deg, #7c3aed, #3b82f6); color: white; text-decoration: none; border-radius: 6px; font-weight: 600;">Return to PocketCounselor</a>
          </div>
        `);
      }
    }

    // Token not found
    return HtmlService.createHtmlOutput(`
      <div style="font-family: 'Poppins', Arial, sans-serif; text-align: center; padding: 40px; max-width: 500px; margin: 50px auto;">
        <h2 style="color: #dc2626;">Invalid or Expired Link</h2>
        <p style="color: #6b7280;">This verification link is invalid or has expired. Please sign up again.</p>
        <a href="https://pocketcounselor.com" style="display: inline-block; margin-top: 20px; padding: 12px 24px; background: #7c3aed; color: white; text-decoration: none; border-radius: 6px;">Return to PocketCounselor</a>
      </div>
    `);
  } catch (error) {
    console.error("Error verifying email:", error);
    return ContentService.createTextOutput("Error: " + error.toString());
  }
}
