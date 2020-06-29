export const getItems = async () => {
    let response = fetch("http://localhost:8000/items/");
    return response;
}

export const getItem = async (id) => {
    let response = fetch(`http://localhost:8000/items/${id}/`);
    return response;
}

export const addRating = async (id, rating) => {
    const response = await fetch(`http://localhost:8000/rating/${id}/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({"rating": rating})
  });
    return response;
}