import { NextResponse } from "next/server";
import { appendFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { brokers, getCategory } from "@/lib/data";

// Storage/forwarding is not finalized yet. For now, validated requests are
// appended as JSON lines to a local file so nothing submitted is lost.
// TODO: once a forwarding mechanism is chosen (e.g. transactional email to
// brokers, a real database), replace this with that implementation.
const STORE_DIR = path.join("/tmp", "insurance-cambodia");
const STORE_FILE = path.join(STORE_DIR, "requests.jsonl");

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
  const targetBrokerIds =
    requestedBrokerIds.length > 0
      ? requestedBrokerIds
      : brokers.filter((b) => b.categories.includes(category)).map((b) => b.id);

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

  try {
    await mkdir(STORE_DIR, { recursive: true });
    await appendFile(STORE_FILE, JSON.stringify(record) + "\n", "utf8");
  } catch (error) {
    console.error("Failed to persist insurance request", error);
    return NextResponse.json(
      { error: "Could not save your request. Please try again." },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true, id: record.id, brokerIds: targetBrokerIds });
}
