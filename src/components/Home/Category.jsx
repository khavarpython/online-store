import CategoryCard from "./CategoryCard";
import male from "../../assets/male.jpg";
import woman from "../../assets/woman.webp";
import kid from "../../assets/kid.jpg";
import jordan from "../../assets/jordan.avif";
import { useNavigate } from "react-router-dom";
function Category() {
  const navigate = useNavigate();
  const handleNavigate = input => {
    navigate(`/products`);
  };
  return (
    <div class="mx-8 mb-12">
      <h2
        class="text-4xl font- mb-5 font-serif font-black "
        onClick={() => {
          handleNavigate();
        }}
      >
        Shop Now
      </h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <CategoryCard img={male} text="Men" />
        <CategoryCard img={kid} text="Kids" />
        <CategoryCard img={jordan} text="Jordan" />
        <CategoryCard img={woman} text="Women" />
      </div>
    </div>
  );
}
export default Category;
