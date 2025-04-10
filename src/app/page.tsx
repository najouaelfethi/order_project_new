import Cart from "@/components/Cart";
import Catalog from "@/components/Catalog";

export  function Home() {
  return (
    <div className="grid grid-cols-12 gap-4 p-4">
      {/* Sidebar Catalog */}
      <div className="col-span-3">
        <Catalog />
      </div>

      {/* Main Content */}
      <div className="col-span-6">
        <h1 className="text-2xl font-semibold mb-4">Pizza</h1>
        <p className="text-gray-600 mb-4">Here are all the products from this category</p>
        <div className="grid grid-cols-2 gap-4">
          <ProductCard name="European" price="6.89" weight="540g" />
          <ProductCard name="Four Seasons" price="7.89" weight="545g" />
          <ProductCard name="Mediterranean" price="7.89" weight="505g" />
        </div>
      </div>

      {/* Cart */}
      <div className="col-span-3">
        <Cart />
      </div>
    </div>
  );
}

const ProductCard = ({ name, price, weight }: { name: string; price: string; weight: string }) => {
  return (
    <div>
      <h2>{name}</h2>
      <p>{price} $</p>
      <p>{weight}</p>
    </div>
  );
};

export default ProductCard;

