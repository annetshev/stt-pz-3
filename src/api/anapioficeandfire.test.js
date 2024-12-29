const axios = require("axios");
const { getListOfRestEndPoint, getBooks } = require("./anapioficeandfire");

jest.mock("axios");

describe("API tests with mocked data", () => {
  it("should load API endpoint data", async () => {
    axios.get.mockResolvedValueOnce({
      data: {
        books: [{ url: "https://www.anapioficeandfire.com/api/book/3" }],
      },
    });

    const data = await getListOfRestEndPoint();
    expect(data.books).toBeDefined();
    expect(data.books[0].url).toEqual(
      "https://www.anapioficeandfire.com/api/book/3"
    );
  });

  it("should load books data", async () => {
    axios.get.mockResolvedValueOnce({
      data: [{ url: "https://www.anapioficeandfire.com/api/book/3" }],
    });

    const data = await getBooks();
    expect(data).toBeDefined();
    expect(data[0].url).toEqual("https://www.anapioficeandfire.com/api/book/3");
  });
});
