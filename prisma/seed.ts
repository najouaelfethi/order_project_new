import { PrismaClient } from '@prisma/client'
import { hash } from 'bcrypt'

const prisma = new PrismaClient()

async function main() {
  // Create admin user
  const adminPassword = await hash('admin123', 10)
  const admin = await prisma.user.create({
    data: {
      name: 'Admin',
      email: 'admin@intelliorder.com',
      password: adminPassword,
      role: 'SUPER_ADMIN',
    },
  })

  // Create some sample products
  const product1 = await prisma.product.create({
    data: {
      name: 'Sample Product 1',
      description: 'This is a sample product',
      specifications: JSON.stringify({
        weight: '1kg',
        dimensions: '10x10x10cm',
      }),
      images: JSON.stringify([
        'https://example.com/image1.jpg',
        'https://example.com/image2.jpg',
      ]),
    },
  })

  const product2 = await prisma.product.create({
    data: {
      name: 'Sample Product 2',
      description: 'This is another sample product',
      specifications: JSON.stringify({
        weight: '2kg',
        dimensions: '20x20x20cm',
      }),
      images: JSON.stringify([
        'https://example.com/image3.jpg',
        'https://example.com/image4.jpg',
      ]),
    },
  })

  // Create some sample suppliers
  const supplier1 = await prisma.supplier.create({
    data: {
      name: 'Sample Supplier 1',
      email: 'supplier1@example.com',
      phone: '+1234567890',
      whatsapp: '+1234567890',
    },
  })

  const supplier2 = await prisma.supplier.create({
    data: {
      name: 'Sample Supplier 2',
      email: 'supplier2@example.com',
      phone: '+0987654321',
      whatsapp: '+0987654321',
    },
  })

  // Link products with suppliers
  await prisma.supplierProduct.create({
    data: {
      productId: product1.id,
      supplierId: supplier1.id,
      buyPrice: 100,
      sellPrice: 150,
      stock: 50,
    },
  })

  await prisma.supplierProduct.create({
    data: {
      productId: product1.id,
      supplierId: supplier2.id,
      buyPrice: 95,
      sellPrice: 145,
      stock: 30,
    },
  })

  await prisma.supplierProduct.create({
    data: {
      productId: product2.id,
      supplierId: supplier1.id,
      buyPrice: 200,
      sellPrice: 300,
      stock: 20,
    },
  })

  console.log('Database has been seeded.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  }) 