// lib/products.ts

export interface Product {
  id: number;
  updatedAt: string;
}

export async function getAllProducts(): Promise<Product[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products`, {
    headers: {
      'Content-Type': 'application/json',
    },
    cache: 'no-store', // or use ISR if appropriate
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch products: ${res.status}`);
  }

  const json = await res.json();

  // Your response looks like: { products: [ { id, created_at, ... } ] }
  const productsArray = json.products;

  if (!Array.isArray(productsArray)) {
    throw new Error("Invalid products format: 'products' is not an array");
  }

  return productsArray.map((prod): Product => ({
    id: prod.id,
    updatedAt: prod.created_at || new Date().toISOString(),
  }));
}
