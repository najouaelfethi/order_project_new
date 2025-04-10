"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import AppLayout from "../../components/layout/AppLayout";

interface DashboardStats {
  totalProducts: number;
  totalOrders: number;
  totalSuppliers: number;
  recentOrders: Array<{
    id: string;
    status: string;
    createdAt: string;
  }>;
}

export default function DashboardPage() {
  const { data: session } = useSession();
  const [stats, setStats] = useState<DashboardStats>({
    totalProducts: 0,
    totalOrders: 0,
    totalSuppliers: 0,
    recentOrders: [],
  });

  useEffect(() => {
    // TODO: Fetch dashboard stats from API
    // This is just mock data for now
    setStats({
      totalProducts: 150,
      totalOrders: 45,
      totalSuppliers: 12,
      recentOrders: [
        { id: "1", status: "PENDING", createdAt: "2024-01-20" },
        { id: "2", status: "APPROVED", createdAt: "2024-01-19" },
        { id: "3", status: "COMPLETED", createdAt: "2024-01-18" },
      ],
    });
  }, []);

  return (
    <AppLayout>
      <div className="py-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
          <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
        </div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
          {/* Stats */}
          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
              <dt className="truncate text-sm font-medium text-gray-500">
                Total Products
              </dt>
              <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
                {stats.totalProducts}
              </dd>
            </div>
            <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
              <dt className="truncate text-sm font-medium text-gray-500">
                Total Orders
              </dt>
              <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
                {stats.totalOrders}
              </dd>
            </div>
            <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
              <dt className="truncate text-sm font-medium text-gray-500">
                Total Suppliers
              </dt>
              <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
                {stats.totalSuppliers}
              </dd>
            </div>
          </div>

          {/* Recent Orders */}
          <div className="mt-8">
            <div className="mx-auto max-w-7xl">
              <div className="overflow-hidden bg-white shadow sm:rounded-lg">
                <div className="px-4 py-5 sm:px-6">
                  <h3 className="text-lg font-medium leading-6 text-gray-900">
                    Recent Orders
                  </h3>
                </div>
                <div className="border-t border-gray-200">
                  <ul role="list" className="divide-y divide-gray-200">
                    {stats.recentOrders.map((order) => (
                      <li key={order.id} className="px-4 py-4 sm:px-6">
                        <div className="flex items-center justify-between">
                          <div className="text-sm font-medium text-indigo-600">
                            Order #{order.id}
                          </div>
                          <div className="text-sm text-gray-500">
                            {order.createdAt}
                          </div>
                        </div>
                        <div className="mt-2 flex justify-between">
                          <div className="text-sm text-gray-900">
                            Status: {order.status}
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
} 