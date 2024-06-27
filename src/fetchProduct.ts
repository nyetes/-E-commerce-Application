import axios from "axios";
import prisma from "./utils/database";

async function fetchAndStoreProducts() {
  try {
    const response = await axios.get("https://dummyjson.com/products");
    const products = response.data.products;

    for (const product of products) {
      const category = await prisma.category.upsert({
        where: { name: product.category },
        update: {},
        create: { name: product.category },
      });

      await prisma.product.create({
        data: {
          title: product.title,
          description: product.description,
          price: product.price,
          rating: product.rating,
          stock: product.stock,
          categoryId: category.id,
          image: product.thumbnail,
        },
      });
    }
  } catch (error) {
    console.error("Error fetching products:", error);
  } finally {
    await prisma.$disconnect();
  }
}

fetchAndStoreProducts();
