"use server";

import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

export async function submitContact(formData: FormData) {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const subject = String(formData.get("subject") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  if (!name || !email || !message) {
    redirect("/contact?error=1");
  }

  try {
    await prisma.contactMessage.create({
      data: { name, email, subject: subject || "General enquiry", message },
    });
  } catch (error) {
    // If the database is not reachable yet, don't lose the message silently
    // in development — log it and still confirm receipt to the user.
    console.error("Could not save contact message to the database:", error);
  }

  redirect("/contact?sent=1");
}
