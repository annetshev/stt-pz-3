import { useState, useEffect } from "react";
import { getBooks, getListOfRestEndPoint } from "./api/anapioficeandfire";

import "./App.css";

function App() {
  const [list, setList] = useState([]);
  const [houses, setHouses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const booksData = await getBooks();
        console.log("Books Data:", booksData);
        if (booksData) {
          setList(booksData);
        }

        const endpointsData = await getListOfRestEndPoint();
        console.log("Endpoints Data:", endpointsData);
        if (endpointsData && Array.isArray(endpointsData.houses)) {
          setHouses(endpointsData.houses);
        } else {
          setHouses([]);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setHouses([]);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="app">
      <section className="app-main">
        <h1>
          <a
            className="app-link"
            href="https://www.anapioficeandfire.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn An API of Ice And Fire
          </a>
        </h1>

        <ul className="app-list">
          {list.length > 0 ? (
            list.map((item) => (
              <li className="app-list-item" key={item.url}>
                <b>{item.name}</b>:
                <a
                  className="app-link"
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {item.url}
                </a>
              </li>
            ))
          ) : (
            <li>No books available.</li>
          )}
        </ul>

        <h2>Additional Endpoints</h2>
        <ul>
          {houses.length > 0 ? (
            houses.map((house) => (
              <li key={house.url}>
                <b>{house.name}</b>: {house.region}
              </li>
            ))
          ) : (
            <li>No houses available.</li>
          )}
        </ul>
      </section>
    </div>
  );
}

export default App;
