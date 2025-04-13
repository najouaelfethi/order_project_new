export default function Catalog() {
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-4">Categories</h2>
      <ul className="space-y-2">
        <li className="cursor-pointer hover:text-blue-600">Pizza</li>
        <li className="cursor-pointer hover:text-blue-600">Pasta</li>
        <li className="cursor-pointer hover:text-blue-600">Salads</li>
        <li className="cursor-pointer hover:text-blue-600">Drinks</li>
      </ul>
    </div>
  );
} 