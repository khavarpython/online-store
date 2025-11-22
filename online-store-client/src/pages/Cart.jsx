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

  const makePayment = async () => {
    try {
      const body = {
        products: cartItems,
      };

      const headers = {
        "Content-Type": "application/json",
      };

      const response = await fetch("/stripe/pay", {
        method: "POST",
        headers: headers,
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const session = await response.json();

      if (session.url) {
        window.location.href = session.url;
      } else {
        console.error("No checkout URL returned");
      }
    } catch (error) {
      console.error("Payment error:", error);
    }
  };

  return (
    <>
      <Header />

      <div className="flex flex-col sm:flex-row justify-around min-h-80 mx-10 md:mx-50 gap-5 mt-10 mb-10">
        <div className="w-full pb-5">
          <button
            className="flex gap-0.5 items-center hover:bg-black hover:text-white pr-3 py-2 rounded-lg"
            onClick={() => {
              navigate(-1);
            }}>
            <IoIosArrowBack /> Back to Shopping
          </button>

          {itemsLength ? <h1 className="text-3xl"> Cart</h1> : <h1 className="text-3xl">Cart is empty</h1>}

          {cartItems.map((item) => {
            return (
              <div className="flex gap-2 border-t-2 border-t-gray-500 pt-2" key={item.id}>
                <img src={item.image} className="max-w-32 md:max-w-64 max-h-auto"></img>
                <div>
                  <h2>{item.title}</h2>
                  <h2 className="capitalize">{item.gender}</h2>
                  <h2>Quantity: {item.quantity}</h2>
                  <h2>Size {item.size}</h2>
                  <button
                    className="my-auto"
                    onClick={() => {
                      removeFromCart(item);
                    }}>
                    <FaRegTrashAlt />
                  </button>
                </div>
                <h3 className="sm:ml-auto w-fit ">${Math.round(item.avg_price)}</h3>
              </div>
            );
          })}
        </div>

        {itemsLength ? (
          <div className="w-sm mt-10 ml-5">
            <div className="flex justify-between">
              <h3>Subtotal</h3>
              <h3>$ {getCartTotal()}</h3>
            </div>

            <div className="flex justify-between">
              <h3>Tax</h3>
              <h3>$ {getCartTotal() * 0.15}</h3>
            </div>

            <div className="flex justify-between">
              <h3>Total</h3>
              <h3>$ {getCartTotal() + getCartTotal() * 0.15}</h3>
            </div>

            <button
              className="block bg-black text-white px-2  py-0.5 rounded-md w-1/2 mx-auto mt-2 hover:bg-green-400"
              onClick={() => {
                makePayment();
              }}>
              Buy
            </button>
          </div>
        ) : null}
      </div>

      {itemsLength ? (
        <h3
          className="text-black text-xl mx-auto w-fit mb-10 cursor-pointer hover:underline"
          onClick={() => {
            clearCart();
          }}>
          Clear Cart
        </h3>
      ) : (
        <div className="mb-25"></div>
      )}

      <Footer />
    </>
  );
}
export default Cart;
