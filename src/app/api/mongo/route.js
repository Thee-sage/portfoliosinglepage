import { MongoClient, ObjectId } from "mongodb";
import { NextResponse } from "next/server";

// ── MongoDB connection caching ──────────────────────────────────────────────
// In Next.js (especially with hot-reload) a new module instance is created
// on every request in dev, so we cache the client on the global object to
// avoid opening a new connection each time.
let cachedClient = null;

async function getClient() {
  if (cachedClient) return cachedClient;
  const uri = process.env.MONGO_URI;
  const client = new MongoClient(uri, {
    maxPoolSize: 5,           // keep a small connection pool
    serverSelectionTimeoutMS: 5000,
  });
  await client.connect();
  cachedClient = client;
  return client;
}

// ── API handler ──────────────────────────────────────────────────────────────
export async function GET() {
  try {
    const client = await getClient();
    const database = client.db("user");
    const users = database.collection("data");

    const query = { _id: new ObjectId("66a4b2e0c314ab14a7dcd79f") };
    const user = await users.findOne(query);

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user, {
      headers: {
        // Tell the browser/CDN to cache for 5 minutes; revalidate in background
        "Cache-Control": "public, s-maxage=300, stale-while-revalidate=60",
      },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
