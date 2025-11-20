import { useNavigate } from "react-router-dom";
import hero_video from "../../assets/hero.mp4";

function Hero() {
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate("/products");
  };

  return (
    <div className="relative w-full h-screen">
      <video
        className="absolute inset-0 w-full h-full object-cover"
        disablePictureInPicture
        loop="loop"
        autoPlay="autoplay"
        muted>
        <source src={hero_video} type="video/mp4"></source>
        Your browser does not support the video tag.
      </video>

      <div className="absolute bottom-0 left-0 right-0 pb-12 flex flex-col items-center text-white text-center ">
        <h2 className="text-7xl font-extrabold">Online Store</h2>
        <p className="text-sm">This website was designed by Khavar Facey</p>
        <button
          className="bg-white text-gray-700 px-5 py-1 rounded-xl mt-2 cursor-pointer hover:bg-gray-300"
          onClick={() => {
            handleNavigate();
          }}>
          Shop
        </button>
      </div>
    </div>
  );
}
export default Hero;
