function Card(props) {
  return (
    <div className="relative w-96 h-64 mt-5 mb-5 shrink-0 cursor-point hover:w-100">
      <img className="inset-0 absolute object-cover w-full h-full" src={props.img} />
      <div className="absolute left-0 right-0 bottom-0 flex flex-col items-center text-center ">
        <h3 className="text-zinc-900 text-sm">{props.text}</h3>
      </div>
    </div>
  );
}
export default Card;
