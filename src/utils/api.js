const API_KEY = import.meta.env.VITE_API_KEY;

export async function getImages(query, page) {
  try {
    const response = await fetch(`https://api.unsplash.com/search/photos?page=${page}&query=${query}&client_id=${API_KEY}`);
    const data = await response.json();

    return data.results;
  } catch (e) {
    console.log(e);
  }

}
