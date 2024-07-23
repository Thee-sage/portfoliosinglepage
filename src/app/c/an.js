'use server';

export async function fetchUserData() {
  try {
    const response = await fetch('/api/mongo');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
}
