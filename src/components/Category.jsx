import CategoryCard from "./CategoryCard";

function Category() {
  return (
    <div class="mx-8 my-8">
      <h2 class="text-4xl font- my-1.5 font-serif font-black">Shop Now</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <CategoryCard />
        <CategoryCard />
        <CategoryCard />
        <CategoryCard />
      </div>
    </div>
  );
}
export default Category;
