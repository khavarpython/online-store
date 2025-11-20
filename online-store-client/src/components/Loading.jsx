import { ThreeDot } from "react-loading-indicators";

function Loading() {
  return (
    <div className="fixed inset-0 bg-white z-9999 w-screen h-screen flex justify-center items-center">
      <ThreeDot color="black" size="medium" text="" textColor="" className="" />
    </div>
  );
}
export default Loading;
