import Footer from "../components/Footer";
import Header from "../components/Header";
import { IoIosArrowBack } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
function Success() {
  const navigate = useNavigate();

  return (
    <div>
      <Header />
      <button
        className=" ml-10 mt-3 flex gap-0.5 items-center hover:bg-black hover:text-white pr-3 py-2 rounded-lg"
        onClick={() => {
          navigate("/");
        }}>
        <IoIosArrowBack /> Back to Home
      </button>

      <div className="h-screen text-6xl my-10 justify-center font-bold text-green-600 flex ">
        <h1>Sucessfully Purchased</h1>
      </div>
      <Footer />
    </div>
  );
}
export default Success;
