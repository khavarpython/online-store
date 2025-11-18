import { Link, useNavigate } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { useContext, useRef } from "react";
import { CartContext } from "../context/CartContext";
import logo from "../assets/logo.png";

function Header() {
  const { cartItems } = useContext(CartContext);
  const navigate = useNavigate();
  const searchRef = useRef(null);

  const handleNavigate = (input) => {
    navigate(`/products/${input}`);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    let enc = encodeURIComponent(searchRef.current.value);
    console.log(enc);
    navigate(`/products/${enc}`);
  };

  return (
    <nav class="flex w-full h-20 justify-between items-center bg-black text-white ">
      <div class="ml-5 flex justify-between">
        <Link to="/">
          <img src={logo} alt="Logo" class="w-15 hover:w-20" />
        </Link>
      </div>
      <div class="hidden sm:flex text-lg ml-[13%] md:ml-[10%] lg:ml-[8%] md:text-xl gap-4">
        <a class="cursor-pointer hover:underline hover:text-[1.5rem]" onClick={() => handleNavigate("Men")}>
          Men
        </a>
        <a class="cursor-pointer hover:underline hover:text-[1.5rem]" onClick={() => handleNavigate("Women")}>
          Women
        </a>
        <a class="cursor-pointer hover:underline hover:text-[1.5rem]" onClick={() => handleNavigate("Kids")}>
          Kids
        </a>
        <a class="cursor-pointer hover:underline hover:text-[1.5rem]" onClick={() => handleNavigate("Jordan")}>
          Jordan
        </a>
      </div>

      <div class="flex mr-5 gap-2.5 justify-end">
        <form onSubmit={handleSearch} class="w-1/2 md:w-50">
          <input ref={searchRef} type="text" placeholder="Search" class="border px-3 py-1 rounded-lg w-full" />
        </form>

        <Link to="/cart" class="flex gap-1">
          <FaShoppingCart class="size-6 hover:size-7" />
          <p>{cartItems.length}</p>
        </Link>
      </div>
    </nav>
  );
}
export default Header;
