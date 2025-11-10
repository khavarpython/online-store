import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { FaRegTrashAlt } from "react-icons/fa";

function Cart() {
  const { cartItems, removeFromCart, clearCart, getCartTotal } = useContext(CartContext);

  return (
    <>
      <Header />
      <div class="flex flex-col sm:flex-row justify-around min-h-80 mx-10 md:mx-50 gap-5 mt-10 mb-10">
        <div class="w-full pb-5 ">
          <h1 class="text-3xl"> Cart</h1>
          {cartItems.map((item) => {
            console.log(item);
            console.log(cartItems);

            return (
              <div class="flex gap-2 border-t-2 border-t-gray-500 pt-2" key={item.id}>
                <img src={item.image.original} class="max-w-32 md:max-w-64 max-h-auto"></img>
                <div>
                  <h2>{item.name}</h2>
                  <h2 class="capitalize">{item.gender}</h2>
                  <h2>Quantity: {item.quantity}</h2>
                  <h2>Size {item.size}</h2>
                  <button
                    class="my-auto"
                    onClick={() => {
                      removeFromCart(item);
                    }}>
                    <FaRegTrashAlt />
                  </button>
                </div>
                <h3 class="sm:ml-auto w-fit ">${item.retailPrice}</h3>
              </div>
            );
          })}
        </div>

        <div class="w-sm ">
          <div class="flex justify-between">
            <h3>Subtotal</h3>
            <h3>$ {getCartTotal()}</h3>
          </div>

          <div class="flex justify-between">
            <h3>Tax</h3>
            <h3>$ {getCartTotal() * 0.15}</h3>
          </div>

          <div class="flex justify-between">
            <h3>Total</h3>
            <h3>$ {getCartTotal() + getCartTotal() * 0.15}</h3>
          </div>
          <button
            class="bg-black text-white px-2 rounded-md w-full mt-2"
            onClick={() => {
              alert("No Payment Implementation");
            }}>
            Buy
          </button>
        </div>
      </div>
      <h3
        class="text-black text-xl mx-auto w-fit mb-10 cursor-pointer hover:underline"
        onClick={() => {
          clearCart();
        }}>
        Clear Cart
      </h3>
      <Footer />
    </>
  );
}
export default Cart;
