/**
 * Cloudinary Configuration Diagnostic Script
 *
 * Verifies that CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET
 * are set and that they form a valid, consistent Cloudinary credential set.
 *
 * Usage:
 *   npx tsx scripts/verify-cloudinary.ts
 *
 * Safety:
 *   - Never prints the API secret
 *   - Only prints the cloud name and a masked API key
 *   - Performs a lightweight API call (list resources, limit 1) to verify credentials
 *   - Does NOT upload, modify, or delete anything
 */

import { v2 as cloudinary } from "cloudinary";

async function main() {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  console.log("=== Cloudinary Configuration Diagnostic ===\n");

  // Check presence
  const missing: string[] = [];
  if (!cloudName) missing.push("CLOUDINARY_CLOUD_NAME");
  if (!apiKey) missing.push("CLOUDINARY_API_KEY");
  if (!apiSecret) missing.push("CLOUDINARY_API_SECRET");

  if (missing.length > 0) {
    console.error(`❌ MISSING environment variables: ${missing.join(", ")}`);
    console.error("   These must be set in the Railway environment variables.");
    process.exit(1);
  }

  // Print non-secret values (mask API key partially)
  const maskedKey = apiKey!.substring(0, 4) + "..." + apiKey!.substring(apiKey!.length - 4);
  console.log(`   Cloud Name:  ${cloudName}`);
  console.log(`   API Key:     ${maskedKey}`);
  console.log(`   API Secret:  ******* (set, not shown)`);
  console.log("");

  // Configure and test
  cloudinary.config({
    cloud_name: cloudName,
    api_key: apiKey,
    api_secret: apiSecret,
  });

  try {
    const result = await cloudinary.api.ping();
    console.log("✅ Cloudinary credentials are VALID!");
    console.log(`   Ping response: ${JSON.stringify(result)}`);
  } catch (error: any) {
    console.error("❌ Cloudinary credentials are INVALID!");
    console.error(`   Error: ${error.message || error}`);
    if (error.message?.includes("Invalid api_key")) {
      console.error("");
      console.error("   The API key does not match any Cloudinary account.");
      console.error("   Possible causes:");
      console.error("   1. The CLOUDINARY_API_KEY in Railway is wrong or stale");
      console.error("   2. The CLOUDINARY_CLOUD_NAME and CLOUDINARY_API_KEY are from different accounts");
      console.error("   3. The API key was regenerated in the Cloudinary dashboard");
    }
    process.exit(1);
  }
}

main();
