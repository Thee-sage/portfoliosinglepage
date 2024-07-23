import { MongoClient } from 'mongodb';

export async function GET() {
  const uri = process.env.MONGO_URI;

  if (!uri) {
    return new Response(JSON.stringify([]), { status: 500 });
  }

  const client = new MongoClient(uri);

  try {
    await client.connect();
    const database = client.db('user');
    const users = database.collection('data');
    const data = await users.find({}).toArray();
    return new Response(JSON.stringify(data));
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify([]), { status: 500 });
  } finally {
    await client.close();
  }
}
