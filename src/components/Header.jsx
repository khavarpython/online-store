import logo from "/logo.png";
import { FaShoppingCart } from "react-icons/fa";
function Header() {
  return (
    <nav class="flex w-full h-20 justify-between items-center bg-gray-700 text-white ">
      <div class="ml-5 flex justify-between  ">
        <img src={logo} alt="Logo" class="w-20" />
      </div>
      <div class="hidden sm:flex ml-[16%] md:ml-[10%] lg:ml-[8%] gap-2">
        <a>Men</a>
        <a>Women</a>
        <a>Kids</a>
        <a>Jordan</a>
      </div>
      <div class="flex mr-5 gap-1">
        <input
          class="w-40 h-7  bg-white text-gray-700 rounded-[10px]"
          type="text"
          placeholder=" Search"
        />
        <FaShoppingCart class="size-6" />
      </div>
    </nav>
  );
}
export default Header;
