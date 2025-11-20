import CategoryCard from "./CategoryCard";
import male from "../../assets/male.jpg";
import woman from "../../assets/woman.webp";
import kid from "../../assets/kid.jpg";
import jordan from "../../assets/jordan.avif";
import { useNavigate } from "react-router-dom";

function Category() {
  const navigate = useNavigate();
  const handleNavigate = (input) => {
    navigate(`/products`);
  };

  return (
    <div className="mx-5 mb-12">
      <h2
        className="text-4xl font- mb-5 font-serif font-black "
        onClick={() => {
          handleNavigate();
        }}>
        Shop Now
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5">
        <CategoryCard img={male} text="Men" />
        <CategoryCard img={woman} text="Women" />
        <CategoryCard img={kid} text="Kids" />
        <CategoryCard img={jordan} text="Jordan" />
      </div>
    </div>
  );
}
export default Category;
