import { Link, useNavigate } from "react-router-dom";
import { SocialIcon } from "react-social-icons";
import logo from "../assets/logo.png";
function Footer() {
  const navigate = useNavigate();
  const handleNavigate = (input) => {
    navigate(`/products/${input}`);
  };

  return (
    <footer className="h-35 w-full bg-black  text-xs md:text-sm  ">
      <div className="flex text-center justify-center h-full gap-10 text-gray-200">
        <img src={logo} alt="logo" className="w-12 h-auto self-center" />
        <ul className="self-center cursor-pointer ">
          <li onClick={() => handleNavigate("Men")} className="hover:underline">
            Men
          </li>
          <li onClick={() => handleNavigate("Women")} className="hover:underline">
            Women
          </li>
          <li onClick={() => handleNavigate("Kids")} className="hover:underline">
            Kids
          </li>
        </ul>
        <ul className="hidden sm:block self-center cursor-pointer ">
          <li onClick={() => handleNavigate("")} className="hover:underline">
            Popular
          </li>
          <li onClick={() => handleNavigate("")} className="hover:underline">
            New Arrivals
          </li>
          <li onClick={() => handleNavigate("")} className="hover:underline">
            Best Sellers
          </li>
          <li onClick={() => handleNavigate("Jordan")} className="hover:underline">
            Jordan Collection
          </li>
        </ul>
        <ul className="self-center cursor-pointer">
          <Link to="/about">
            <li className="hover:underline">About Us</li>
          </Link>
          <Link to="/about#contact"></Link>
          <li className="hover:underline">Contact</li>
          <Link to="/cart">
            <li className="hover:underline">Cart</li>
          </Link>
        </ul>
        <div className="flex items-center gap-2">
          <SocialIcon
            network="github"
            url="https://github.com/khavarpython/online-store"
            target="_blank"
            className="w-8! h-8!"
          />
          <SocialIcon
            network="linkedin"
            bgColor="#2a2a2a"
            url="https://www.linkedin.com/in/khavar-facey-209006253/"
            target="_blank"
            className="w-8! h-8!"
          />
        </div>
      </div>
    </footer>
  );
}
export default Footer;
