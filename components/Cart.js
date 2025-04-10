"use client";
import { useState } from "react";

export default function Cart() {
  const [cartItems, setCartItems] = useState([
    { name: "Mediterranean", price: 7.89, weight: "505g", qty: 2 },
    { name: "Philadelphia Sushi", price: 6.20, weight: "290g", qty: 1 },
    { name: "Salmon", price: 1.40, weight: "40g", qty: 1 },
  ]);

  const total = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0).toFixed(2);

  return (
    <div className="bg-white p-4 rounded-xl shadow-md">
      <h2 className="text-xl font-semibold">Cart</h2>
      <div className="flex space-x-2 mt-2">
        <button className="bg-green-500 text-white px-3 py-1 rounded-md">Delivery</button>
        <button className="bg-gray-200 px-3 py-1 rounded-md">Self-pickup</button>
      </div>

      {cartItems.map((item, index) => (
        <div key={index} className="flex justify-between mt-3">
          <p>{item.name} ({item.weight})</p>
          <p>${item.price.toFixed(2)}</p>
        </div>
      ))}

      <div className="border-t mt-3 pt-3">
        <p className="text-gray-600">45-60 min / Delivery 5$</p>
        <h3 className="text-xl font-semibold mt-2">Total: ${total}</h3>
        <button className="w-full bg-green-500 text-white py-2 rounded-md mt-3">Okay, next</button>
      </div>
    </div>
  );
}
