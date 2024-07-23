import mongoose from "mongoose";
import { MongoClient, ObjectId } from "mongodb";
import { NextResponse } from "next/server";

async function dbConnect() {
  if (mongoose.connection.readyState >= 1) {
    return;
  }
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw new Error("Failed to connect to MongoDB");
  }
}

export async function GET() {
  console.log("GET request received");
  await dbConnect();
  const uri = process.env.MONGO_URI;

  const client = new MongoClient(uri);

  try {
    console.log("Connecting to MongoDB client");
    await client.connect();
    const database = client.db('user');
    const users = database.collection('data');

    // Query for the user document with the specified _id
    const query = { _id: new ObjectId("669aaa1a9dd682d720023ab5") };
    console.log("Querying database:", query);

    const user = await users.findOne(query);

    if (!user) {
      console.log("User not found");
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    console.log("User found:", user);
    return NextResponse.json(user);
  } catch (error) {
    console.error("Error during MongoDB operation:", error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  } finally {
    console.log("Closing MongoDB client");
    await client.close();
  }
}
