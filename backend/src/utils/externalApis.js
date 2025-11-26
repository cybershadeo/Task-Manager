const path = require("path");

//moving 2 dir up to find the .env file
require("dotenv").config({ path: path.join(__dirname, "../../.env") });

//calls the abstractapi to validate the authenticity of the email
async function validateEmailWithAbstract(email) {
  //the url&endpoint we are making our request
  const url = `https://emailreputation.abstractapi.com/v1/?api_key=${process.env.ABSTRACT_EMAIL_API_KEY}&email=${email}`;

  //the response of the request
  const response = await fetch(url);

  //we throw an error if the request is unsuccessful
  if (!response.ok) {
    throw new Error("Abstract failed to validate email");
  }

  //convert the response to json
  const data = await response.json();

  return data;
}

async function isEmailValid(email) {
  try {
    const validation = await validateEmailWithAbstract(email);

    // Safely extract deliverability info
    const email_deliverability = validation?.email_deliverability;

    // If API responded but structure is unexpected
    if (!email_deliverability) {
      return {
        valid: false,
        reason: "Unexpected response from email validation service",
        isServiceError: true,
      };
    }

    const { status, is_smtp_valid, status_detail } = email_deliverability;

    // Check if Abstract says the email is NOT deliverable
    if (status !== "deliverable" || is_smtp_valid !== true) {
      return {
        valid: false,
        reason: `Invalid email: ${status_detail || "Email undeliverable"}`,
      };
    }

    // Passed all checks
    return { valid: true };

  } catch (error) {

    console.error("Email validation API error:", error.message);

    return {
      valid: false,
      reason: "Email validation service unavailable",
      isServiceError: true,
    };
  }
}

module.exports = { isEmailValid };
