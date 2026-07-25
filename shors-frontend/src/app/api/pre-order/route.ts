import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(request: Request) {
  try {
    const { name, phone, email } = await request.json();

    // 1. Server-side validation
    if (!name || !name.trim() || !phone || !phone.trim()) {
      return NextResponse.json(
        { error: "Name and Phone number are required." },
        { status: 400 }
      );
    }

    const payload = {
      timestamp: new Date().toISOString(),
      name: name.trim(),
      phone: phone.trim(),
      email: email ? email.trim() : "N/A",
    };

    console.log("----------------------------------------");
    console.log("SHORS PRE-ORDER SUBMISSION RECEIVED:");
    console.log("Name:      ", payload.name);
    console.log("Phone:     ", payload.phone);
    console.log("Email:     ", payload.email);
    console.log("Timestamp: ", payload.timestamp);
    console.log("----------------------------------------");

    // 2. Persist to a local workspace file (preorders.json)
    const filePath = path.join(process.cwd(), "preorders.json");
    let submissions = [];

    if (fs.existsSync(filePath)) {
      try {
        const fileContent = fs.readFileSync(filePath, "utf-8");
        submissions = JSON.parse(fileContent);
      } catch (e) {
        console.error("Error reading local preorders database file, resetting logs", e);
      }
    }

    submissions.push(payload);
    fs.writeFileSync(filePath, JSON.stringify(submissions, null, 2), "utf-8");

    // Note for Phase 1: To route dynamically to Google Sheets & Email in production, 
    // the founders can add Google Sheets API SDK or Resend/Nodemailer integrations here.

    return NextResponse.json({ 
      success: true, 
      message: "Noise logged successfully! Pre-order registered in local database." 
    });
  } catch (error) {
    console.error("Pre-order API route error:", error);
    return NextResponse.json(
      { error: "Internal server error occurred." },
      { status: 500 }
    );
  }
}
