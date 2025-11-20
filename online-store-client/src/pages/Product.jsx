import { useEffect, useState, useContext } from "react";
import { CartContext } from "../context/CartContext";
import { IoIosArrowBack } from "react-icons/io";
import { Link, useNavigate, useParams } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Loading from "../components/Loading";
import { shoeSizes } from "../components/Product/sizeData";

function Product() {
  const [sneakers, setSneakers] = useState([]);
  const [colors, setColors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [size, setSize] = useState("");
  const [showError, setShowError] = useState(false);
  const [add, setAdd] = useState(false);
  const { cartItems, addToCart } = useContext(CartContext);
  const navigate = useNavigate();
  let param = useParams();

  const decodeHTML = (html) => {
    const txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
  };

  useEffect(() => {
    setLoading(true);
    let id = param.postId;

    fetch(`http://localhost:5000/api/product/?id=${id}`)
      .then((response) => response.json())
      .then((data) => {
        setSneakers(data.results);

        if (data.results) {
          const params = new URLSearchParams({
            gender: data.results[0].gender,
            silhouette: data.results[0].silhouette,
            brand: data.results[0].brand,
          });
          fetch(`http://localhost:5000/api/colors?${params}`)
            .then((response) => response.json())
            .then((coldata) => {
              setColors(coldata.results);
              setLoading(false);
            });
        }
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
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
              <button
                class="flex gap-0.5 items-center justify-center hover:bg-black hover:text-white px-3 py-2 rounded-lg"
                onClick={() => {
                  navigate(-1);
                }}>
                <IoIosArrowBack /> Back
              </button>

              <img src={sneaker.image.original} alt="" class="mt-5" />
            </div>

            <div class=" w-xl ">
              <h1 class="text-3xl">{sneaker.silhouette}</h1>
              <h2 class="capitalize text-gray-500">{sneaker.gender} Shoes</h2>
              <h3 class="mb-4 font-black">${sneaker.retailPrice}</h3>

              <h3>Colors</h3>
              <div class="flex flex-wrap gap-2 mb-5">
                {colors.map((color) => {
                  if (color.image.original) {
                    return (
                      <Link to={`/product/${color.id}`} key={color.id}>
                        <img src={color.image.original} class="w-20 h-15 rounded-lg object-cover" />
                      </Link>
                    );
                  }
                })}
              </div>

              <div class="max-w-lg">
                <fieldset class="flex flex-wrap gap-2">
                  <legend>Select Size (US)</legend>
                  {shoeSizes[sneaker.gender].map((size, index) => {
                    return (
                      <button
                        class="border px-2 py-1 rounded-sm hover:border-2 w-fit"
                        key={index}
                        onClick={() => {
                          setShowError(false);
                          setSize(size.size);
                        }}>
                        {size.size}
                      </button>
                    );
                  })}
                </fieldset>
                <p class={showError ? "block text-red-600" : "hidden"}>Please select a size</p>
                <button
                  class="mt-5 mb-2 bg-black text-white px-3 py-2 rounded-md hover:bg-gray-700"
                  onClick={() => {
                    if (!size) {
                      setShowError(true);
                    } else {
                      setAdd(true);
                      addToCart(sneaker, size);
                      setSize("");
                    }
                  }}>
                  Add to Cart
                </button>
                <p class={add ? "block text-lg font-bold text-green-500 mb-5" : "hidden"}>
                  {" "}
                  Added to Cart Successfully{" "}
                </p>
              </div>
              <p class="text-lg/relaxed">{decodeHTML(sneaker.story)} </p>
            </div>
          </div>
          <Footer />
        </>
      )}
    </>
  );
}
export default Product;
