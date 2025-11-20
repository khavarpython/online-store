import { useState, useEffect } from "react";
import Card from "./Card";
import { Link } from "react-router-dom";

function Cards() {
  const [sneakers, setSneakers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/sneakers")
      .then((response) => response.json())
      .then((data) => {
        setSneakers(data.results);
      })
      .catch((err) => {
        setSneakers([]);
        console.log(err);
      });
  }, []);

  return (
    <div class="flex flex-col my-20">
      <h2 class="self-center text-4xl font-black">Popular Shoes</h2>
      <div class="flex object-cover gap-5 font-bold mb-7 overflow-auto">
        {sneakers.map((sneaker) => {
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
