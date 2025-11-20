import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Card from "./Card";
import Loading from "../Loading";
import { ThreeDot } from "react-loading-indicators";

function Cards() {
  const [sneakers, setSneakers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch("http://localhost:5000/api/sneakers")
      .then((response) => response.json())
      .then((data) => {
        setSneakers(data.results);
        setLoading(false);
      })
      .catch((err) => {
        setSneakers([]);
        setLoading(false);
        console.log(err);
      });
  }, []);

  return (
    <div className="flex flex-col my-20 min-w-96 min-h-64">
      <h2 className="self-center text-4xl font-black">Popular Shoes</h2>
      {loading ? (
        <div className="mt-20 flex  item-center justify-center">
          <ThreeDot color="black" size="medium" text="" textColor="" className="" />
        </div>
      ) : (
        <div className="flex object-cover gap-5 font-bold mb-7 overflow-auto">
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
      )}
    </div>
  );
}
export default Cards;
