import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

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
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Something went wrong";
    return NextResponse.json(
      { error: errorMessage },
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

    const where = query
      ? {
          OR: [
            { name: { contains: query, mode: "insensitive" } },
            { email: { contains: query, mode: "insensitive" } },
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
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Something went wrong";
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
} 