import Card from "./Card";
import card1 from "../assets/card-1.jpg";
import card2 from "../assets/card-2.png";
import card3 from "../assets/card-3.jpg";
function Cards() {
  return (
    <div class="flex flex-wrap justify-around mt-20 font-bold mb-7">
      <Card img={card1} text="Cade Space 1s" />
      <Card img={card2} text="Cade Space 2s" />
      <Card img={card3} text="Cade Space 3s" />
    </div>
  );
}
export default Cards;
