import Footer from "../components/Footer";
import Header from "../components/Header";
import about_video from "../assets/about.mp4";
function About() {
  return (
    <div className="bg-black">
      <Header />
      <div className="max-w-screen pt-5 text-white text-lg border-t-gray-800 border-t-3">
        <p className="max-w-[80%] ml-4 text-left mt-2">
          Welcome to our store, where style meets quality and affordability. Founded with a passion for fashion, we've
          grown from a small boutique into a trusted destination for shoppers seeking the perfect blend of contemporary
          trends and timeless classics. Our mission is simple: to provide high-quality that empower you to express your
          unique style.
        </p>
        <div className="my-5 bg-black">
          <video
            className="inset-0 w-[90%] object-cover mx-auto"
            disablePictureInPicture
            loop="loop"
            autoPlay="autoplay"
            muted>
            <source src={about_video} type="video/mp4"></source>
            Your browser does not support the video tag.
          </video>
        </div>
        <p className="max-w-[80%] ml-auto mr-4 text-right">
          We believe that great fashion shouldn't come with a hefty price tag. That's why we work directly with
          manufacturers and designers to bring you curated collections at prices that make sense. Every item in our
          store is carefully selected for its quality, style, and versatility. Our commitment extends beyond just
          selling products. We're dedicated to providing an experience.
        </p>

        <div
          id="contact"
          className="mt-10 pb-10 flex-col gap-5 border-t-gray-800 border-t-3 border-b-gray-800 border-b-3">
          <h2 className="mt-4 ml-10">Contact Us</h2>
          <form className="mt-4 ml-10">
            <textarea
              className="bg-black text-white border border-gray-600 rounded-lg p-3 w-64 h-32 focus:outline-none focus:border-gray-400 resize-none"
              placeholder="Enter your message..."
            />
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}
export default About;
