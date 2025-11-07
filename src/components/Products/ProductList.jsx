import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Loading from "../Loading";

function ProductList() {
  const [sneakers, setSneakers] = useState([]);
  const [loading, setLoading] = useState(true);

  let param = useParams();
  useEffect(() => {
    setLoading(true);
    let url;
    if (param.postId === undefined) {
      url = "https://the-sneaker-database.p.rapidapi.com/sneakers?limit=10";
    } else if (param.postId == "JORDAN") {
      url =
        "https://the-sneaker-database.p.rapidapi.com/sneakers?limit=10&brand=AIR%20JORDAN";
    } else {
      url = `https://the-sneaker-database.p.rapidapi.com/sneakers?limit=10&gender=${param.postId}`;
    }
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
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    }
    fetchSneaker();
  }, [param]);

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <>
          <div class="ml-10 mt-5">
            <Link to="/"> Back</Link>
            <h1 class="text-4xl capitalize"> Shoes</h1>
          </div>
          <div class="grid grid-cols-2 sm:grid-cols-3 gap-y-5 max-w-6xl mx-auto my-5">
            {sneakers.map((sneaker) => {
              if (sneaker.image.original) {
                return (
                  <div class="hover:border-2" key={sneaker.id}>
                    <img
                      class="object-cover"
                      src={sneaker.image.original}
                      alt={sneaker.name}
                    />
                    <div class="ml-0.5 max-w-[95%]">
                      <p>${sneaker.retailPrice}</p>
                      <h4 class="capitalize">{sneaker.name}</h4>
                      <p class="capitalize text-sm text-gray-500">
                        {sneaker.brand}
                      </p>
                    </div>
                  </div>
                );
              }
            })}
          </div>
        </>
      )}
    </div>
  );
}
export default ProductList;
