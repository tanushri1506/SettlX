import { ConvexHttpClient } from "convex/browser";
import { api } from "@/convex/_generated/api";
import { inngest } from "./client";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL);

export const spendingInsights = inngest.createFunction(
  { name: "Generate Spending Insights", id: "generate-spending-insights" },
  { cron: "0 8 1 * *" }, // Runs 1st of every month at 08:00
  async ({ step }) => {
    const users = await step.run("Fetch users with expenses", async () => {
      return await convex.query(api.inngest.getUsersWithExpenses);
    });

    const results = [];

    for (const user of users) {
      const expenses = await step.run(`Expenses · ${user._id}`, () =>
        convex.query(api.inngest.getUserMonthlyExpenses, { userId: user._id })
      );

      if (!expenses?.length) continue;

      const totalSpent = expenses.reduce((sum, e) => sum + e.amount, 0);

      const categoryMap = {};
      for (const e of expenses) {
        const category = e.category || "Uncategorized";
        categoryMap[category] = (categoryMap[category] || 0) + e.amount;
      }

      const categoryHtml = Object.entries(categoryMap)
        .map(
          ([category, amount]) =>
            `<li><strong>${category.charAt(0).toUpperCase() + category.slice(1)}:</strong> ₹${amount.toFixed(2)}</li>`
        )
        .join("");

      const categoryText = Object.entries(categoryMap)
        .map(([category, amount]) => `- ${category}: ₹${amount.toFixed(2)}`)
        .join("\n");

      const htmlBody = `
        <html>
          <body style="font-family: Arial, sans-serif; color: #333;">
            <p>Hi ${user.name},</p>
            <p>Here's a quick look at your spending for the past month:</p>
            <p><strong>Total Spent:</strong> ₹${totalSpent.toFixed(2)}</p>
            <p><strong>Breakdown by Category:</strong></p>
            <ul>${categoryHtml}</ul>
            <p>We hope this helps you stay financially informed. Keep tracking and budgeting smartly!</p>
            <p>Regards,<br/>Team SettlX</p>
          </body>
        </html>
      `;

      const textBody = `
Hi ${user.name},

Here's a quick look at your spending for the past month:

Total Spent: ₹${totalSpent.toFixed(2)}

Breakdown by Category:
${categoryText}

We hope this helps you stay financially informed. Keep tracking and budgeting smartly.

Regards,
Team SettlX
      `.trim();

      try {
        await step.run(`Email · ${user._id}`, () =>
          convex.action(api.email.sendEmail, {
            to: user.email,
            subject: "Your Monthly Spending Summary from SettlX",
            html: htmlBody,
            text: textBody,
            apiKey: process.env.SENDGRID_API_KEY,
          })
        );

        results.push({ userId: user._id, success: true });
      } catch (err) {
        results.push({
          userId: user._id,
          success: false,
          error: err.message,
        });
      }
    }

    return {
      processed: results.length,
      success: results.filter((r) => r.success).length,
      failed: results.filter((r) => !r.success).length,
    };
  }
);
