import { useContext, useEffect } from "react";
import { CartContext } from "../context/CartContext";
import { FaRegTrashAlt } from "react-icons/fa";
import { IoIosArrowBack } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";

function Cart() {
  const { cartItems, removeFromCart, clearCart, getCartTotal } = useContext(CartContext);
  const itemsLength = cartItems.length > 0;
  const navigate = useNavigate();

  return (
    <>
      <Header />

      <div class="flex flex-col sm:flex-row justify-around min-h-80 mx-10 md:mx-50 gap-5 mt-10 mb-10">
        <div class="w-full pb-5">
          <button
            class="flex gap-0.5 items-center hover:bg-black hover:text-white pr-3 py-2 rounded-lg"
            onClick={() => {
              navigate(-1);
            }}>
            <IoIosArrowBack /> Back to Shopping
          </button>

          {itemsLength ? <h1 class="text-3xl"> Cart</h1> : <h1 class="text-3xl">Cart is empty</h1>}

          {cartItems.map((item) => {
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

        {itemsLength ? (
          <div class="w-sm">
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
              class="block bg-black text-white px-2  py-0.5 rounded-md w-1/2 mx-auto mt-2 hover:bg-green-400"
              onClick={() => {
                alert("No Payment Implementation");
              }}>
              Buy
            </button>
          </div>
        ) : null}
      </div>

      {itemsLength ? (
        <h3
          class="text-black text-xl mx-auto w-fit mb-10 cursor-pointer hover:underline"
          onClick={() => {
            clearCart();
          }}>
          Clear Cart
        </h3>
      ) : (
        <div class="mb-25"></div>
      )}

      <Footer />
    </>
  );
}
export default Cart;
