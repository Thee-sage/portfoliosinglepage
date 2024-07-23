import { MongoClient } from 'mongodb';
import { Suspense } from 'react';

const fetchData = async () => {
  const uri = process.env.MONGO_URI;
  
  if (!uri) {
    return [];
  }

  const client = new MongoClient(uri);

  try {
    await client.connect();
    const database = client.db('user');
    const users = database.collection('data');
    const data = await users.find({}).toArray();
    return data;
  } catch (error) {
    console.error(error);
    return [];
  } finally {
    await client.close();
  }
};

const Page = async () => {
  const userData = await fetchData();

  return (
    <div>
      <h1>User Data</h1>
      {userData.length > 0 ? (
        <ul>
          {userData.map((user, index) => (
            <li key={index}>{JSON.stringify(user)}</li>
          ))}
        </ul>
      ) : (
        <p>No user data found.</p>
      )}
    </div>
  );
};

export default Page;
