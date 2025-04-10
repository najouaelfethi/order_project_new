"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import AppLayout from "../../../components/layout/AppLayout";
import { PlusIcon, TrashIcon } from "@heroicons/react/24/outline";

interface OrderItem {
  productId: string;
  quantity: number;
  supplierProductId: string;
  price: number;
}

export default function NewOrderPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    projectName: "",
    address: "",
    deliveryDate: "",
    items: [] as OrderItem[],
  });

  // Mock data - replace with API calls
  const [products] = useState([
    {
      id: "1",
      name: "Product 1",
      suppliers: [
        { id: "sp1", name: "Supplier 1", price: 100, stock: 50 },
        { id: "sp2", name: "Supplier 2", price: 95, stock: 30 },
      ],
    },
    {
      id: "2",
      name: "Product 2",
      suppliers: [
        { id: "sp3", name: "Supplier 1", price: 200, stock: 20 },
        { id: "sp4", name: "Supplier 3", price: 190, stock: 15 },
      ],
    },
  ]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement order creation
    router.push("/orders");
  };

  const addItem = () => {
    setFormData((prev) => ({
      ...prev,
      items: [
        ...prev.items,
        {
          productId: "",
          quantity: 1,
          supplierProductId: "",
          price: 0,
        },
      ],
    }));
  };

  const removeItem = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index),
    }));
  };

  const updateItem = (index: number, field: keyof OrderItem, value: any) => {
    setFormData((prev) => ({
      ...prev,
      items: prev.items.map((item, i) => {
        if (i === index) {
          if (field === "productId") {
            const product = products.find((p) => p.id === value);
            const supplier = product?.suppliers[0];
            return {
              ...item,
              [field]: value,
              supplierProductId: supplier?.id || "",
              price: supplier?.price || 0,
            };
          }
          if (field === "supplierProductId") {
            const product = products.find((p) => p.id === item.productId);
            const supplier = product?.suppliers.find((s) => s.id === value);
            return {
              ...item,
              [field]: value,
              price: supplier?.price || 0,
            };
          }
          return { ...item, [field]: value };
        }
        return item;
      }),
    }));
  };

  const calculateTotal = () => {
    return formData.items.reduce((total, item) => total + item.quantity * item.price, 0);
  };

  return (
    <AppLayout>
      <div className="py-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
          <h1 className="text-2xl font-semibold text-gray-900">New Order</h1>
        </div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
          <form onSubmit={handleSubmit} className="space-y-8 divide-y divide-gray-200">
            <div className="space-y-8 divide-y divide-gray-200">
              <div>
                <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                  <div className="sm:col-span-4">
                    <label
                      htmlFor="projectName"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Project Name
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="projectName"
                        id="projectName"
                        required
                        value={formData.projectName}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            projectName: e.target.value,
                          }))
                        }
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-6">
                    <label
                      htmlFor="address"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Delivery Address
                    </label>
                    <div className="mt-1">
                      <textarea
                        id="address"
                        name="address"
                        rows={3}
                        required
                        value={formData.address}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            address: e.target.value,
                          }))
                        }
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label
                      htmlFor="deliveryDate"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Delivery Date
                    </label>
                    <div className="mt-1">
                      <input
                        type="date"
                        name="deliveryDate"
                        id="deliveryDate"
                        required
                        value={formData.deliveryDate}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            deliveryDate: e.target.value,
                          }))
                        }
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-8">
                <div>
                  <h3 className="text-lg font-medium leading-6 text-gray-900">
                    Order Items
                  </h3>
                </div>
                <div className="mt-6 space-y-4">
                  {formData.items.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-4 rounded-lg border border-gray-200 p-4"
                    >
                      <div className="flex-1">
                        <select
                          value={item.productId}
                          onChange={(e) =>
                            updateItem(index, "productId", e.target.value)
                          }
                          required
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        >
                          <option value="">Select Product</option>
                          {products.map((product) => (
                            <option key={product.id} value={product.id}>
                              {product.name}
                            </option>
                          ))}
                        </select>
                      </div>

                      {item.productId && (
                        <>
                          <div className="flex-1">
                            <select
                              value={item.supplierProductId}
                              onChange={(e) =>
                                updateItem(index, "supplierProductId", e.target.value)
                              }
                              required
                              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            >
                              <option value="">Select Supplier</option>
                              {products
                                .find((p) => p.id === item.productId)
                                ?.suppliers.map((supplier) => (
                                  <option key={supplier.id} value={supplier.id}>
                                    {supplier.name} - ${supplier.price} (Stock:{" "}
                                    {supplier.stock})
                                  </option>
                                ))}
                            </select>
                          </div>

                          <div className="w-32">
                            <input
                              type="number"
                              min="1"
                              value={item.quantity}
                              onChange={(e) =>
                                updateItem(
                                  index,
                                  "quantity",
                                  parseInt(e.target.value)
                                )
                              }
                              required
                              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                              placeholder="Quantity"
                            />
                          </div>

                          <div className="w-32">
                            <div className="text-sm font-medium text-gray-900">
                              ${(item.price * item.quantity).toFixed(2)}
                            </div>
                          </div>
                        </>
                      )}

                      <button
                        type="button"
                        onClick={() => removeItem(index)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <TrashIcon className="h-5 w-5" aria-hidden="true" />
                      </button>
                    </div>
                  ))}

                  <button
                    type="button"
                    onClick={addItem}
                    className="inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium leading-4 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    <PlusIcon className="-ml-0.5 mr-2 h-4 w-4" aria-hidden="true" />
                    Add Item
                  </button>
                </div>

                {formData.items.length > 0 && (
                  <div className="mt-4 flex justify-end">
                    <div className="text-lg font-medium text-gray-900">
                      Total: ${calculateTotal().toFixed(2)}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="pt-5">
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => router.push("/orders")}
                  className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Create Order
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </AppLayout>
  );
} 