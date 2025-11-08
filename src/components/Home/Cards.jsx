import { useState, useEffect } from "react";
import Card from "./Card";
import { Link } from "react-router-dom";

function Cards() {
  const [sneakers, setSneakers] = useState([]);
  useEffect(() => {
    const url = "https://the-sneaker-database.p.rapidapi.com/sneakers?limit=20";

    const options = {
      method: "GET",
      headers: {
        "x-rapidapi-key": import.meta.env.VITE_RAPID_KEY,
        "x-rapidapi-host": import.meta.env.VITE_RAPID_HOST,
      },
    };
    async function fetchSneaker() {
      try {
        const response = await fetch(url, options);
        const result = await response.json();
        setSneakers(result.results);
      } catch (error) {
        console.error(error);
      }
    }
    fetchSneaker();
  }, []);

  return (
    <div class="flex flex-col my-20">
      <h2 class="self-center text-4xl font-black">Popular Shoes</h2>
      <div class="flex object-cover gap-5 font-bold mb-7 overflow-auto">
        {sneakers.map(sneaker => {
          if (sneaker.image.original) {
            return (
              <Link to={`/product/${sneaker.id}`} key={sneaker.id}>
                <Card img={sneaker.image.original} text={sneaker.name} />
              </Link>
            );
          }
        })}
      </div>
    </div>
  );
}
export default Cards;
