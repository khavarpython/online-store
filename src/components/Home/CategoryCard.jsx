import { useNavigate } from "react-router-dom";

function CategoryCard(props) {
  const navigate = useNavigate();
  const handleNavigate = (input) => {
    navigate(`/products/${input}`);
  };
  return (
    <div
      class="relative h-96 w-80 cursor-pointer"
      onClick={() => {
        handleNavigate(props.text);
      }}
    >
      <img
        class="absolute inset-0 object-cover max-h-96 max-w-80 hover:border-2"
        src={props.img}
        alt="model"
      />
      <div class="absolute bottom-0 left-0 right-0">
        <h3 class="text-white font-extrabold text-4xl ml-2">{props.text}</h3>
      </div>
    </div>
  );
}
export default CategoryCard;
