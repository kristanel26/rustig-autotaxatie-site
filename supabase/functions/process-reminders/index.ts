import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

// Email template - will be used when RESEND is configured
const EMAIL_TEMPLATE = {
  subject: "Herinnering geldigheid taxatierapport",
  getBody: (inspectionDate: string, merk: string, model: string, kenteken: string) => `
Geachte heer/mevrouw,

Op ${inspectionDate} hebben wij uw voertuig ${merk} ${model} (${kenteken}) voor u getaxeerd.

Een taxatie is altijd een momentopname. Bij veel verzekeringen wordt ervan uitgegaan dat een taxatie na verloop van tijd opnieuw wordt vastgesteld, zodat bij schade of verlies geen discussie ontstaat over de waarde.

Een taxatierapport heeft gemiddeld een geldigheid van drie jaar. De geldigheid van de destijds opgestelde taxatie nadert het einde. Na deze periode kan de geldigheid verlopen en kan bij schade of verlies sprake zijn van een lagere uitkering door de verzekeraar. Wij adviseren u uw polis te raadplegen of bij uw verzekeraar na te vragen welke voorwaarden van toepassing zijn.

Met deze e-mail brengen wij u hiervan uitsluitend ter informatie op de hoogte.

Met vriendelijke groet,

Automobiel Taxaties
Erik Elderson
Register Taxateur motorvoertuigen

Ontvangt u deze herinnering liever niet meer, dan kunt u dit per e-mail aan ons doorgeven.
`.trim(),
};

// Placeholder function - will be replaced with Resend integration
async function SEND_EMAIL(
  to: string,
  subject: string,
  body: string
): Promise<{ success: boolean; error?: string }> {
  // PLACEHOLDER: Log what would be sent
  console.log("=== SEND_EMAIL PLACEHOLDER ===");
  console.log(`To: ${to}`);
  console.log(`Subject: ${subject}`);
  console.log(`Body:\n${body}`);
  console.log("=== END PLACEHOLDER ===");

  // Simulate success (change to simulate failure for testing)
  return { success: true };
}

// Calculate date range for reminders
// Window: inspection_date + 2 years 10 months TO inspection_date + 3 years
function isInReminderWindow(inspectionDate: Date, today: Date): boolean {
  // Calculate window start: inspection_date + 2 years + 10 months
  const windowStart = new Date(inspectionDate);
  windowStart.setFullYear(windowStart.getFullYear() + 2);
  windowStart.setMonth(windowStart.getMonth() + 10);

  // Calculate window end: inspection_date + 3 years
  const windowEnd = new Date(inspectionDate);
  windowEnd.setFullYear(windowEnd.getFullYear() + 3);

  // Check if today falls within the window
  return today >= windowStart && today <= windowEnd;
}

// Format date to Dutch locale
function formatDateDutch(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("nl-NL", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

interface Report {
  id: string;
  customer_email: string;
  inspection_date: string;
  license_plate: string | null;
  rdw_merk: string | null;
  rdw_handelsbenaming: string | null;
  vehicle_brand: string | null;
  model_display_name: string | null;
  herinnering_status: string | null;
  herinnering_verzonden_op: string | null;
}

Deno.serve(async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    console.log("Starting reminder processing...");

    // Initialize Supabase client with service role for full access
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Fetch eligible reports:
    // - inspection_date is filled
    // - herinnering_status = 'gepland'
    // - herinnering_verzonden_op is NULL
    // - customer_email is filled
    // - NOT 'niet_meer_van_toepassing'
    const { data: reports, error: fetchError } = await supabase
      .from("reports")
      .select(`
        id,
        customer_email,
        inspection_date,
        license_plate,
        rdw_merk,
        rdw_handelsbenaming,
        vehicle_brand,
        model_display_name,
        herinnering_status,
        herinnering_verzonden_op
      `)
      .not("inspection_date", "is", null)
      .not("customer_email", "is", null)
      .eq("herinnering_status", "gepland")
      .is("herinnering_verzonden_op", null);

    if (fetchError) {
      console.error("Error fetching reports:", fetchError);
      throw fetchError;
    }

    console.log(`Found ${reports?.length || 0} potentially eligible reports`);

    const results = {
      processed: 0,
      sent: 0,
      failed: 0,
      skipped: 0,
      details: [] as Array<{
        id: string;
        kenteken: string;
        status: string;
        reason?: string;
      }>,
    };

    // Process each eligible report
    for (const report of reports || []) {
      results.processed++;

      const inspectionDate = new Date(report.inspection_date);

      // Check if today falls in the reminder window
      if (!isInReminderWindow(inspectionDate, today)) {
        results.skipped++;
        results.details.push({
          id: report.id,
          kenteken: report.license_plate || "onbekend",
          status: "skipped",
          reason: "Niet binnen herinneringsvenster",
        });
        continue;
      }

      // GUARD: Claim the report atomically
      // Only update if status is still 'gepland' and verzonden_op is still null
      const { data: claimResult, error: claimError } = await supabase
        .from("reports")
        .update({
          herinnering_status: "gepland", // Keep as gepland during processing
          updated_at: new Date().toISOString(),
        })
        .eq("id", report.id)
        .eq("herinnering_status", "gepland")
        .is("herinnering_verzonden_op", null)
        .select("id")
        .maybeSingle();

      if (claimError || !claimResult) {
        // Another process already claimed this report
        results.skipped++;
        results.details.push({
          id: report.id,
          kenteken: report.license_plate || "onbekend",
          status: "skipped",
          reason: "Reeds verwerkt door ander proces",
        });
        continue;
      }

      // Prepare email content
      const merk = report.rdw_merk || report.vehicle_brand || "onbekend merk";
      const model =
        report.rdw_handelsbenaming ||
        report.model_display_name ||
        "onbekend model";
      const kenteken = report.license_plate || "onbekend kenteken";

      const emailBody = EMAIL_TEMPLATE.getBody(
        formatDateDutch(report.inspection_date),
        merk,
        model,
        kenteken
      );

      // Try to send email
      const emailResult = await SEND_EMAIL(
        report.customer_email,
        EMAIL_TEMPLATE.subject,
        emailBody
      );

      if (emailResult.success) {
        // Success: Update status to 'verzonden'
        const { error: updateError } = await supabase
          .from("reports")
          .update({
            herinnering_status: "verzonden",
            herinnering_verzonden_op: today.toISOString().split("T")[0],
            herinnering_verzonden_aan_email: report.customer_email,
            herinnering_laatste_fout: null,
            updated_at: new Date().toISOString(),
          })
          .eq("id", report.id);

        if (updateError) {
          console.error(`Error updating report ${report.id}:`, updateError);
          results.failed++;
          results.details.push({
            id: report.id,
            kenteken,
            status: "failed",
            reason: `Database update failed: ${updateError.message}`,
          });
        } else {
          results.sent++;
          results.details.push({
            id: report.id,
            kenteken,
            status: "sent",
          });
          console.log(`Successfully sent reminder for report ${report.id}`);
        }
      } else {
        // Failure: Update status to 'mislukt' with error message
        const { error: updateError } = await supabase
          .from("reports")
          .update({
            herinnering_status: "mislukt",
            herinnering_laatste_fout: emailResult.error || "Onbekende fout",
            updated_at: new Date().toISOString(),
          })
          .eq("id", report.id);

        if (updateError) {
          console.error(
            `Error updating failed report ${report.id}:`,
            updateError
          );
        }

        results.failed++;
        results.details.push({
          id: report.id,
          kenteken,
          status: "failed",
          reason: emailResult.error || "Onbekende fout",
        });
        console.error(
          `Failed to send reminder for report ${report.id}:`,
          emailResult.error
        );
      }
    }

    console.log("Reminder processing complete:", results);

    return new Response(JSON.stringify(results), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error("Error in process-reminders:", error);
    return new Response(
      JSON.stringify({
        error: error instanceof Error ? error.message : "Unknown error",
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
});
