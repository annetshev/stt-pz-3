import axios from "axios";

export const getListOfRestEndPoint = async () => {
  try {
    const response = await axios.get("https://www.anapioficeandfire.com/api/");
    return response.data;
  } catch (error) {
    console.error("Error fetching list of API endpoints:", error.message);
    throw error;
  }
};

export const getBooks = async () => {
  try {
    const response = await axios.get(
      "https://www.anapioficeandfire.com/api/books/"
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching book details:", error.message);
    return null;
  }
};
export const getHouses = async () => {
  try {
    const response = await axios.get(
      "https://www.anapioficeandfire.com/api/houses/"
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching book details:", error.message);
    return null;
  }
};
