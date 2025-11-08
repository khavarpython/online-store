import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { FaShoppingCart } from "react-icons/fa";

function Header() {
  const navigate = useNavigate();
  const handleNavigate = input => {
    navigate(`/products/${input}`);
  };

  return (
    <nav class="flex w-full h-20 justify-between items-center bg-black text-white ">
      <div class="ml-5 flex justify-between  ">
        <img src={logo} alt="Logo" class="w-15" />
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
      <div class="flex mr-5 gap-2">
        <input class="w-40 h-7 bg-white text-gray-700 " type="text" placeholder=" Search" />
        <FaShoppingCart class="size-6" />
      </div>
    </nav>
  );
}
export default Header;
