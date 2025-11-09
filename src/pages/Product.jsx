import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";

import { IoIosArrowBack } from "react-icons/io";
import { Link, useParams } from "react-router-dom";
import Loading from "../components/Loading";

function Product() {
  const [sneakers, setSneakers] = useState([]);
  const [colors, setColors] = useState([]);
  const [loading, setLoading] = useState(true);
  let param = useParams();

  useEffect(() => {
    setLoading(true);
    let url = `https://the-sneaker-database.p.rapidapi.com/sneakers/${param.postId}`;
    const options = {
      method: "GET",
      headers: {
        "x-rapidapi-key": import.meta.env.VITE_RAPID_KEY,
        "x-rapidapi-host": import.meta.env.VITE_RAPID_HOST,
      },
    };

    async function fetchData() {
      try {
        const response = await fetch(url, options);
        const result = await response.json();
        setSneakers(result.results);

        if (result.results) {
          let encSil = encodeURIComponent(result.results[0].silhouette);
          let encBrand = encodeURIComponent(result.results[0].brand);
          url = `https://the-sneaker-database.p.rapidapi.com/sneakers?limit=100&gender=${result.results[0].gender}&silhouette=${encSil}&brand=${encBrand}`;
          const colResponse = await fetch(url, options);
          const colResult = await colResponse.json();
          setColors(colResult.results);
        }
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, [param]);

  let sneaker = sneakers[0];
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <Header />

          <div class="flex my-15 mx-5 justify-center gap-5 ">
            <div class="max-w-lg h-full">
              <Link to="/">
                <button class="flex gap-0.5 items-center justify-center hover:bg-black hover:text-white pr-3 rounded-lg">
                  <IoIosArrowBack /> Back
                </button>
              </Link>
              <img src={sneaker.image.original} alt="" class="mt-5" />
            </div>

            <div class=" w-xl ">
              <h1>{sneaker.silhouette}</h1>
              <h2 class="capitalize">{sneaker.gender} Shoes</h2>
              <h3>${sneaker.retailPrice}</h3>

              <h3>Colors</h3>
              <div class="flex flex-wrap gap-2">
                {colors.map(color => {
                  if (color.image.original) {
                    return (
                      <Link to={`/product/${color.id}`} key={color.id}>
                        <img src={color.image.original} class="w-20 h-15 rounded-lg object-cover" />
                      </Link>
                    );
                  }
                })}
              </div>

              <form class="max-w-lg">
                <fieldset class="flex flex-wrap gap-2">
                  <legend>Select Size</legend>
                  <button class="border px-2 py-1 rounded-sm">30.5</button>
                </fieldset>
                <button type="submit">Add to Cart</button>
              </form>
              <p>{sneaker.story} </p>
            </div>
          </div>

          <Footer />
        </>
      )}
    </>
  );
}
export default Product;
