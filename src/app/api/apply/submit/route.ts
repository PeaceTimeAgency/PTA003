import { NextRequest, NextResponse } from "next/server";
import { creators } from "@/lib/creators";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      recruiterId,
      is18Plus,
      isUSCA,
      contentTypes,
      otherContentType,
      nicheDescription,
      liveFrequency,
      averageSessionLength,
      tiktokHandle,
      discordId,
      emailAddress,
      additionalNotes
    } = body;

    // Find the recruiter to get their webhook
    const recruiter = creators.find(c => c.id === recruiterId && c.tier === 'recruiter');

    // We can fallback to a master webhook if needed, or if no recruiter is found. 
    // Right now, if no recruiter, we just skip it or log it.
    const webhookUrl = recruiter?.webhookUrl;

    if (!webhookUrl) {
      console.warn("No webhook URL found for recruiter.", recruiterId);
      return NextResponse.json(
        { error: "Submission endpoint configuration error. Please contact support." },
        { status: 500 }
      );
    }

    const discordDisplay = discordId || "Not Provided";
    const emailDisplay = emailAddress || "Not Provided";

    // Format the selected content types
    let contentTypesString = "None";
    if (contentTypes && Array.isArray(contentTypes)) {
      contentTypesString = contentTypes.join(", ");
    }
    if (otherContentType) {
      contentTypesString += ` (Other: ${otherContentType})`;
    }

    // Prepare Discord Webhook Payload
    const embed = {
      title: "🚀 New Creator Intake Form Submitted!",
      color: 0xE11D48, // Primary color hex
      description: `A new creator has applied to join **Peace Time Agency** and selected **${recruiter.name}** as their recruiter.`,
      fields: [
        {
          name: "👤 General",
          value: `**TikTok Handle:** ${tiktokHandle}\n**18+:** ${is18Plus}\n**Location (US/CA):** ${isUSCA}`,
          inline: false
        },
        {
          name: "Contact Info",
          value: `**Discord:** ${discordDisplay}\n**Email:** ${emailDisplay}`,
          inline: false
        },
        {
          name: "📱 Content Details",
          value: `**Content Types:** ${contentTypesString}\n**Niche/Style:** ${nicheDescription}`,
          inline: false
        },
        {
          name: "🎥 LIVE Habits",
          value: `**Frequency:** ${liveFrequency}\n**Avg Session Length:** ${averageSessionLength}`,
          inline: false
        }
      ],
      timestamp: new Date().toISOString(),
      footer: {
        text: "Peace Time Agency • Talent Intake System",
      }
    };

    if (additionalNotes) {
      embed.fields.push({
        name: "📝 Additional Notes",
        value: additionalNotes,
        inline: false
      });
    }

    const discordPayload = {
      embeds: [embed]
    };

    // Send the POST request to the Discord Webhook
    const discordResponse = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(discordPayload),
    });

    if (!discordResponse.ok) {
      console.error("Discord Webhook Error:", discordResponse.status, discordResponse.statusText);
      const errorText = await discordResponse.text();
      console.error("Discord Response details:", errorText);
      throw new Error(`Discord Webhook failed with status ${discordResponse.status}`);
    }

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error("Submission Error:", error);
    return NextResponse.json(
      { error: "Failed to submit application. Please try again later." },
      { status: 500 }
    );
  }
}
