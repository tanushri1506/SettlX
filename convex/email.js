"use node";

import { v } from "convex/values";
import { action } from "./_generated/server";
import sgMail  from "@sendgrid/mail";

// Action to send email using Send Grid
export const sendEmail = action({
  args: {
    to: v.string(),
    subject: v.string(),
    html: v.string(),
    text: v.optional(v.string()),
    apiKey : v.string(),
  },
  handler: async (_ctx, args) => {
    sgMail.setApiKey(args.apiKey);

    try {
      const result = await sgMail.send({
        from: "SettlX <designeryumiko@gmail.com>",
        to: args.to,
        subject: args.subject,
        html: args.html,
        text: args.text,
      });

      console.log("Email sent successfully:", result);

      return { success: true, id: result.id };
    } catch (error) {
      console.error("Failed to send email:", error);
      return { success: false, error: error.message };
    }
  },
});