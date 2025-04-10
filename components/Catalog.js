export default function Catalog() {
    return (
      <div className="bg-white p-4 rounded-xl shadow-md">
        <h2 className="text-xl font-semibold text-green-700">Nourishing and tasty</h2>
        <p className="text-gray-600">Order hot pizza and special sushi</p>
  
        <h3 className="mt-4 font-semibold">Delivery</h3>
        <p className="text-gray-600">🚚 today until 22:00</p>
        <p className="text-gray-600">💰 free from 25$</p>
  
        <h3 className="mt-4 font-semibold">Catalog</h3>
        <ul className="space-y-2">
          <li className="bg-gray-200 p-2 rounded-md">🍕 Pizza</li>
          <li className="p-2">🍣 Sushi</li>
          <li className="p-2">🍔 Burger</li>
          <li className="p-2">🍰 Dessert</li>
        </ul>
      </div>
    );
  }
  