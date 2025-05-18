export const createRating = async (data) => {
    const response = await fetch('http://localhost:8000/rating', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('Failed to submit rating');
  }
}