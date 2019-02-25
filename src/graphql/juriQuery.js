export default async function juriQuery(payload) {
  try {
    const response = await fetch('/graphql', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: payload
    });

    return await response.json();
  } catch (error) {
    // TODO
    // Handle errors with alert to user
    console.error(error);
    return [];
  }
}
