require('dotenv').config()
import mongoose from "mongoose";
import { MongoClient, ObjectId } from "mongodb";
import { NextResponse } from "next/server";


export async function dbConnect() {
  try {
    const connection = await mongoose.connect(String(process.env.MONGO_URI));
    return connection;
  } catch (err) {
    console.error(err);
  }
}

export async function GET() {
  await dbConnect();
  const uri = process.env.MONGO_URI;

  const client = new MongoClient(uri);

  try {
    await client.connect();
    const database = client.db('user');
    const users = database.collection('data');

    // Query for the user document with the specified _id
    const query = { _id: new ObjectId("669aaa1a9dd682d720023ab5") };

    const user = await users.findOne(query);

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  } finally {
    await client.close();
  }
}
