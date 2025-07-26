/**
 * 📝 SIMPLE 5-FIELD VERSION
 * Use this if you want exactly 5 columns: Name | Email | Timestamp | Status | Token
 */

function doPost(e) {
  try {
    console.log("📥 New form submission received");

    // Get form data
    const formData = e.parameter;
    const name = (formData.name || "").trim();
    const email = (formData.email || "").trim().toLowerCase();

    // Validation
    if (!email) {
      return ContentService.createTextOutput("Error: Email is required");
    }

    if (!name) {
      return ContentService.createTextOutput("Error: Name is required");
    }

    // Generate verification token
    const verificationToken = Utilities.getUuid();

    // Get the spreadsheet
    const sheet = SpreadsheetApp.getActiveSheet();

    // Check if email already exists
    if (isEmailAlreadyRegistered(email)) {
      return ContentService.createTextOutput("Email already registered");
    }

    // Add to spreadsheet - SIMPLE 5 FIELDS ONLY
    const timestamp = new Date();
    const newRow = [
      name, // Column A
      email, // Column B
      timestamp, // Column C
      "UNVERIFIED", // Column D
      verificationToken, // Column E
    ];

    sheet.appendRow(newRow);

    // Send verification email
    sendVerificationEmail(email, name, verificationToken);

    return ContentService.createTextOutput("Success: Verification email sent");
  } catch (error) {
    console.error("Error in doPost:", error);
    return ContentService.createTextOutput("Error: " + error.toString());
  }
}

function isEmailAlreadyRegistered(email) {
  try {
    const sheet = SpreadsheetApp.getActiveSheet();
    const data = sheet.getDataRange().getValues();

    for (let i = 1; i < data.length; i++) {
      if (data[i][1] && data[i][1].toLowerCase() === email.toLowerCase()) {
        return true;
      }
    }
    return false;
  } catch (error) {
    return false;
  }
}

// Update verification to only use 5 fields
function verifyEmail(token) {
  try {
    const sheet = SpreadsheetApp.getActiveSheet();
    const data = sheet.getDataRange().getValues();

    for (let i = 1; i < data.length; i++) {
      if (data[i][4] === token) {
        // Token is in column E (index 4)

        // Check if already verified
        if (data[i][3] === "VERIFIED") {
          return createAlreadyVerifiedPage(data[i][0]);
        }

        // Update verification status - ONLY UPDATE STATUS COLUMN
        sheet.getRange(i + 1, 4).setValue("VERIFIED"); // Column D only

        return createSuccessVerificationPage(data[i][0]);
      }
    }

    return createInvalidLinkPage();
  } catch (error) {
    return ContentService.createTextOutput("Error: " + error.toString());
  }
}

// Setup simple 5-column headers
function setupSimpleSpreadsheet() {
  try {
    const sheet = SpreadsheetApp.getActiveSheet();

    // Set up simple headers
    const headers = ["Name", "Email", "Timestamp", "Status", "Token"];
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);

    // Format headers
    const headerRange = sheet.getRange(1, 1, 1, headers.length);
    headerRange.setFontWeight("bold");
    headerRange.setBackground("#4f46e5");
    headerRange.setFontColor("white");

    console.log("✅ Simple spreadsheet setup complete");
    return "Simple spreadsheet setup complete with 5 columns";
  } catch (error) {
    console.error("Error setting up simple spreadsheet:", error);
    return "ERROR: " + error.toString();
  }
}
