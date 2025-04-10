import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Prisma } from "@prisma/client";

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { error: "You must be logged in to create a supplier" },
        { status: 401 }
      );
    }

    const json = await request.json();

    const supplier = await prisma.supplier.create({
      data: {
        name: json.name,
        email: json.email,
        phone: json.phone,
        whatsapp: json.whatsapp,
      },
    });

    return NextResponse.json(supplier);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Something went wrong" },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { error: "You must be logged in to view suppliers" },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const query = searchParams.get("query");

    const where: Prisma.SupplierWhereInput = query
      ? {
          OR: [
            { name: { contains: query, mode: "insensitive" as Prisma.QueryMode } },
            { email: { contains: query, mode: "insensitive" as Prisma.QueryMode } },
          ],
        }
      : {};

    const suppliers = await prisma.supplier.findMany({
      where,
      include: {
        products: {
          include: {
            product: true,
          },
        },
      },
    });

    return NextResponse.json(suppliers);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Something went wrong" },
      { status: 500 }
    );
  }
} 