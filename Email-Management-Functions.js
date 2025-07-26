/**
 * 📧 EMAIL MANAGEMENT FUNCTIONS
 * Add these to your Enhanced Google Apps Script
 */

// =============================================================================
// 🗑️ EMAIL REMOVAL FUNCTIONS
// =============================================================================

function removeEmailFromWaitlist(emailToRemove) {
  try {
    console.log("🗑️ Attempting to remove email:", emailToRemove);

    const sheet = SpreadsheetApp.getActiveSheet();
    const data = sheet.getDataRange().getValues();

    // Find the email and remove it
    for (let i = 1; i < data.length; i++) {
      // Skip header row
      if (
        data[i][1] &&
        data[i][1].toLowerCase() === emailToRemove.toLowerCase()
      ) {
        const removedData = data[i];
        sheet.deleteRow(i + 1); // +1 because getRange is 1-indexed

        console.log("✅ Email removed successfully:", removedData);

        // Log the removal
        logEmailRemoval(emailToRemove, removedData[3]); // Log with status

        return `SUCCESS: Removed ${emailToRemove} from waitlist. They can now sign up again.`;
      }
    }

    console.log("❌ Email not found:", emailToRemove);
    return `EMAIL NOT FOUND: ${emailToRemove} is not in the waitlist.`;
  } catch (error) {
    console.error("💥 Error removing email:", error);
    return "ERROR: " + error.toString();
  }
}

function removeMultipleEmails(emailList) {
  try {
    console.log("🗑️ Removing multiple emails:", emailList);

    const results = [];

    for (const email of emailList) {
      const result = removeEmailFromWaitlist(email.trim());
      results.push(`${email}: ${result}`);
    }

    console.log("✅ Bulk removal complete");
    return results.join("\n");
  } catch (error) {
    console.error("💥 Error in bulk removal:", error);
    return "ERROR: " + error.toString();
  }
}

function removeUnverifiedEmails() {
  try {
    console.log("🗑️ Removing all unverified emails");

    const sheet = SpreadsheetApp.getActiveSheet();
    const data = sheet.getDataRange().getValues();

    let removedCount = 0;
    const removedEmails = [];

    // Go backwards to avoid index shifting
    for (let i = data.length - 1; i >= 1; i--) {
      if (data[i][3] === "UNVERIFIED") {
        // Column D (Status)
        removedEmails.push(data[i][1]); // Email
        sheet.deleteRow(i + 1);
        removedCount++;
      }
    }

    console.log(`✅ Removed ${removedCount} unverified emails`);

    // Log bulk removal
    logBulkRemoval("UNVERIFIED", removedCount);

    return `SUCCESS: Removed ${removedCount} unverified emails. List: ${removedEmails.join(
      ", "
    )}`;
  } catch (error) {
    console.error("💥 Error removing unverified emails:", error);
    return "ERROR: " + error.toString();
  }
}

// =============================================================================
// 📊 EMAIL SEARCH AND MANAGEMENT
// =============================================================================

function findEmailInWaitlist(emailToFind) {
  try {
    const sheet = SpreadsheetApp.getActiveSheet();
    const data = sheet.getDataRange().getValues();

    for (let i = 1; i < data.length; i++) {
      if (
        data[i][1] &&
        data[i][1].toLowerCase() === emailToFind.toLowerCase()
      ) {
        const emailData = {
          row: i + 1,
          name: data[i][0],
          email: data[i][1],
          timestamp: data[i][2],
          status: data[i][3],
          token: data[i][4],
          verifiedAt: data[i][5] || "Not verified",
          clientInfo: data[i][6] || "No info",
        };

        console.log("📧 Email found:", emailData);
        return emailData;
      }
    }

    console.log("❌ Email not found:", emailToFind);
    return null;
  } catch (error) {
    console.error("💥 Error finding email:", error);
    return null;
  }
}

function changeEmailStatus(email, newStatus) {
  try {
    console.log(`🔄 Changing status of ${email} to ${newStatus}`);

    const sheet = SpreadsheetApp.getActiveSheet();
    const data = sheet.getDataRange().getValues();

    for (let i = 1; i < data.length; i++) {
      if (data[i][1] && data[i][1].toLowerCase() === email.toLowerCase()) {
        const oldStatus = data[i][3];

        // Update status
        sheet.getRange(i + 1, 4).setValue(newStatus); // Column D

        // If changing to VERIFIED, add timestamp
        if (newStatus === "VERIFIED" && !data[i][5]) {
          sheet.getRange(i + 1, 6).setValue(new Date()); // Column F
        }

        console.log(
          `✅ Status changed: ${email} from ${oldStatus} to ${newStatus}`
        );
        return `SUCCESS: Changed ${email} status from ${oldStatus} to ${newStatus}`;
      }
    }

    return `EMAIL NOT FOUND: ${email} is not in the waitlist.`;
  } catch (error) {
    console.error("💥 Error changing email status:", error);
    return "ERROR: " + error.toString();
  }
}

// =============================================================================
// 📈 WAITLIST STATISTICS
// =============================================================================

function getWaitlistSummary() {
  try {
    const sheet = SpreadsheetApp.getActiveSheet();
    const data = sheet.getDataRange().getValues();

    let totalEmails = 0;
    let verifiedEmails = 0;
    let unverifiedEmails = 0;
    const recentSignups = [];

    const oneDayAgo = new Date();
    oneDayAgo.setDate(oneDayAgo.getDate() - 1);

    for (let i = 1; i < data.length; i++) {
      totalEmails++;

      const status = data[i][3];
      const timestamp = new Date(data[i][2]);

      if (status === "VERIFIED") {
        verifiedEmails++;
      } else if (status === "UNVERIFIED") {
        unverifiedEmails++;
      }

      // Check for recent signups
      if (timestamp >= oneDayAgo) {
        recentSignups.push({
          email: data[i][1],
          name: data[i][0],
          status: status,
          timestamp: timestamp,
        });
      }
    }

    const verificationRate =
      totalEmails > 0 ? ((verifiedEmails / totalEmails) * 100).toFixed(1) : 0;

    const summary = {
      totalEmails,
      verifiedEmails,
      unverifiedEmails,
      verificationRate: `${verificationRate}%`,
      recentSignups24h: recentSignups.length,
      recentSignupsList: recentSignups,
      lastUpdated: new Date().toISOString(),
    };

    console.log("📊 Waitlist Summary:", summary);
    return summary;
  } catch (error) {
    console.error("💥 Error getting waitlist summary:", error);
    return "ERROR: " + error.toString();
  }
}

// =============================================================================
// 📝 LOGGING FUNCTIONS
// =============================================================================

function logEmailRemoval(email, status) {
  try {
    const metricsSheet = getOrCreateMetricsSheet();
    const timestamp = new Date();

    metricsSheet.appendRow([
      timestamp,
      "EMAIL_REMOVAL",
      `REMOVED_${status}`,
      email,
      Session.getActiveUser().getEmail(),
    ]);
  } catch (error) {
    console.error("Error logging email removal:", error);
  }
}

function logBulkRemoval(type, count) {
  try {
    const metricsSheet = getOrCreateMetricsSheet();
    const timestamp = new Date();

    metricsSheet.appendRow([
      timestamp,
      "BULK_REMOVAL",
      `${type}_COUNT_${count}`,
      "bulk_operation",
      Session.getActiveUser().getEmail(),
    ]);
  } catch (error) {
    console.error("Error logging bulk removal:", error);
  }
}

// =============================================================================
// 🧪 TESTING FUNCTIONS
// =============================================================================

function testEmailManagement() {
  try {
    console.log("🧪 Testing email management functions...");

    // Test finding an email
    const testEmail = "test@example.com";
    console.log("1. Testing findEmailInWaitlist...");
    const foundEmail = findEmailInWaitlist(testEmail);

    // Test getting summary
    console.log("2. Testing getWaitlistSummary...");
    const summary = getWaitlistSummary();

    console.log("✅ Email management tests complete");
    return {
      findEmailTest: foundEmail ? "FOUND" : "NOT_FOUND",
      summaryTest: summary ? "SUCCESS" : "FAILED",
      summary: summary,
    };
  } catch (error) {
    console.error("💥 Error testing email management:", error);
    return "ERROR: " + error.toString();
  }
}

// =============================================================================
// 📧 LAUNCH NOTIFICATION PREPARATION
// =============================================================================

function getVerifiedEmailsForLaunch() {
  try {
    console.log("🚀 Getting verified emails for launch notification...");

    const sheet = SpreadsheetApp.getActiveSheet();
    const data = sheet.getDataRange().getValues();

    const verifiedEmails = [];

    for (let i = 1; i < data.length; i++) {
      if (data[i][3] === "VERIFIED") {
        // Column D (Status)
        verifiedEmails.push({
          name: data[i][0],
          email: data[i][1],
          verifiedAt: data[i][5] || "Unknown",
        });
      }
    }

    console.log(`✅ Found ${verifiedEmails.length} verified emails for launch`);

    return {
      count: verifiedEmails.length,
      emails: verifiedEmails,
      csvFormat: verifiedEmails.map((e) => `${e.name},${e.email}`).join("\n"),
    };
  } catch (error) {
    console.error("💥 Error getting verified emails:", error);
    return "ERROR: " + error.toString();
  }
}

/**
 * 📚 USAGE EXAMPLES:
 *
 * Remove single email:
 * removeEmailFromWaitlist('user@example.com')
 *
 * Remove multiple emails:
 * removeMultipleEmails(['user1@example.com', 'user2@example.com'])
 *
 * Find email details:
 * findEmailInWaitlist('user@example.com')
 *
 * Change email status:
 * changeEmailStatus('user@example.com', 'VERIFIED')
 *
 * Get waitlist summary:
 * getWaitlistSummary()
 *
 * Remove all unverified:
 * removeUnverifiedEmails()
 *
 * Get launch email list:
 * getVerifiedEmailsForLaunch()
 */
