import male from "../assets/male.avif";
function CategoryCard() {
  return (
    <div class="relative h-96  w-80 ">
      <img class="absolute inset-0 max-h-100" src={male} alt="male model" />
      <div class="absolute flex text-center top-0 left-0 right-0">
        <h3 class="text-white font-extrabold text-4xl">Mens</h3>
      </div>
    </div>
  );
}
export default CategoryCard;
