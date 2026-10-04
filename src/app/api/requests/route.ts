import { NextResponse } from "next/server";
import { Resend } from "resend";
import { brokers, getCategory, type Broker } from "@/lib/data";

const FROM_ADDRESS = "Insurance Cambodia <contact@insurance-cambodia.com>";
const ADMIN_EMAIL = "contact@insurance-cambodia.com";

type RequestPayload = {
  name?: string;
  phone?: string;
  email?: string;
  category?: string;
  message?: string;
  brokerIds?: string[];
};

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function buildEmailBody(record: {
  name: string;
  phone: string | null;
  email: string | null;
  categoryName: string;
  message: string | null;
}) {
  return [
    "New insurance request via Insurance Cambodia",
    "",
    `Insurance type: ${record.categoryName}`,
    `Name: ${record.name}`,
    `Phone: ${record.phone ?? "Not provided"}`,
    `Email: ${record.email ?? "Not provided"}`,
    `Message: ${record.message ?? "Not provided"}`,
  ].join("\n");
}

export async function POST(request: Request) {
  let body: RequestPayload;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const errors: string[] = [];

  if (!isNonEmptyString(body.name)) errors.push("Name is required.");
  if (!isNonEmptyString(body.phone) && !isNonEmptyString(body.email)) {
    errors.push("Phone or email is required.");
  }
  if (!isNonEmptyString(body.category) || !getCategory(body.category)) {
    errors.push("A valid insurance category is required.");
  }

  const requestedBrokerIds = Array.isArray(body.brokerIds) ? body.brokerIds : [];
  const knownBrokerIds = new Set(brokers.map((b) => b.id));
  const invalidBrokerIds = requestedBrokerIds.filter((id) => !knownBrokerIds.has(id));
  if (invalidBrokerIds.length > 0) {
    errors.push(`Unknown broker id(s): ${invalidBrokerIds.join(", ")}.`);
  }

  if (errors.length > 0) {
    return NextResponse.json({ error: errors.join(" ") }, { status: 400 });
  }

  const category = body.category as string;
  const openBrokerIds = new Set(
    brokers.filter((b) => !b.closed).map((b) => b.id),
  );
  const targetBrokerIds =
    requestedBrokerIds.length > 0
      ? requestedBrokerIds.filter((id) => openBrokerIds.has(id))
      : brokers
          .filter((b) => !b.closed && b.categories.includes(category))
          .map((b) => b.id);

  const record = {
    id: crypto.randomUUID(),
    submittedAt: new Date().toISOString(),
    name: body.name!.trim(),
    phone: body.phone?.trim() || null,
    email: body.email?.trim() || null,
    category,
    message: body.message?.trim() || null,
    brokerIds: targetBrokerIds,
  };

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY is not set; cannot send insurance requests.");
    return NextResponse.json(
      { error: "Email delivery is not configured yet. Please try again later." },
      { status: 500 },
    );
  }

  const categoryName = getCategory(category)!.name;
  const emailBody = buildEmailBody({
    name: record.name,
    phone: record.phone,
    email: record.email,
    categoryName,
    message: record.message,
  });
  const subject = `New ${categoryName} request from ${record.name}`;
  const replyTo = record.email ?? undefined;

  const targetBrokers = targetBrokerIds
    .map((id) => brokers.find((b) => b.id === id))
    .filter((b): b is Broker => Boolean(b?.email));

  const resend = new Resend(apiKey);
  const sendResults = await Promise.allSettled([
    ...targetBrokers.map((broker) =>
      resend.emails.send({
        from: FROM_ADDRESS,
        to: broker.email!,
        replyTo,
        subject,
        text: emailBody,
      }),
    ),
    resend.emails.send({
      from: FROM_ADDRESS,
      to: ADMIN_EMAIL,
      replyTo,
      subject: `[Copy] ${subject}`,
      text: `${emailBody}\n\nSent to: ${
        targetBrokers.length > 0
          ? targetBrokers.map((b) => b.name).join(", ")
          : "No broker emails on file for this category."
      }`,
    }),
  ]);

  const anySucceeded = sendResults.some((result) => result.status === "fulfilled");
  if (!anySucceeded) {
    console.error("All request emails failed to send", sendResults);
    return NextResponse.json(
      { error: "Could not send your request. Please try again." },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true, id: record.id, brokerIds: targetBrokerIds });
}
