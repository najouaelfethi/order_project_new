import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function addUser() {
  const hashedPassword = await bcrypt.hash("123", 10); // ✅ Hash the password

  const user = await prisma.user.create({
    data: {
      name: "najouaelfethi",
      email: "najouaelfethi@example.com",
      password: hashedPassword, // ✅ Store the hashed password
      role: "USER", // ✅ Change this as needed (e.g., "ADMIN", "SUPER_ADMIN")
    },
  });

  console.log("✅ User added successfully:", user);
  await prisma.$disconnect();
}

// Run the function
addUser().catch((e) => {
  console.error("❌ Error adding user:", e);
  prisma.$disconnect();
});
