import spinner from "../assets/spinner.gif";

function Loading() {
  return (
    <div class="fixed inset-0 bg-white z-9999 w-screen h-screen">
      <img class="w-screen h-screen mx-auto object-cover" src={spinner} alt="spinner" />
    </div>
  );
}
export default Loading;
