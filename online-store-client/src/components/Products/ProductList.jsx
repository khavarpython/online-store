import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import Loading from "../Loading";

function ProductList() {
  const [sneakers, setSneakers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  let param = useParams();

  useEffect(() => {
    setLoading(true);
    let url;

    if (param.postId === undefined) {
      url = "http://localhost:5000/api/sneakerlist";
    } else if (param.postId == "Jordan") {
      url = "http://localhost:5000/api/sneakerlist?type=jordan";
    } else if (param.postId == "Men" || param.postId == "Women" || param.postId == "Kids") {
      url = `http://localhost:5000/api/sneakerlist?type=${param.postId}`;
    } else {
      url = `http://localhost:5000/api/search?search=${param.postId}`;
    }

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setSneakers(data.results);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [param]);

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="ml-10 mt-5 w-fit">
            <button
              className="flex gap-0.5 items-center justify-center hover:bg-black hover:text-white px-3 py-2 rounded-lg mb-2"
              onClick={() => {
                navigate(-1);
              }}>
              <IoIosArrowBack /> Back
            </button>

            <h1 className="text-4xl capitalize"> Shoes</h1>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-5 max-w-6xl mx-auto my-5">
            {sneakers.map((sneaker) => {
              if (sneaker.image.original && sneaker.releaseYear > 0 && sneaker.retailPrice > 0) {
                return (
                  <Link to={`/product/${sneaker.id}`} key={sneaker.id}>
                    <div className="hover:border-2">
                      <div className="capitalize ml-auto mt-2 mr-2 w-fit bg-black text-white px-2 rounded-sm">
                        {sneaker.gender}
                      </div>
                      <img className="object-cover" src={sneaker.image.original} alt={sneaker.name} />

                      <div className="ml-0.5 max-w-[95%]">
                        <p>${sneaker.retailPrice}</p>
                        <h4 className="capitalize">{sneaker.silhouette}</h4>
                        <p className="capitalize text-sm text-gray-500">{sneaker.brand}</p>
                      </div>
                    </div>
                  </Link>
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
